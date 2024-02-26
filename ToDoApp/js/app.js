let $ = document
let inputToDo = $.getElementById("itemInput")
let addBtn = $.getElementById("addButton")
let clearAllBtn = $.getElementById("clearButton")
let completeToDoBtn = $.getElementsByClassName("btn-success")
let deleteToDoBtn = $.getElementsByClassName("btn-danger")

let ToDosArray = []

function setLocalStorage(ToDosList) {
    localStorage.setItem("ToDos", JSON.stringify(ToDosList))
}

function addToDoItem() {

    let newToDoObj = {
        id: ToDosArray.length + 1,
        title: inputToDo.value ,
        complete: false
    }
    ToDosArray.push(newToDoObj)
    setLocalStorage(ToDosArray)
    generateToDoItem(ToDosArray)
    inputToDo.focus()

    Array.from(completeToDoBtn).forEach( 
        element => element.addEventListener("click", function () {
            element.classList.toggle("completed")

        })
    )
}

function generateToDoItem(ToDosList) {
    $.getElementById("todoList").innerHTML = ""

    ToDosList.forEach(function(ToDoItem) {
        
        let newLiToDo = $.createElement("li")
        newLiToDo.className = "completed well"

        let toDoLabel = $.createElement('label')
        toDoLabel.innerHTML = ToDoItem.title

        let newCompBtn = $.createElement("button")
        newCompBtn.className = "btn btn-success"
        newCompBtn.innerHTML = "Complete"
        newCompBtn.setAttribute("onclick", `markAsCompleted(${ToDoItem.id})`)

        let newDelBtn = $.createElement("button")
        newDelBtn.className = "btn btn-danger"
        newDelBtn.innerHTML = "Delete"
        newDelBtn.setAttribute("onclick", `delTodoItem(${ToDoItem.id})`)
    
        if(ToDoItem.complete) {
            newLiToDo.className = "uncompleted well"
            newCompBtn.innerHTML = "Uncomplete"
        }

        newLiToDo.append(toDoLabel, newCompBtn, newDelBtn)
        $.getElementById("todoList").append(newLiToDo)

        inputToDo.value = ""
    }
    )
}

function markAsCompleted(ToDoId) {
    let localStorageToDos = JSON.parse(localStorage.getItem("ToDos"))
    ToDosArray = localStorageToDos

    ToDosArray.forEach(function(ToDo) {
        if(ToDo.id == ToDoId){
            ToDo.complete = !ToDo.complete
        }
    })

    setLocalStorage(ToDosArray)
    generateToDoItem(ToDosArray)
}

function delTodoItem(ToDoId) {
    let localStorageToDos = JSON.parse(localStorage.getItem("ToDos"))
    ToDosArray = localStorageToDos
    let ToDoItemIndex = ToDosArray.findIndex(function(ToDoItem) {
        return ToDoItem.id === ToDoId
    })
    ToDosArray.splice(ToDoItemIndex,1)
    setLocalStorage(ToDosArray)
    generateToDoItem(ToDosArray)
}



function clearAllToDos() {
    let allToDos = $.getElementById("todoList").children
    Array.from(allToDos).forEach(ToDo => ToDo.remove())
    ToDosArray = []
    // localStorage.clear()
    localStorage.removeItem('ToDos')
}

Array.from(completeToDoBtn).forEach( 
    element => element.addEventListener("click", function () {
        element.innerHTML = "Completed!"
        element.previousElementSibling.style.textDecoration = "line-through";
        element.previousElementSibling.style.color = "#afa7a7"
    })
)

function getLocalStorage() {
    let   localData = JSON.parse(localStorage.getItem("ToDos"))

    if(localData) {
        ToDosArray = localData
    }else{
        console.log( "No data found in Local Storage");
        ToDosArray = []
    }

    generateToDoItem(ToDosArray)

}

window.addEventListener("load", getLocalStorage)
addBtn.addEventListener("click", addToDoItem)
clearAllBtn.addEventListener("click",  clearAllToDos)