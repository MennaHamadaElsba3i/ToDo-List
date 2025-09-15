let myInput = document.querySelector('.input');
let AddButton = document.querySelector('.add');
let myTasks = document.querySelector('.tasks');
let delAll = document.querySelector('.del-all');

let ArrayOfTasks = [];

if (localStorage.getItem("tasks")) {
     ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDatafromLocalstorage();

AddButton.onclick = function () {
     if (myInput.value !== "") {
          addTaskToArray(myInput.value);
          myInput.value = "";
     }
}

delAll.onclick = function () {
     myTasks.innerHTML = "";
     window.localStorage.removeItem("tasks")
}

myTasks.addEventListener('click', (e) => {
     if (e.target.classList.contains('del')) {
          delTaskeWithId(e.target.parentElement.getAttribute('data-id'));
          e.target.parentElement.remove();
     }
     if (e.target.classList.contains('task')) {
          toggletaskeithId(e.target.getAttribute("data-id"));
          e.target.classList.toggle("done");
     }
})
function addTaskToArray(taskText) {
     const task = {
          id: Date.now(),
          title: taskText,
          completed: false,
     };
     ArrayOfTasks.push(task);
     addElesToPageFrom(ArrayOfTasks);
     addTasksToLocalStoragefrom(ArrayOfTasks);

     // console.log(ArrayOfTasks);
     // console.log(JSON.stringify(ArrayOfTasks));
}

function addElesToPageFrom(arroftasks) {
     myTasks.innerHTML = "";
     arroftasks.forEach(task => {
          let div = document.createElement('div');
          div.className = "task";
          if (task.completed) {
               div.classList.add('done');
          }
          div.setAttribute('data-id', task.id);
          let textoftask = document.createTextNode(task.title);
          div.appendChild(textoftask);

          let span = document.createElement('span');
          span.className = "del";
          span.appendChild(document.createTextNode("Delete"));
          div.appendChild(span);

          myTasks.appendChild(div);

     });
}

function addTasksToLocalStoragefrom(ArrayOfTasks) {
     window.localStorage.setItem('tasks', JSON.stringify(ArrayOfTasks));
}

function getDatafromLocalstorage() {
     let data = window.localStorage.getItem('tasks');
     if (data) {
          let tasks = JSON.parse(data);
          addElesToPageFrom(tasks);
     }
}

function delTaskeWithId(taskId) {
     ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != taskId);
     addTasksToLocalStoragefrom(ArrayOfTasks);
}

function toggletaskeithId(taskId) {
     for (let i = 0; i < ArrayOfTasks.length; i++) {
          if (ArrayOfTasks[i].id == taskId) {
               ArrayOfTasks[i].completed == false ? (ArrayOfTasks[i].completed = true) : (ArrayOfTasks[i].completed = false);
          }
     }
     addTasksToLocalStoragefrom(ArrayOfTasks);
}

