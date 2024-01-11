// 從localStorage（todos）中取得待辦事項，若沒有則初始化為空陣列
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 取得DOM元素
const input = document.querySelector('.todo'); // 輸入待辦事項的欄位
const newListButton = document.querySelector('.newList'); // 新增待辦事項按鈕
const resetButton = document.querySelector('.reset'); // reset待辦事項按鈕
const listContainer = document.querySelector('.list'); // 待辦事項列表的容器

// render待辦事項列表的函式
const renderTodos = () => {
  listContainer.innerHTML = ''; // 清空列表

  // 迭代待辦事項陣列，將每個待辦事項render成對應的HTML元素
  todos.forEach((todo, index) => {
    // 創建待辦事項的HTML元素
    const todoItem = document.createElement('div');
    todoItem.classList.add('input-group', 'mb-3');

    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('input-group-text', 'check');

    const checkBox = document.createElement('input');
    checkBox.classList.add('form-check-input', 'mt-0');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.completed; // 根據待辦事項完成狀態設置勾選狀態
    checkBox.addEventListener('change', () => {
      // 更新待辦事項完成狀態，並重新render至列表
      todos[index].completed = checkBox.checked;
      saveTodos();
      renderTodos();
    });

    // updateTodo 可以考慮抽 function

    checkBoxDiv.append(checkBox);

    const todoInput = document.createElement('input');
    todoInput.classList.add('form-control');
    todoInput.type = 'text';
    todoInput.value = todo.text;
    todoInput.disabled = true; // 預設禁用編輯

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-danger'); // 編輯按鈕紅色
    editButton.textContent = '編輯';
    editButton.addEventListener('click', () => {
      // 根據按鈕狀態切換待辦事項的編輯狀態
      if (editButton.textContent === '編輯') {
        todoInput.disabled = false; //可編輯
        editButton.textContent = '保存';
        editButton.classList.remove('btn-danger');
        editButton.classList.add('btn-warning'); // 保存按鈕黃色
      } else {
        todoInput.disabled = true;
        editButton.textContent = '編輯';
        editButton.classList.remove('btn-warning');
        editButton.classList.add('btn-danger'); //改為按鈕紅色
        todos[index].text = todoInput.value;
        saveTodos();
        renderTodos();
      }
    });
    // editTodo 可以考慮抽 function

    const delButton = document.createElement('button');
    delButton.classList.add('btn', 'btn-secondary');
    delButton.textContent = '刪除';
    delButton.addEventListener('click', () => {
      // 刪除待辦事項(索引值,刪除1個元素)，並重新render列表
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    // TODO: deleteTodo 可以考慮抽 function

    // 將各個元素添加至代辦事項容器
    todoItem.append(checkBoxDiv);
    todoItem.append(todoInput);
    todoItem.append(editButton);
    todoItem.append(delButton);

    listContainer.append(todoItem);
  });
};

// 將待辦事項儲存至localStorage的函式
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// 新增待辦事項監聽事件
newListButton.addEventListener('click', () => {
  const todoText = input.value.trim();
  if (todoText !== '') {
    // 新增待辦事項至陣列，並重render列表
    todos.push({ text: todoText, completed: false }); //預設沒勾選
    saveTodos();
    input.value = ''; // 清空輸入欄
    renderTodos();
  }
});

// createTodo 可以考慮抽 function

// 重置待辦事項列表監聽事件
resetButton.addEventListener('click', () => {
  // 清除localStorage中的待辦事項，並重新render列表
  localStorage.removeItem('todos');
  todos = [];
  renderTodos();
});

// resetTodoList 可以考慮抽 function

// 初始化render待辦事項列表
renderTodos();

// 可以考慮將 renderTodos 在 window.onload 的時候後執行？

// Q: What is the difference between funciton declaration and function expression?
// Q: Why is that you using function expression in the project?
// Q: Note that saveTodos and renderTodos are both function expressions Why is that saveTodos declaring after renderTodos but it still work?
// Q: How to refacor your html tags using semantic tags?