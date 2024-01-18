let todosContainer = document.querySelector('.todos')

let left = document.querySelector('.left')
let all = document.querySelector('.all')
let active = document.querySelector('.active')
let completed = document.querySelector('.completed')
let clearcopleted = document.querySelector('.clearcompleted')

let activebtn = document.getElementById('filterUnchecked')
let uncomplete = document.getElementById('filterChecked')
let alltasks = document.getElementById('filterAll')
let clear = document.getElementById('clearcompleted')

let todos = []

let todoform = document.querySelector('#todoform')
let newtodo = document.getElementById("createtodo")
let checkedstatus = document.querySelector(".checkbox")



todoform.addEventListener("submit", (e)=>{
    e.preventDefault()

    if(newtodo.value.trim() !== ""){
        let todo = {
            taskname: newtodo.value.trim(),
            status: checkedstatus.checked,
            id:todos.length
        }

        todos.push(todo)

        console.log(todos);

        localStorage.setItem('todos', JSON.stringify(todos))

        displayTodos(true)
    }

     //items left
    let itemsleft = document.createElement('div');
    
    let leftItems = todos.filter((task)=>{
        return task.status == false;
    })
    itemsleft.textContent = leftItems.length + "items left";
    let left = document.querySelector('.left')
    left.innerHTML = '';
    left.appendChild(itemsleft);
    newtodo.value='';
})

const changeStatus=function(event,id){
    todos.forEach((task)=>{
        if (task.id == id){
            if(event.target.checked){
                task.status=true
            }else{
                task.status = false
            }
        }
    })
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos))
    displayTodos(true)

}



let displayTodos = function(status) {
    let taskItems = localStorage.getItem("todos");
    todosContainer.innerHTML = '';

    taskItems = JSON.parse(taskItems);

    taskItems.forEach((el, index) => {
        if (status) {
            if (!el.status) {
                let todoTemplate = `
                <div class="todo">
                    <input type="checkbox" class="checkbox" onchange="changeStatus(event,${el.id})" ${el.status ? 'checked' : ''}>
                    <div class="name">
                        ${el.taskname}
                    </div>
                </div>`;
                todosContainer.innerHTML += todoTemplate;
            }
        } else {
            let todoTemplate = `
            <div class="todo">
                <input type="checkbox" class="checkbox" onchange="changeStatus(event,${el.id})" ${el.status ? 'checked' : ''}>
                <div class="name">
                    ${el.taskname}
                </div>
            </div>`;

            // Display all tasks if status is undefined
            if (status === undefined || (status && !el.status) || (!status && el.status)) {
                todosContainer.innerHTML += todoTemplate;
            }
        }
    });
}


//completed tasks
activebtn.addEventListener('click',function(){
    displayTodos(true);
})


uncomplete.addEventListener('click',function(){
    displayTodos(false);
})


alltasks.addEventListener('click',function(){
 
    displayTodos();
    
})


clear.addEventListener('click', function(){
    todos = todos.filter(task => !task.status);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
})
