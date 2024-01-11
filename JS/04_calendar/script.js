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


//     todoInput.value = ''; // 清空待辦事項輸入欄位
    

//     todoInput.value = ''; // 清空待辦事項輸入欄位



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

    let monthString  = (month + 1).toString().padStart(2, '0')
    monthElement.innerHTML = `<span>${monthString}</span> ${monthNames[month]}`;
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
        // more-button
        const moreButton = document.createElement('button');
        moreButton.textContent = 'MORE';
        moreButton.classList.add('more-button');
        

        //moreBtn 內容
        moreButton.addEventListener('click', () => {
            const todoItems = todoItemObj[dateStr];
            const modalBody = document.querySelector('#more_todo_modal .modal-body');
            
            modalBody.innerHTML = '<ul>';
            if (todoItems && todoItems.length > 0) {
                todoItems.forEach((item, index) => {
                    const itemNumber = index + 1;
                    modalBody.innerHTML += `<li> (${itemNumber}) ${item}</li>`;
                });
            } else {
                modalBody.innerHTML += '<li>沒有待辦事項</li>';
            }
            modalBody.innerHTML += '</ul>';
    
            event.stopPropagation(); // 阻止事件冒泡(防止新增待辦事項視窗出現)
           
            
        });

        dayElement.appendChild(moreButton);
        dayElement.appendChild(dateNumElement);
        daysList.appendChild(dayElement);

        //show more modal
        moreButton.addEventListener('click', () => {
            const moreTodoModal = new bootstrap.Modal(document.getElementById('more_todo_modal'));
            moreTodoModal.show();
            createTodoModal.hide();
        });

        if (
            i === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        ) {
            dayElement.classList.add('today');
        }

        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

        dayElement.addEventListener('click', () => {
            console.log('dayElement click');
            openCreateTodoModal(dateStr);
        });

        const todoItems = todoItemObj[dateStr];

        if (todoItems && todoItems.length > 0) {
            const todoList = document.createElement('ul');
            for(let i = 0; i < todoItems.length; i++){
                const todoItem = document.createElement('li');
                todoItem.textContent = todoItems[i];

                todoItem.addEventListener('click', (e) => {
                    openUpdateTodoModal(dateStr, todoItems[i], i);
                    e.stopPropagation();
                });

                todoList.appendChild(todoItem);
            }

            // 隱藏超過三筆的待辦事項
        if (todoItems.length > 2) {
            dayElement.classList.add('hide-excess-todos');
        }
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

function setTodoToStorage(dateStr, content, index) {
    if(!Array.isArray(todoItemObj[dateStr])){
        todoItemObj[dateStr]=[];
    }

    console.log('setTodoToStorage')

    if(index >= 0){
        todoItemObj[dateStr][index] = content;
    } else {
        todoItemObj[dateStr].push(content)
    }

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
    const todoInput = document.getElementById('todo_item_input');
    todoInput.value = ''; // 清空待辦事項輸入欄位
    
    // 將特定日期設置到日期欄位中
    dateInput.value = date;

    // 顯示彈跳視窗
    const createTodoModal = new bootstrap.Modal(modal);
    createTodoModal.show();
}

//新增行程
document.querySelector('#create_todo_modal .add-btn').addEventListener('click', () => {
    const todoText = document.getElementById('todo_item_input').value;
    const dateInput = document.getElementById('date_input');
    const date = dateInput.value;
    setTodoToStorage(date, todoText, -1); // 將待辦事項保存到 localStorage
    renderCalendar(); // 重新渲染日曆以顯示新添加的待辦事項
    console.log('add click');
    closeModal('create_todo_modal'); // 關閉彈跳視窗
});

//編輯行程
function openUpdateTodoModal(date, todoText, index) {
    const modal = document.getElementById('update_todo_modal');
    const dateInput = document.getElementById('date_update_input');
    const todoInput = document.getElementById('todo_item_update_input');
    const todo_id = document.getElementById('todo_id');
    todoInput.value = todoText; // 清空待辦事項輸入欄位
    todo_id.value = index;
    
    // 將特定日期設置到日期欄位中
    dateInput.value = date;

    // 顯示彈跳視窗
    const updateTodoModal = new bootstrap.Modal(modal);
    updateTodoModal.show();
}

document.querySelector('#update_todo_modal .update-btn').addEventListener('click', () => {
    const todoText = document.getElementById('todo_item_update_input').value;
    const dateInput = document.getElementById('date_update_input');
    const todo_id = document.getElementById('todo_id');
    const date = dateInput.value;
    const index = todo_id.value * 1;
    setTodoToStorage(date, todoText, index); // 將待辦事項保存到 localStorage
    renderCalendar(); // 重新渲染日曆以顯示新添加的待辦事項
    console.log('update click');
    closeModal('update_todo_modal'); // 關閉彈跳視窗
});

//刪除待辦清單
document.querySelector('#update_todo_modal .delete-btn').addEventListener('click', () => {
    const todo_id = document.getElementById('todo_id');
    const index = todo_id.value * 1;
    const dateInput = document.getElementById('date_update_input');
    const date = dateInput.value;
    
    deleteTodoFromStorage(date, index); // 直接刪除待辦事項
    renderCalendar(); // 重新渲染日曆以顯示刪除後的待辦事項
    closeModal('update_todo_modal'); // 關閉彈跳視窗
});

// 從 localStorage 刪除待辦事項的函式
function deleteTodoFromStorage(dateStr, index) {
    if (Array.isArray(todoItemObj[dateStr]) && index >= 0) {
        todoItemObj[dateStr].splice(index, 1); // 從陣列中刪除指定索引的待辦事項
        let jsonStr = JSON.stringify(todoItemObj);
        localStorage.setItem(localStorageKey, jsonStr); // 更新 localStorage
    }
}

//新增行程按鈕
document.querySelector('.add-icon').addEventListener('click', () => {
    const createTodoModal = new bootstrap.Modal(document.getElementById('create_todo_modal'));
    createTodoModal.show();

    // 清空日期及待辦清單欄位的值
    document.getElementById('date_input').value = '';
    document.getElementById('todo_item_input').value = '';
});



renderCalendar();
