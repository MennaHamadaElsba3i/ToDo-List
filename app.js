let myInput = document.querySelector('.input');
let AddButton = document.querySelector('.add');
let myTasks = document.querySelector('.tasks');

let ArrayOfTasks = [];   




getDatafromLocalstorage();

AddButton.onclick = function () {
     if (myInput.value !== "") {
          addTaskToArray(myInput.value);
          myInput.value = "";  

     }
}

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
          if(task.completed) {
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
     if(data) {
          let tasks = JSON.parse(data); 
          console.log(tasks);
     }
}