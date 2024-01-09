const monthElement = document.querySelector('.month');
const daysList = document.querySelector('.days');
const lastMonthBtn = document.querySelector('.last-month');
const nextMonthBtn = document.querySelector('.next-month');
const yearElement = document.querySelector('.year-txt');
const todayMonthBtn = document.querySelector('.today-month');

let localStorageKey = "my-todo";
let todoItemObj = {};

let currentDate = new Date(); 

todayMonthBtn.addEventListener('click', goToCurrentMonth);

function goToCurrentMonth() {
    currentDate = new Date(); // 將 currentDate 設置為當前日期
    renderCalendar(); // 重新顯示日曆
}

function openCreateTodoModal(date) {
    const modal = document.getElementById('create_todo_modal');
    const dateInput = document.getElementById('date_input');
    
    // 將特定日期設置到日期欄位中
    dateInput.value = date;

    // 顯示彈跳視窗
    const createTodoModal = new bootstrap.Modal(modal);
    createTodoModal.show();
}

//新增待辦清單
function createTodo() {
    const dateInput = document.getElementById('date_input');
    const todoInput = document.getElementById('todo_item_input');
    const todoText = todoInput.value;
    const dateStr = dateInput.value;

    setTodoToStorage(dateStr, todoText); // 將待辦事項保存到 localStorage
    todoInput.value = ''; // 清空待辦事項輸入欄位
    renderCalendar(); // 重新渲染日曆以顯示新添加的待辦事項
    closeModal('create_todo_modal'); // 關閉彈跳視窗
}


//關閉彈跳視窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
        modalInstance.hide();
    }
}

getTodoFromStorage();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstWeekDay = firstDayOfMonth.getDay();

    const monthNames = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    monthElement.innerHTML = `<span>${(month + 1).toString().padStart(2, '0')}</span> ${monthNames[month]}`;
    yearElement.textContent = year.toString();

    daysList.innerHTML = '';

    const today = new Date(); // 取得今天日期
    for (let i = 0; i < firstWeekDay; i++) {
        const emptyDayElement = document.createElement('li');
        emptyDayElement.textContent = '';
        daysList.appendChild(emptyDayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('li');

        const dateNumElement = document.createElement('p');
        dateNumElement.classList.add('date-num');
        dateNumElement.innerText = i;

        dayElement.appendChild(dateNumElement);
        daysList.appendChild(dayElement);

        if (
            i === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        ) {
            dayElement.classList.add('today');
        }

        dayElement.addEventListener('click', () => {
            const selectedDate = dateNumElement.textContent;
            const selectedMonth = monthElement.textContent.split(' ')[1];
            const formattedDate = `${selectedDate.padStart(2, '0')} ${selectedMonth}`;
            openCreateTodoModal(formattedDate);
        });

        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const todoItems = todoItemObj[dateStr];

        if (todoItems && todoItems.length > 0) {
            const todoList = document.createElement('ul');
            todoItems.forEach(todo => {
                const todoItem = document.createElement('li');
                todoItem.textContent = todo;
                todoList.appendChild(todoItem);
            });
            dayElement.appendChild(todoList);
        }
    }

    const remainingDays = (firstWeekDay + daysInMonth) % 7 === 0 ? 0 : 7 - ((firstWeekDay + daysInMonth) % 7);
    if (remainingDays !== 0) {
        for (let i = 0; i < remainingDays; i++) {
            const emptyDayElement = document.createElement('li');
            emptyDayElement.textContent = '';
            daysList.appendChild(emptyDayElement);
        }
    }
}

function goToLastMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

lastMonthBtn.addEventListener('click', goToLastMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);

function setTodoToStorage(dateStr, content) {
    if(!Array.isArray(todoItemObj[dateStr])){
        todoItemObj[dateStr]=[];
    }

    todoItemObj[dateStr].push(content)

    let jsonStr = JSON.stringify(todoItemObj);
    localStorage.setItem(localStorageKey,jsonStr);
}

function getTodoFromStorage() {
    const todoObj = JSON.parse(localStorage.getItem(localStorageKey));
    if (todoObj) {
        todoItemObj = todoObj;
    }
}

function openCreateTodoModal(date) {
    const modal = document.getElementById('create_todo_modal');
    const dateInput = document.getElementById('date_input');
    
    // 將特定日期設置到日期欄位中
    dateInput.value = date;

    // 顯示彈跳視窗
    const createTodoModal = new bootstrap.Modal(modal);
    createTodoModal.show();

    document.querySelector('#create_todo_modal .btn-primary').addEventListener('click', () => {
        const todoText = document.getElementById('todo_item_input').value;
        setTodoToStorage(date, todoText); // 將待辦事項保存到 localStorage
        renderCalendar(); // 重新渲染日曆以顯示新添加的待辦事項
    });
}

renderCalendar();
