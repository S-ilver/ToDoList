'use strict';
const addTaskBtn = document.querySelector('#add-task-btn'),
      deskTaskInput = document.querySelector('#description-task'),
      todoWrap = document.querySelector('.todos-wrapper');
    let tasks;
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

    let todoItems = [];
    function Task(description) {
    this.description = description;
    this.completed = false;
}
const createTemplate = (task,index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick ="completeTask(${index})" type="checkbox" name="check" ${task.completed ? 'checked' : ''} class="btn-complete">
                <div onclick ="deleteTask(${index})" class="btn-delete"></div>
            </div>
        </div>
    `;
};

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}
const fillHtmlList = () => {
    todoWrap.innerHTML = "";
        if(tasks.length > 0) {
            filterTasks();
            tasks.forEach((elem,index) => {
            todoWrap.innerHTML += createTemplate(elem,index);
            });
            todoItems = document.querySelectorAll('.todo-item');
        }
};

fillHtmlList();

const updateLocal = () => {
     localStorage.setItem('tasks', JSON.stringify(tasks));

};
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItems[index].classList.add('checked');
    }else {
        todoItems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
};
const deleteTask = index => {
    todoItems[index].classList.add('_active');  
    setTimeout(()=>{
        tasks.splice(index,1);
        updateLocal();
        fillHtmlList();
    },500);
}

function yellow() {
    if(deskTaskInput.value == '') {
        deskTaskInput.classList.add('_close');
        setTimeout(() => {
            deskTaskInput.classList.remove('_close');
        },500);
    }else {
        tasks.push(new Task(deskTaskInput.value));
        updateLocal();
        fillHtmlList();
        deskTaskInput.value ='';
    }
}
    addTaskBtn.addEventListener('click',() => {
        yellow();
    }); 

    window.addEventListener('keydown',(e) =>{
        if(e.key == 'Enter') {
            yellow();
        }
    });
