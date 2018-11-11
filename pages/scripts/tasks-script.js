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
        });
}

getAllTasks();

var createNewTask = function createTask(newTask)
{
    return fetch(tasksUrl,
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

        listItem.appendChild(document.createTextNode(tasksData[index].taskName + " " + tasksData[index].taskDeadline));
        taskList.appendChild(listItem);        
    }
}

var todayDealineButton = document.getElementById("todayButton");
var yesterdayDeadlineButton = document.getElementById("yesterdayButton");
var otherDayButton = document.getElementById("otherDayButton");
var deadlineLable = document.getElementById("deadlineLable");
var deadlineDate;

function deadLineButtonsClick() {
    todayDealineButton.disabled = true;
    yesterdayDeadlineButton.disabled = true;
    otherDayButton.disabled = true;
}

todayDealineButton.addEventListener("click", function() {
    function getTodaysDate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if(day < 10){
            day = "0" + day;
        }

        if(month < 10) {
            month = "0" + month;
        }

        date = day + "/" + month + "/" + year;
        return date;
    }

    deadlineDate = getTodaysDate();
    deadlineLable.innerText = deadlineDate;
    deadLineButtonsClick();
});

yesterdayDeadlineButton.addEventListener("click", function() {
    function getYesterDaysDate()
    {
        var date = new Date();
        var day = date.getDate() - 1;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if(day < 10){
            day = "0" + day;
        }

        if(month < 10) {
            month = "0" + month;
        }

        date = day + "/" + month + "/" + year;
        return date;
    }
    deadlineDate = getYesterDaysDate();
    deadlineLable.innerText = deadlineDate;
    deadLineButtonsClick();
});

function createTask() {
    var taskNameInput =  document.getElementById("taskName");
    var newTask = ({
        taskName: taskNameInput.value,
        taskDeadline: deadlineDate,
        isDone: false
    });

    createNewTask(newTask);
    location.reload(true);//true - reloads from server; false(default) - reloads from the cache
};

createTaskButton.addEventListener("click", createTask);
