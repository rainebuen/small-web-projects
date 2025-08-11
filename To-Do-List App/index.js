document.addEventListener("DOMContentLoaded", () => {
    try {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks && Array.isArray(storedTasks)) {
            tasks = storedTasks; // Replace entire array
            updateTaskList();
            updateStats();
        }
    } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
        tasks = [];
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; 
        updateTaskList();
        updateStats(); 
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats(); 
    saveTasks();
};

const deleteTask = (index) => {
  let result = confirm("Are you sure you want to delete this task?");
    if (result) {
        console.log("Item deleted");
         tasks.splice(index, 1);
         updateTaskList();
         updateStats();
         saveTasks();
    }
   else {
    console.log("Action canceled");
    }
 
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById('progress');
    const numbersElement = document.getElementById('numbers');

    if (totalTasks > 0) {
        const progress = (completeTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        progressBar.style.width = '0%';
    }
    
   document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
   
   if(tasks.length && completeTasks === totalTasks) {
    blaskConfetti();
   }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem ${task.completed ? 'completed' : ''}">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''
            }/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <button class="editTask" onClick="editTask(${index})"> <i class="fa-solid fa-pen-to-square"></i> </button>
                    <button class="deleteTask" onClick="deleteTask(${index})"> <i class="fa fa-trash-o"></i> </button>
                </div>
            </div>
        `;

        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));

        taskList.appendChild(listItem);
    });
};

document.getElementById('addTaskBtn').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});


const blaskConfetti = ()=> {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});

}
