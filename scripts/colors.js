import ml from './jml.js'
const colorPicker = document.querySelector('#color-input')
const selectedColor = document.querySelector('#selected-color')
const rgbInput = document.querySelector('#rgb-input')
const historyElement = document.querySelector('section#color-history')
const clearHistoryBtn = document.querySelector('#clear-history-btn')

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

function getColorHistory() {
    historyElement.innerHTML = null
    chrome.storage.sync.get('colorHistory', function (data) {
        let colorHistory = data.colorHistory ?? []

        colorHistory = colorHistory.reverse()
        colorHistory.map(color => {
            historyElement.appendChild(
                ml('div', {
                    class: 'color-item',
                    style: `background-color: ${color}`,
                    onclick: () => selectColor(color)
                }, [])
            )
        })

        if (colorHistory.length === 0) {
            clearHistoryBtn.style.display = 'none'
        }
    })
}

function selectColor(color) {
    const RGB = hexToRgb(color)
    selectedColor.value = color
    colorPicker.value = color
    rgbInput.value = `${RGB.r}, ${RGB.g}, ${RGB.b}`
}

function clearHistory() {
    console.log('aa')
    chrome.storage.sync.set({ colorHistory: [] }, () => {
        getColorHistory()
    })
}

colorPicker.addEventListener('change', (e) => {
    selectedColor.value = e.target.value
    const RGB = hexToRgb(e.target.value)
    rgbInput.value = `${RGB.r}, ${RGB.g}, ${RGB.b}`

    chrome.storage.sync.get('colorHistory', function (data) {
        let colorHistory = data.colorHistory ?? []
        const found = colorHistory.find(c => c === e.target.value)
        if (!found) {
            colorHistory.push(e.target.value)
            clearHistoryBtn.style.display = 'block'
        }

        if (colorHistory.length <= 12) {
            chrome.storage.sync.set({ colorHistory }, () => {
                getColorHistory()
            })
        }
    })
})

document.querySelector('li[data-container="3"]').addEventListener('click', (e) => getColorHistory())
clearHistoryBtn.addEventListener('click', clearHistory)
