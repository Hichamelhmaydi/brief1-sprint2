let addButton = document.getElementById('add');
let crudModal = document.getElementById('crud-modal');
let closeButton = crudModal.querySelector('#close'); 
let taskForm = document.getElementById('task-form');

document.addEventListener('DOMContentLoaded', () => {
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

    // تحديد لون العنوان بناءً على الأولوية
    let priorityColor;
    if (priority === 'P1') {
        priorityColor = 'text-red-500'; // أحمر
    } else if (priority === 'P2') {
        priorityColor = 'text-yellow-500'; // أصفر
    } else if (priority === 'P3') {
        priorityColor = 'text-green-500'; // أخضر
    }



    const newTask = document.createElement('div');
    newTask.classList.add('task', status.toLowerCase()); 
    newTask.innerHTML = `
      <div>
        <div class="font-bold ${priorityColor}">${title}</div>
        <textarea class="w-full p-2 rounded" disabled>${description}</textarea>
        <div class="task-status">${status}</div>
        <div class="task-priority">Priorité: ${priority}</div>
        <button class="delete-button bg-red-500 text-white rounded px-2 py-1">Supprimer</button>
        <button class="change-status-button bg-yellow-500 text-white rounded px-2 py-1">Changer l'état</button>
      </div>
    `;

    document.getElementById(status.toLowerCase()).appendChild(newTask);
    taskForm.reset();
    closeModal();

    newTask.querySelector('.delete-button').addEventListener('click', function() {
        newTask.remove();
    });

    newTask.querySelector('.change-status-button').addEventListener('click', function() {
        changeTaskStatus(newTask);
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

    // نقل المهمة للقسم الجديد
    document.getElementById(currentStatus.toLowerCase()).appendChild(taskElement);
}
