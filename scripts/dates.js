let changeColor = document.getElementById('changeColor')
const current = document.querySelector('#current')
const timestampInput = document.querySelector('#input-timestamp')
const dateInput = document.querySelector('#input-date')
let interval

function getCurrentTimestamp() {
   interval = setInterval(() => current.innerHTML = new Date().getTime(), 1000)
}

getCurrentTimestamp()


document.querySelectorAll("#convert").forEach(btn => {
   btn.addEventListener('click', (e) => {
      if (e.target.dataset.resultType === 'date') {

         if (timestampInput.value.length > 0) {
            let parsed = new Date(timestampInput.value.length === 10 ? Number(timestampInput.value) * 1000 : Number(timestampInput.value))
            document.querySelector('.date-result').innerHTML = `
            ${parsed.toString()}
            <hr />
            ${parsed.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
            <hr />
            ${parsed.toLocaleDateString('pt-BR', { weekday: 'long' })}
         `
         }
      }
      else if (dateInput.value.length > 0) {
         try {
            let parsed = new Date(Date.parse(dateInput.value)).getTime()
            document.querySelector('.timestamp-result').innerHTML = parsed
         } catch (err) {
            console.log(err)
         }
      }
   })
})
