let changeColor = document.getElementById('changeColor')
const current = document.querySelector('#current')
const input = document.querySelector('#input-timestamp')
const result = document.querySelector('.result')
let interval

function getCurrentTimestamp() {
    interval = setInterval(() => current.innerHTML = new Date().getTime(), 1000)
}

getCurrentTimestamp()


document.querySelector("#convert").addEventListener('click', (e) => {
    if (input.value.length > 0) {
        let parsed = new Date(input.value.length === 10 ? Number(input.value) * 1000 : Number(input.value))
        result.innerHTML = `
        ${parsed.toString()}
        <hr />
        ${parsed.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
        <hr />
        ${parsed.toLocaleDateString('pt-BR', { weekday: 'long' })}
        `
    }
})
