//Step1 --> User -type-> Input parameter
// User --Interact-> + button

// after + button --Task Listout--> btn , del
//                  -->Input content--> Input downward List etc
//Elements
var todoList = [];
var comboList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");
var saveAll = document.getElementById('saveAll');

function onLoad() {
    var temp = localStorage.getItem('oldTask');
    if (temp != null) {
        todoList = JSON.parse(temp); //localstorage contains data then return
    }
    else {
        todoList = []; // if there is no data then keep 0 as it is else null will come
    }
    updateList();
    appendTask(todoList);
}
onLoad();

//event listeneres for add and delete
function updateList() {

    comboList = todoList.filter((data) => {
        if (data.complete == true) return data;
    });

    remList = todoList.filter((data) => {
        if (data.complete == false) return data;
    });

    document.querySelector('#r-count').textContent = todoList.length;
    document.querySelector('#c-count').textContent = comboList.length;

}
function appendTask(todoList) {
    allTodos.innerHTML = ''; //empty
    todoList.forEach((element) => {
        var x = `<li id=${element.id} class="todo-item">
                <p id="task"> ${element.complete ? `<strike>${element.content}</strike>` : element.content}</p>
                <div class="todo-actions">
                    <button class="complete btn btn-success">
                        <i class="ci bx bx-check bx-sm"></i>
                    </button>

                    <button class="delete btn btn-error">
                        <i class="ci bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>`
        allTodos.innerHTML += x;
    });
}

function deleteAll() {
    todoList = [];
    updateList();
    appendTask(todoList);
}
function add() {
    var text = todoInput.value;

    if (text == "") {
        alert("No content added");
        return;
    }
    console.log((text));
    todoList.push({
        content: text,
        id: Date.now().toString(),
        complete: false
    });

    todoList.forEach((value) => {
        console.log(value);
    });
    todoInput.value = "";
    // document.querySelector('#r-count').textContent = todoList.length; //removed and movced to updateList function

    updateList(); //entire 2 remaining array  -->> completiotion , remaining update and reflect (total task and coompleted)

    appendTask(todoList);
}
addButton.addEventListener('click', add);
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        add();
    }
})
deleteAllButton.addEventListener('click', deleteAll);

function deleteS() {
    todoList = todoList.filter((data) => {
        if (data.complete === false) {
            return data;
        }
    });
    updateList();
    appendTask(todoList);
}

//step user --click-> addeve...('click', fn)
//html -->  X 
// Js --> Dynamically --> errror-> X
// when add event list... js calls webAPI which calls (elemnet , click , functiomn name) 
//event.target helps or guides js or api to select only the clicked element not every elemnt and it searches for the class 'delete' or 'di'
//if it founds that in the clicked elemnet then it goes to perform the function
deleteSButton.addEventListener('click', deleteS);


function save() {
    localStorage.setItem('oldTask', JSON.stringify(remList));
}
saveAll.addEventListener('click', save);


function deleteSpecific(event) {
    var id = event.target.parentElement.parentElement.getAttribute('id');
    console.log(id);
    todoList = todoList.filter((data) => {
        return data.id != id;
    });
    updateList();
    appendTask(todoList);
}

function completeSpecific(event) {
    var id = event.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((data) => {
        if (data.id == id) {
            if (data.complete == false) {
                data.complete = true;
                event.target.parentElement.parentElement.querySelector('#task').classList.add('line');
            }
            else {
                data.complete = false;
                event.target.parentElement.parentElement.querySelector('#task').classList.remove('line');

            }
        }

    });
    updateList();
    appendTask(todoList);
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete') || event.target.classList.contains('di')) {
        console.log(event.target);
        deleteSpecific(event);
    }
    if (event.target.classList.contains('complete') || event.target.classList.contains('ci')) {
        console.log(event.target);
        completeSpecific(event);
    }
    if (event.target.classList.contains('all')) {
        updateList();
        appendTask(todoList);
    }
    if (event.target.classList.contains('rem')) {
        updateList();
        appendTask(remList);
    }
    if (event.target.classList.contains('com')) {
        updateList();
        appendTask(comboList);
    }
})