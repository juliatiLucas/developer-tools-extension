const colorPicker = document.querySelector('#color-input')
const selectedColor = document.querySelector('#selected-color')
const rgbInput = document.querySelector('#rgb-input')

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

colorPicker.addEventListener('change', (e) => {
    selectedColor.value = e.target.value
    const RGB = hexToRgb(e.target.value)
    rgbInput.value = `${RGB.r}, ${RGB.g}, ${RGB.b}`
})


