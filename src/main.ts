import StreakCounter from "./classes/streakCounter.js";
import BestDoneTask from "./classes/bestDoneTask.js";
import Days from "./classes/days.js";
import Task from "./classes/task.js";



// get the elements from the DOM
let addBtn = document.querySelector("#add-btn")!;
let modal = document.querySelector('#my-modal')! as HTMLDivElement;
let modalContent = document.querySelector('.modal-content')! as HTMLDivElement;
let taskContainer = document.querySelector('.task-container')! as HTMLDivElement;
let bestBtn = document.querySelector('#best-btn')! as HTMLButtonElement;
// let taskTemplateContainer:string = `<div class="container task-container"></div>`

// create a new instance of the streakCounter class
let streakCounter = new StreakCounter();

// create a new instance of the bestDoneTask class and pass the streakCounter instance to it
let bestDoneTask = new BestDoneTask(streakCounter);

// add event listener to taskContainer
taskContainer.addEventListener("click", (e) => {
    
    e.stopImmediatePropagation();
    // check if the target is the delete button
    let target = e.target as HTMLElement;
    if (target.className == "task") {
        showSingle(Number(target.id));
    }
    if (target.className == "delete-btn") {
        deleteTask(Number(target.id));
    }
    if (target.tagName == "img") {
        showSingle(Number(target.id));
    }
    
    
        
})


modalContent.addEventListener("click", (e) => {
    let target = e.target as HTMLElement;
    if (target.className == "delete-btn") {
        deleteTask(Number(target.id));
    }
})



//  form template for adding a new task
let formTemplate: string = `
        <span class="close">&times;</span>
        <div class="form-group">
            <h1>Add task</h1>
            <form >
                <div class="input-group">
                    <label for="name">Task Name</label>
                    <input type="text" name="name" id="name" placeholder="name">
                </div>
                <div class="input-group">
                    <label for="task-icon">image</label>
                    <input type="text" name="task-icon" id="task-icon" placeholder="image url">
                </div>
                <div class="input-group">
                    <label for="date">Start Date</label>
                    <input type="date" name="date" id="date">
                </div>
                <button type="submit" id="submit-btn">Add task</button>
            </form>
        </div>`




//  Data validation for the form if the user tries to submit an empty form the error message will be displayed for 5 seconds
// and the input fields will be highlighted in red
// if the user fills all the fields the task will be added to the streakCounter instance
const validateForm = (): void => {
    let submitBtn = document.querySelector('#submit-btn')! as HTMLButtonElement;
    let formGroup = document.querySelector('.form-group')!;
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let taskName = document.querySelector('#name')! as HTMLInputElement;
        let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
        let taskDate = document.querySelector('#date')! as HTMLInputElement;

        if (taskName.value == "" || taskIcon.value == "" || taskDate.value == "") {
            let error = document.querySelector('.error')! as HTMLParagraphElement;
            if (error) {
                error.remove();
            }
            formGroup.insertAdjacentHTML("afterbegin", `<p class="error">Please fill all the fields</p>`)
            let taskName = document.querySelector('#name')! as HTMLInputElement;
            let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
            let taskDate = document.querySelector('#date')! as HTMLInputElement;
            if (taskName.value == "") {
                taskName.style.border = "1px solid red";
            }
            if (taskIcon.value == "") {
                taskIcon.style.border = "1px solid red";
            }
            if (taskDate.value == "") {
                taskDate.style.border = "1px solid red";
            }
            
            setTimeout(() => {
                let error = document.querySelector('.error')! as HTMLParagraphElement;
                if (error) {
                    error.remove();
                }
                taskName.style.border = "1px solid #ccc";
                taskIcon.style.border = "1px solid #ccc";
                taskDate.style.border = "1px solid #ccc";
            },5000)


        }
        else {
            posttasks();
            renderTasks();
            modal.style.display = "none";
        }

    })
}
  //function add task
  async function posttasks(){
    const newProduct= readValues()
    let taskName = document.querySelector('#name')! as HTMLInputElement;
    let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
    let taskDate = document.querySelector('#date')! as HTMLInputElement;
    let task = new Task(taskName.value, taskIcon.value, taskDate.value);
    let collectedtasks=await fetch('http://localhost:3000/Tasks',{
        method:"POST",
        body:JSON.stringify(newProduct),
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log(collectedtasks)
  }


  function readValues(){
    let taskName = (document.querySelector('#name')! as HTMLInputElement).value;
    let taskIcon = (document.querySelector('#task-icon')! as HTMLInputElement).value;
    let taskDate = (document.querySelector('#date')! as HTMLInputElement).value;
    return {taskName,taskIcon,taskDate};
}
// fuction to close the modal which show be called when the modal is opened
const closeModal = (): void => {
    let closeBtn = document.querySelector('.close')! as HTMLSpanElement;
    let task = document.querySelector('.task-well-done')! as HTMLDivElement;
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        let formGroup = document.querySelector('.form-group')!;
        if (formGroup) {
            formGroup.remove();
        }
        if (task) {
            task.remove();
        }
    })
}

// add event listener to the add button which will open the modal and display the form
addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalContent.innerHTML = "";
    modalContent.innerHTML = formTemplate;
    closeModal();
    validateForm();


}
)

/**
 * 
 * @param {number} id the id of the task to be deleted
 */
const deleteTask = (id: number) => {
    let task = streakCounter.tasks.find((task) => task.id == id);
    let index = streakCounter.tasks.indexOf(task!);
    streakCounter.tasks.splice(index,1);
    renderTasks();
    modal.style.display = "none";
} 

/**
 * 
 * @param {number} id the id of the task to be displayed
 * returns the task with the id passed as a parameter
 */
const showSingle = (id: number) => {
    let task = streakCounter.tasks.find((task) => task.id == id);
    modalContent.innerHTML = "";
    modal.style.display = "flex";
    let singleTaskTemplate = `
    <span class="close">&times;</span>
    <div class="task">
        <img src="${task?.imageUrl}" alt="task">
        <p class="date">${task?.date}</p>
        <p class="days">Days: ${Days.create(task!).getDays()}</p>
        <!-- task name -->
        <p class="task-name">${task!.name}</p>
        <div class="modal-btn">
        <button id="modal-close-btn" onclick="let modal = document.querySelector('#my-modal');modal.style.display = 'none'">Close</button>
            <button class="delete-btn" id="${task!.id}">Delete</button>
        </div>
    </div>`
    
    if (task){
        modalContent.innerHTML = singleTaskTemplate;
        closeModal();
    }
    else{
        modalContent.innerHTML = "<p>Task not found</p>"
    }

}

//  function to render all the tasks in the streakCounter instance to the DOM
async function renderTasks() {
    const tasks=await fetch(' http://localhost:3000/Tasks')
    const tasklist=await tasks.json()
    console.log(tasklist)
    taskContainer.innerHTML = "";
    tasklist.forEach((task:any) => {
        let taskTemplate = `
        <div class="task" id="${task.id}">
            <img src="${task.taskIcon}" alt="${task.name}" id="${task.id} >
            <p class="date">${task.taskDate}</p>
            <p>Days done: ${Days.create(task).getDays()}</p>
            <p class="task-name">${task.taskName}</p>
        </div>
        
        `
        taskContainer.insertAdjacentHTML("afterbegin", taskTemplate);
    }
    )
}

renderTasks();

