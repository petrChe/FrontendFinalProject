const tasksUrl = "http://localhost:3000/tasks";
var createTaskButton = document.getElementById("createTaskButton");
var allTasks;
var getAllTasks = function getAll() {

var getAllResponse = fetch(tasksUrl,
    {
        method: 'get'
    })
    .then((response) => response.json())
    .then((res) => {
        allTasks = JSON.parse(JSON.stringify(res));
        fillTaskListUl(allTasks);
        AddEventListenersToIsDoneCheckboxes();
    });
}

getAllTasks();

var createNewTask = function createTask(newTask)
{
    fetch(tasksUrl,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then((response) => response.json);
}


function fillTaskListUl(tasksData) {
    var taskList = document.getElementById("tasksList");

    for (let index = 0; index < tasksData.length; index++) {
        var listItem = document.createElement("li");

        var isDoneCheckBox = document.createElement("input");
        isDoneCheckBox.setAttribute("type", "checkbox");
        isDoneCheckBox.setAttribute('id', "isDoneCheckbox-" + tasksData[index].id);
        isDoneCheckBox.checked = tasksData[index].isDone === true;
        isDoneCheckBox.disabled = tasksData[index].isDone === true;

        listItem.appendChild(document.createTextNode(tasksData[index].taskName + " " + tasksData[index].taskDeadline));
        listItem.appendChild(isDoneCheckBox);
        taskList.appendChild(listItem);        
    }
}

function AddEventListenersToIsDoneCheckboxes() {
    var isDoneCheckBoxes = document.querySelectorAll("input[type=checkbox]");

    isDoneCheckBoxes.forEach(element => {
        if(element.id.includes("isDoneCheckbox")) {
            element.addEventListener('change', function(element)
        {
            if(this.checked)
            {
                var isAgreedToClose = confirm("Do you want to close the task");
                if(isAgreedToClose) {
                    //update
                    updateIsDoneValue(this.id);
                    location.reload(true);
                }
            }
        });
        }
    });
}

var todayDealineButton = document.getElementById("todayButton");
var yesterdayDeadlineButton = document.getElementById("yesterdayButton");
var otherDayButton = document.getElementById("otherDayButton");
var deadlineLable = document.getElementById("deadlineLable");
var deadlineDate;

/*function deadLineButtonsClick() {
    todayDealineButton.disabled = true;
    yesterdayDeadlineButton.disabled = true;
    otherDayButton.disabled = true;
}*/

todayDealineButton.addEventListener("click", function() {   
    deadlineDate = formatDate(null);
    deadlineLable.innerText = deadlineDate;
});

yesterdayDeadlineButton.addEventListener("click", function() {
    var todayDate = new Date();
    var yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    deadlineDate = formatDate(yesterdayDate);
    deadlineLable.innerText = deadlineDate;
});

otherDayButton.addEventListener("click", function()
{
    var modalWindow = document.getElementById("otherDayModal");
    var closeSpan = document.getElementsByClassName("close")[0];

    modalWindow.style.display = "block";
    
    closeSpan.onclick = function(){
        var calendar = document.getElementsByClassName("other-day")[0];
        if(calendar) {
            deadlineDate = formatDate(calendar.value);
            deadlineLable.innerText = deadlineDate;
        }

        modalWindow.style.display = "none";
    }
})

function validateAdding(element){
    if(!element.checkValidity()){
        document.getElementById("taskError").innerHTML = element.validationMessage;
        return false;
    }

    return true;
}


function createTask() {
    var taskNameInput = document.getElementById("taskName");

    var isValid = validateAdding(taskNameInput);

    if(isValid) {
        var newTask = ({
            taskName: taskNameInput.value,
            taskDeadline: deadlineDate,
            isDone: false
        });

        createNewTask(newTask, validateAdding(taskNameInput));
        location.reload(true);//true - reloads from server; false(default) - reloads from the cache
    }
};

createTaskButton.addEventListener("click", createTask);

function formatDate(date) {
    var taskDate;

    if(date) {
        taskDate = new Date(date);
    }
    else {
        taskDate = new Date();
    }
    var day = taskDate.getDate();
    var month = taskDate.getMonth() + 1;
    var year = taskDate.getFullYear();

    if(day < 10){
        day = "0" + day;
    }

    if(month < 10) {
        month = "0" + month;
    }

    date = day + "/" + month + "/" + year;
    return date;
}

function updateIsDoneValue(id) {
    var taskId = String(id).split('-').pop();

    var task = ({
        isDone: true
    });

    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)  
    };
    
    fetch(tasksUrl + "/" + taskId, options)
        .then((response) => response.json);       
    
};