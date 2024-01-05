// 從 localStorage 中獲取 todos，如果為空則設置為空陣列
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// render待辦事項列表
const renderTodos = () => {
  const listContainer = document.querySelector('.list');
  listContainer.innerHTML = ''; // 清空列表

  // 迭代 todos 陣列
  todos.forEach((todo, index) => {
    // 創建待辦事項項目的 HTML 元素
    const todoItem = document.createElement('div');
    todoItem.classList.add('input-group', 'mb-3');

    // 創建勾選框的 HTML 元素
    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('input-group-text', 'check');

    const checkBox = document.createElement('input');
    checkBox.classList.add('form-check-input', 'mt-0');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.completed; // 根據待辦事項完成狀態設置勾選狀態
    checkBox.addEventListener('change', () => {
      todos[index].completed = checkBox.checked;
      saveTodos();
      renderTodos();
    });

    checkBoxDiv.append(checkBox);

    // 創建輸入框的 HTML 元素
    const todoInput = document.createElement('input');
    todoInput.classList.add('form-control');
    todoInput.type = 'text';
    todoInput.value = todo.text;
    todoInput.disabled = true; // 預設禁用編輯

    // 創建編輯按鈕的 HTML 元素
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-danger'); // 編輯按鈕紅色
    editButton.textContent = '編輯';
    editButton.addEventListener('click', () => {
      if (editButton.textContent === '編輯') {
        // 啟用編輯
        todoInput.disabled = false;
        editButton.textContent = '保存';
        editButton.classList.remove('btn-danger');
        editButton.classList.add('btn-warning'); // 保存按鈕黃色
      } else {
        // 停止編輯
        todoInput.disabled = true;
        editButton.textContent = '編輯';
        editButton.classList.remove('btn-warning');
        editButton.classList.add('btn-danger');
        todos[index].text = todoInput.value;
        saveTodos();
        renderTodos();
      }
    });

    // 創建刪除按鈕的 HTML 元素
    const delButton = document.createElement('button');
    delButton.classList.add('btn', 'btn-secondary');
    delButton.textContent = '刪除';
    delButton.addEventListener('click', () => {
      // 刪除index索引的1個元素-待辦事項
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    // 將創建的 HTML 元素添加到待辦事項項目中
    todoItem.append(checkBoxDiv);
    todoItem.append(todoInput);
    todoItem.append(editButton);
    todoItem.append(delButton);

    // 將待辦事項項目添加到列表容器中
    listContainer.append(todoItem);
  });
};

// 保存 todos 到 localStorage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// 新增代辦事項
document.querySelector('.newList').addEventListener('click', () => {
  const input = document.querySelector('.todo');
  const todoText = input.value.trim();
  if (todoText !== '') {
    todos.push({ text: todoText, completed: false }); // 預設未完成
    saveTodos();
    input.value = ''; // 清空輸入欄
    renderTodos();
  }
});

// 重置代辦事項列表
document.querySelector('.reset').addEventListener('click', () => {
  localStorage.removeItem('todos');
  todos = [];
  renderTodos();
});

// 初始化render待辦事項列表
renderTodos();
