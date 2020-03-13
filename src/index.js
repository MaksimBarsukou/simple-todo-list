import './index.scss'

window.onload = () => {
    cookieVerification()
}

const addTodoBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const list = document.getElementById('list');
let taskStorage = [];
console.log(taskStorage);


const cookieVerification = () => {
    if (localStorage.getItem('todo')) {
        taskStorage = JSON.parse(localStorage.getItem('todo'))
        for (let key in taskStorage) {
            template(taskStorage[key].id, taskStorage[key].value)
            console.log(key, taskStorage[key].id, taskStorage[key].value)
        }
    }
}


const template = (itemId, itemValue) => {
    list.insertAdjacentHTML('beforeend', `
		<div class="item" id="item-${itemId}">
			<input type="text" data-action="input" class="input-element" id="task-${itemId}" value="${itemValue}"  disabled/>
			<div class="action-btns">
				<button data-action="save" class="action-btn save-btn hide" data- id="save-${itemId}">Save</button>
				<button data-action="edit" class="action-btn edit-btn" id="edit-${itemId}" >Edit</button>
				<button data-action="remove" class="action-btn remove-btn" id="delete-${itemId}">Delete</button>
			</div>
		</div>`)
}


const createTask = () => {
    let id = createId()
    template(id, todoInput.value)
    taskStorage.push({ id: `${id}`, "value": todoInput.value })
    console.log(taskStorage)
    localStorage.setItem('todo', JSON.stringify(taskStorage))
    todoInput.value = ''
}


// Handler for clicking on the main task creation button
addTodoBtn.addEventListener('click', createTask)


function Handlers(elem) {
    this.save = () => save(event)
    this.edit = () => editTask(event)
    this.remove = () => remove(event)
    this.input = () => editInputSave(event)

    var self = this

    elem.onclick = function(event) {
        var action = event.target.getAttribute('data-action')
        if(action) {
            self[action]()
        } 
    }
}
new Handlers(list)

// list.addEventListener('click', function (e) {
//     if (e.target.matches('.remove-btn')) {
//         console.log('remove event')
//         remove(e)
//         return
//     }
//     if (e.target.matches('.edit-btn')) {
//         console.log('edit event')
//         editTask(e)
//         return
//     }
//     if (e.target.matches('.save-btn')) {
//         console.log('save event')
//         save(e)
//         return
//     }
//     if (e.target.matches('.input-element')) {
//         console.log('input-element-save event')
//         editInputSave(e)
//         return
//     }
// })


const createId = () => {
    return (Math.random(0) * (100)).toFixed(2)
}


todoInput.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
        createTask();
    }
})


const remove = (event) => {
    const removeTask = event.target.parentNode.parentNode
    removeTask.remove()
    for (let key in taskStorage) {
        if (taskStorage[key].id == removeTask.id.split('-')[1]) {
            taskStorage.splice(key, 1)
        }
    }
    localStorage.setItem('todo', JSON.stringify(taskStorage))
    console.log('remove')
}


const editInputSave = (event) => {
    const saveBtn = event.path[1].children[1].children[0].id
    const task = event.target.id
    const elemInput = document.getElementById(task)
    const save = document.getElementById(saveBtn)
    elemInput.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            elemInput.setAttribute('disabled', 'disabled');
            save.classList.add('hide')
            taskStorage.forEach(function (item) {
                if (item.id == task.split('-')[1]) {
                    item.value = event.target.value
                    console.log(taskStorage)
                }
            })
            localStorage.setItem('todo', JSON.stringify(taskStorage))
        }
    })
}


const editTask = (event) => {
    const saveId = event.path[1].children[0].id
    const taskId = event.path[2].children[0].id
    const task = document.getElementById(taskId)
    task.removeAttribute('disabled')
    const save = document.getElementById(saveId)
    save.classList.remove('hide')
    task.focus()
    console.log('edit')
}


const save = (event) => {
    const saveId = event.target.id
    const taskId = event.path[2].children[0].id
    const save = document.getElementById(saveId)
    const task = document.getElementById(taskId)
    task.setAttribute('disabled', 'disabled');
    save.classList.add('hide')
    taskStorage.forEach(function (item) {
        if (item.id == taskId.split('-')[1]) {
            item.value = task.value
            console.log(taskStorage)
        }
    })
    localStorage.setItem('todo', JSON.stringify(taskStorage))
    console.log('save')
}