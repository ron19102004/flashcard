const flashCards = []
let indexCurrent = -1;
$(() => {
    function setContent(value) {
        $('#flash-card').html(
            `<h3 class="text-5xl font-semibold text-gray-700 cursor-pointer">${value}</h3>`
        )
    }
    $('#readButton').click(function () {
        const fileInput = $('#fileInput')[0].files[0];

        if (fileInput && fileInput.type === "text/plain") {
            const reader = new FileReader();

            reader.onload = function (e) {
                const content = e.target.result;
                content.split('\n').forEach(item => {
                    const [key, value] = item.split(';')
                    flashCards.push({
                        key: key.trim(),
                        value: value.trim(),
                        isFlipped: false
                    })
                });
                if (flashCards.length > 0) {
                    indexCurrent = 0;
                    setContent(flashCards[0].key)
                    $('#sizeLabel').text(`${indexCurrent+1}/${flashCards.length}`)
                }
            };

            reader.onerror = function () {
                alert("Có lỗi xảy ra khi đọc file.");
            };

            reader.readAsText(fileInput);
            $('#input-content').addClass('hidden')
            $('#main-content').removeClass('hidden')
        } else {
            alert("Vui lòng chọn một tệp .txt hợp lệ!");
        }
    });
    $('#submitContentBtn').click(() => {
        $('#input-content').addClass('hidden')
        const content = $('#content').val();
        content.split('\n').forEach(item => {
            const [key, value] = item.split(';')
            flashCards.push({
                key: key,
                value: value,
                isFlipped: false
            })
        });
        if (flashCards.length > 0) {
            indexCurrent = 0;
            setContent(flashCards[0].key)
        }
        $('#main-content').removeClass('hidden')
    })
    $('#swapKeyValueBtn').click(() => {
        const flashCardsCopy = [...flashCards]
        flashCardsCopy.forEach((flash, index) => {
            flashCards[index] = {
                key: flash.value,
                value: flash.key,
                isFlipped: flash.isFlipped
            }
        })
        setContent(flashCards[indexCurrent].isFlipped ? flashCards[indexCurrent].key : flashCards[indexCurrent].value)
    })
    $('#flash-card').click(() => {
        if (indexCurrent === -1) return;
        setContent(flashCards[indexCurrent].isFlipped ? flashCards[indexCurrent].key : flashCards[indexCurrent].value)
        flashCards[indexCurrent].isFlipped = !flashCards[indexCurrent].isFlipped
    })
    $('#prevCardBtn').click(() => {
        if (indexCurrent === -1) return;
        if (indexCurrent > 0) {
            indexCurrent--;
            setContent(flashCards[indexCurrent].key)
            $('#sizeLabel').text(`${indexCurrent+1}/${flashCards.length}`)
        }
    })
    $('#nextCardBtn').click(() => {
        if (indexCurrent === -1) return;
        if (indexCurrent === flashCards.length - 1) return;
        indexCurrent++;
        setContent(flashCards[indexCurrent].key)
        $('#sizeLabel').text(`${indexCurrent+1}/${flashCards.length}`)
    })
})