import ml from './jml.js'
const titleInput = document.querySelector('#input-note-title')
const descriptionInput = document.querySelector('#input-note-description')
const createNoteBtn = document.querySelector('#create-note-btn')
const notesList = document.querySelector('.notes-list')

document.querySelector('li[data-container="2"]').addEventListener('click', (e) => getNotes())

function deleteItem(notes, index) {
    notes.splice(index, 1)

    chrome.storage.sync.set({ notes }, () => { })
    getNotes()
}

function editItem(e, notes, index) {
    if (e.key === 'Enter') {
        notes[index]['description'] = e.target.value

        chrome.storage.sync.set({ notes }, () => { })
        getNotes()
    }
}

function getNotes() {
    notesList.innerHTML = null
    chrome.storage.sync.get('notes', function (data) {
        let notes = data.notes ?? []
        notes.forEach((item, index) => {
            notesList.appendChild(
                ml('div', { class: 'list-item' }, [
                    ml('div', {}, [
                        ml('strong', {}, [item.title]),
                        ml('textarea', { cols: '44', rows: '3', onkeypress: (e) => editItem(e, notes, index) }, [item.description]),
                    ]),
                    ml('span', { id: 'close', onclick: () => deleteItem(notes, index) }, ['×'])
                ])
            )
        })
    })
}


createNoteBtn.onclick = (e) => {
    if (titleInput.value.length === 0 || descriptionInput.value.length === 0) {
        return
    }

    chrome.storage.sync.get('notes', function (data) {
        let notes = data.notes ?? []
        notes.push({ title: titleInput.value, description: descriptionInput.value })

        chrome.storage.sync.set({ notes }, () => {
            titleInput.value = ""
            descriptionInput.value = ""
            getNotes()
        })
    })
}
