



const lis = document.querySelectorAll('.tab-wrapper li')

lis.forEach(li => {
    li.addEventListener('click', (e) => {
        let containers = document.querySelectorAll('div[id^="container-"]')
        containers.forEach(container => {
            if (container.id !== `container-${e.target.dataset.container}`) {
                container.style.display = 'none'
                container.classList.remove('selected')
            }
        })

        const cont = document.querySelector(`div#container-${e.target.dataset.container}`)
        cont.style.display = 'block'
    })
})  
