
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, insira uma tarefa!');
        return;
    }
    
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = taskText;
    
    span.addEventListener('click', () => {
        span.classList.toggle('done');
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Apagar';
    
    deleteBtn.addEventListener('click', () => {
        li.remove();
        if (taskList.children.length === 0) {
            taskInput.focus();
        }
    });
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
    
    taskInput.value = '';
    
    taskInput.focus();
}

