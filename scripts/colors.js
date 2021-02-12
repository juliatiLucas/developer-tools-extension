const colorPicker = document.querySelector('#color-input')
const selectedColor = document.querySelector('#selected-color')


colorPicker.addEventListener('change', (e) => {
    selectedColor.value = e.target.value
})
