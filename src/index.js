import './index.scss'
const doc = document;
const addTodoBtn = doc.getElementById('add-btn');
const todoInput = doc.getElementById('todo-input');
const list = doc.getElementById('list');


todoInput.addEventListener('change', ({ target: { name, value } }) => { console.log(name, value) })


// Task creation
const createTask = () => {
    list.insertAdjacentHTML('beforeend', `
		<div class="item" id="item-${createId()}">
			<input type="text" class="input-element" id="task-${createId()}" onkeypress="editInputSave(event)" value="${todoInput.value}" disabled/>
			<div class="action-btns">
				<button class="action-btn save-btn hide" id="save-${createId()}" onclick="save(event)">Save</button>
				<button class="action-btn edit-btn" id="edit-${createId()}" onclick="editTask(event)">Edit</button>
				<button class="action-btn remove-btn" id="delete-${createId()}" onclick="remove(event)">Delete</button>
			</div>
		</div>`)
    todoInput.value = ''
}


// Handler for clicking on the main task creation button
addTodoBtn.addEventListener('click', createTask)


// id generation
const createId = () => {
    return Math.random(0) * (100)
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
    const r = event.target.parentNode.parentNode.id
    const remove = doc.getElementById(r)
    remove.parentNode.removeChild(remove)
    console.log('remove')
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
            console.log('press input save')
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
    console.log('save')
}