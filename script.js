let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(){

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        let li = document.createElement("li");

        li.classList.add(task.priority.toLowerCase());

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
        <strong>${task.title}</strong><br>
        Priority: ${task.priority}<br>
        Due Date: ${task.dueDate}<br><br>

        <button onclick="toggleComplete(${index})">
        ${task.completed ? "Undo" : "Complete"}
        </button>

        <button onclick="editTask(${index})">
        Edit
        </button>

        <button onclick="deleteTask(${index})">
        Delete
        </button>
        `;

        taskList.appendChild(li);

    });
}

function addTask(){

    let title = document.getElementById("taskInput").value;
    let priority = document.getElementById("priority").value;
    let dueDate = document.getElementById("dueDate").value;

    if(title==="") return;

    tasks.push({
        title,
        priority,
        dueDate,
        completed:false
    });

    saveTasks();
    displayTasks();

    document.getElementById("taskInput").value="";
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
}

function toggleComplete(index){
    tasks[index].completed=!tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index){

    let newTitle = prompt(
        "Edit Task",
        tasks[index].title
    );

    if(newTitle){
        tasks[index].title = newTitle;
        saveTasks();
        displayTasks();
    }
}

displayTasks();
