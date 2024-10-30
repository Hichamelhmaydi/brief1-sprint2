document.addEventListener('DOMContentLoaded' , () => {
    const add=document.getElementById('add');
    const task=document.getElementsByClassName('task');
    add.addEventListener('click' ,() => task.classList.remove('hidden'));
});

