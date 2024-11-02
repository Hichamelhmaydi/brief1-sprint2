let addButton = document.getElementById('add');
let crudModal = document.getElementById('crud-modal');
let closeButton = crudModal.querySelector('#close'); 
let taskForm = document.getElementById('task-form');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    addButton.addEventListener('click', showModal);
    closeButton.addEventListener('click', closeModal);
    taskForm.addEventListener('submit', addTask);
});

function showModal() {
    crudModal.classList.remove('hidden');
}

function closeModal() {
    crudModal.classList.add('hidden');
}

function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    const taskData = { title, description, status, priority };
    addTaskToDOM(taskData);
    saveTasks();

    taskForm.reset();
    closeModal();
}

function addTaskToDOM(taskData) {
    const { title, description, status, priority } = taskData;
    const newTask = document.createElement('div');
    newTask.classList.add('task', status.toLowerCase()); 
    let priorityColor = getPriorityColor(priority);
    newTask.innerHTML = `
      <div>
        <div class="font-bold task-title" style="color: ${priorityColor};">${title}</div>
        <textarea class="w-full p-2 rounded" disabled>${description}</textarea>
        <div class="task-status">${status}</div>
        <div class="task-priority">Priorité: ${priority}</div>
        <button class="delete-button bg-red-500 text-white rounded px-2 py-1">Supprimer</button>
        <button class="change-status-button bg-yellow-500 text-white rounded px-2 py-1">Changer l'état</button>
        <select class="priority-select bg-blue-200 text-black rounded px-2 py-1 mt-1 border border-gray-300">
            <option value="P1" ${priority === 'P1' ? 'selected' : ''}>P1</option>
            <option value="P2" ${priority === 'P2' ? 'selected' : ''}>P2</option>
            <option value="P3" ${priority === 'P3' ? 'selected' : ''}>P3</option>
        </select>
      </div>
    `;

    document.getElementById(status.toLowerCase()).appendChild(newTask);
    attachTaskEventHandlers(newTask);
    updateTaskCounts();
}

function attachTaskEventHandlers(taskElement) {
    taskElement.querySelector('.delete-button').addEventListener('click', function() {
        taskElement.remove();
        saveTasks();
        updateTaskCounts();
    });

    taskElement.querySelector('.change-status-button').addEventListener('click', function() {
        changeTaskStatus(taskElement);
    });

    taskElement.querySelector('.priority-select').addEventListener('change', function(event) {
        changeTaskPriority(taskElement, event.target.value);
    });
}

function changeTaskStatus(taskElement) {
    const statusElement = taskElement.querySelector('.task-status'); 
    let currentStatus = statusElement.textContent;

    if (currentStatus === 'To do') {
        currentStatus = 'Doing';
    } else if (currentStatus === 'Doing') {
        currentStatus = 'Done';
    } else {
        currentStatus = 'To do';
    }

    statusElement.textContent = currentStatus;
    document.getElementById(currentStatus.toLowerCase()).appendChild(taskElement);
    saveTasks();
    updateTaskCounts();
}


function changeTaskPriority(taskElement, newPriority) {
    const titleElement = taskElement.querySelector('.task-title');
    titleElement.style.color = getPriorityColor(newPriority);

    const priorityElement = taskElement.querySelector('.task-priority');
    priorityElement.textContent = `Priorité: ${newPriority}`;
    saveTasks();
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'P1':
            return 'red';
        case 'P2':
            return 'orange';
        case 'P3':
            return 'green';
        default:
            return 'black';
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(taskElement => {
        const title = taskElement.querySelector('.task-title').textContent;
        const description = taskElement.querySelector('textarea').value;
        const status = taskElement.querySelector('.task-status').textContent;
        const priority = taskElement.querySelector('.task-priority').textContent.split(': ')[1];
        tasks.push({ title, description, status, priority });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
    updateTaskCounts();
}

function updateTaskCounts() {
    document.getElementById('todo-count').textContent = document.querySelectorAll('#todo .task').length;
    document.getElementById('doing-count').textContent = document.querySelectorAll('#doing .task').length;
    document.getElementById('done-count').textContent = document.querySelectorAll('#done .task').length;
}