import './index.scss'
const doc = document;
const addTodoBtn = doc.getElementById('add-btn');
const todoInput = doc.getElementById('todo-input');
const list = doc.getElementById('list');
let tempData = {}


todoInput.addEventListener('change', ({ target: { name, value } }) => { console.log(name, value) })


const template = (itemId, itemValue) => {
    list.insertAdjacentHTML('beforeend', `
		<div class="item" id="item-${itemId}">
			<input type="text" class="input-element" id="task-${itemId}" value="${itemValue}"  disabled/>
			<div class="action-btns">
				<button class="action-btn save-btn hide" id="save-${itemId}">Save</button>
				<button class="action-btn edit-btn" id="edit-${itemId}" >Edit</button>
				<button class="action-btn remove-btn" id="delete-${itemId}">Delete</button>
			</div>
		</div>`)
}


if (localStorage.getItem('todo') != undefined) {
    tempData = JSON.parse(localStorage.getItem('todo'))
    for (let key in tempData) {
        template(key, tempData[key].value)
        console.log(key, tempData[key].value)
    }
}


// Task creation
const createTask = () => {
    let id = createId()
    template(id, todoInput.value)
    tempData[`${id}`] = {"value": todoInput.value }
    console.log(tempData)
    localStorage.setItem('todo', JSON.stringify(tempData))
    todoInput.value = ''
}


// Handler for clicking on the main task creation button
addTodoBtn.addEventListener('click', createTask)
list.addEventListener('click', function (e) {
    if (e.target.matches('.remove-btn')) {
        console.log('remove event')
        remove(e)
        return
    }
    if (e.target.matches('.edit-btn')) {
        console.log('edit event')
        editTask(e)
        return
    }
    if (e.target.matches('.save-btn')) {
        console.log('save event')
        save(e)
        return
    }
    if (e.target.matches('.input-element')) {
        console.log('input-element-save event')
        editInputSave(e)
        return
    }
})


// id generation
const createId = () => {
    return (Math.random(0) * (100)).toFixed(2)
}


// Handler clicking on the main input
todoInput.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
        createTask();
    }
})


// Task removal
const remove = (event) => {
    const r = event.target.parentNode.parentNode
    r.remove()
    for (let key in tempData) {
        if (key == r.id.split('-')[1]) {
            console.log(tempData[key])
            delete tempData[key]
        }
    }
    localStorage.setItem('todo', JSON.stringify(tempData))
    console.log('remove', r)
}


// Save after editing task
const editInputSave = (event) => {
    const saveBtn = event.path[1].children[1].children[0].id
    const task = event.target.id
    const elemInput = doc.getElementById(task)
    const save = doc.getElementById(saveBtn)
    elemInput.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            elemInput.setAttribute('disabled', 'disabled');
            save.classList.add('hide')
            console.log(task)
            console.log(tempData[task.split('-')[1]])
            tempData[task.split('-')[1]].value = event.target.value
            localStorage.setItem('todo', JSON.stringify(tempData))
        }
    })
}


// Task editing
const editTask = (event) => {
    const i = event.path[1].children[0].id
    const t = event.path[2].children[0].id
    const task = doc.getElementById(t)
    task.removeAttribute('disabled')
    const save = doc.getElementById(i)
    save.classList.remove('hide')
    task.focus()
    console.log('edit')
}


const save = (event) => {
    const i = event.target.id
    const t = event.path[2].children[0].id
    const save = doc.getElementById(i)
    const task = doc.getElementById(t)
    task.setAttribute('disabled', 'disabled');
    save.classList.add('hide')
    tempData[t.split('-')[1]].value = task.value
    localStorage.setItem('todo', JSON.stringify(tempData))
    console.log('save')
}