let inProgessCount = 0;
let awitFeedbackCount = 0;
let taskInBoard = 0;
let todoCount = 0;
let doneCount = 0;
let urgentCount = 0;
let current_user = {};
let dates = new Array;
let upcomingDeadline = '';


async function greet() {
    currentlyDate = new Date();
    curentlyHour = currentlyDate.getHours();
    if (curentlyHour >= 3 && curentlyHour < 12) document.getElementById('hallo').innerHTML = `Good Morning,`;
    if (curentlyHour >= 12 && curentlyHour < 18) document.getElementById('hallo').innerHTML = `Good afternoon,`;
    if (curentlyHour >= 18) document.getElementById('hallo').innerHTML = `Good evening,`;
    if (curentlyHour >= 0 && curentlyHour < 3) document.getElementById('hallo').innerHTML = `Good evening,`;
    document.getElementById('greetName').innerHTML = `${user_name}`;
};


async function init() {
    getCurrentUser();
    await getItem('tasks');
    await getItem('currentUser_name');
    if (tasks !== null) {
        taskInBoard = tasks.length;
        tasks.forEach(task => {
            checkPrioAndDate(task);
            checkStatus(task.status);
        });
        dateDeatline(dates);
    }
    genHtmlToSeite();
    greet();
};

function checkPrioAndDate(task) {
    if (task.prio === 'urgent') {
        urgentCount++;
    }
    dates.push(task.date);
}

function dateDeatline(array) {
    var today = new Date();
    var nextDate = array
        .filter(function (datum) {
            return new Date(datum) >= today;
        })
        .sort(function (a, b) {
            return new Date(a) - new Date(b);
        })
        .shift();
        if (nextDate == undefined) upcomingDeadline = 'No deadline';
        else formatDate(nextDate);
    

}

function formatDate(nextDate) {
    let d = new Date(nextDate)
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    upcomingDeadline = day + "." + month + "." + year;
}

function checkStatus(status) {
    switch (status) {
        case 'progress':
            inProgessCount++
            break;
        case 'feedback':
            awitFeedbackCount++
            break;
        case 'todo':
            todoCount++
            break;
        case 'done':
            doneCount++
            break;
        default:
            break;
    }
};


function genHtmlToSeite() {
    document.getElementById('overview').innerHTML = `
    <div class="summery_head">
            <div class="headline">Summary</div>
            <div class="nutshell">
                <span>Everything in a nutshell!</span>
            </div>
            <div class="seperator" style="display: none;"></div>
        </div>
        <div class="task">
            <a href="board.html" class="task_sub">
                <span class="count">
                    ${taskInBoard}
                </span>
                <span class="status">
                    Tasks in <br>
                    Board
                </span>
            </a>
            <a href="board.html" class="task_sub">
                <span class="count">
                    ${inProgessCount}
                </span>
                <span class="status">
                    Tasks in <br>
                    Progress
                </span>
            </a>
            <a href="board.html" class="task_sub">
                <span class="count">
                    ${awitFeedbackCount}
                </span>
                <span class="status">
                    Awaiting <br>
                    Feedback
                </span>
            </a>
        </div>
        <a href="board.html" class="prio_date">
            <div class="prio_date_sub">
                <img src="assets/img/urgent.svg" alt="">
                <div class="todo">
                    <span class="count">
                        ${urgentCount}
                    </span>
                    <span class="status">
                        Urgent
                    </span>
                </div>
            </div>
            <div>
                <div class="todo">
                    <span class="datum">
                        ${upcomingDeadline}
                        <span class="status">Upcoming Deadline</span>
                    </span>
                    
                </div>
            </div>
        </a>
        <div class="todo_done">
            <a href="board.html" class="todo_done_sub">
                <img src="assets/img/pencil.svg" alt="">
                <div class="todo">
                    <span class="count">
                        ${todoCount}
                    </span>
                    <span class="status">
                        To-do
                    </span>
                </div>
            </a>
            <a href="board.html" class="todo_done_sub">
                <img src="assets/img/check.svg" alt="">
                <div class="todo">
                    <span class="count">
                        ${doneCount}
                    </span>
                    <span class="status">
                        Done
                    </span>
                </div>
            </a>
        </div>
    
    
    
    `;
}

