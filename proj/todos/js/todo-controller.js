'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    // sortTodos(sortBy);
    var elMsg = document.querySelector('.todo-list h3');
    if (!todos || todos.length === 0) {
        if (gFilterBy === 'all') {
            elMsg.innerText = 'No Todos';
        } else if (gFilterBy === 'active') {
            elMsg.innerText = 'No Active Todos';
        } else {
            elMsg.innerText = 'No Done Todos';
        }
    } else {
        elMsg.innerText = '';
    }
    var strHTMLs = todos.map(function(todo) {
            var className = (todo.isDone) ? 'done' : ''
            return `  
            <li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.importance} | ${todo.timeStamp.toLocaleString()} | ${todo.txt}
            <button class="btn-remove" onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            </li>`;
        })
        // console.log('strHTMLs', strHTMLs);
    var elTodoList = document.querySelector('.todo-list ul')
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.stat-total').innerText = getTotalCount();
    document.querySelector('.stat-active').innerText = getActiveCount();

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    // console.log('Removing', todoId);
    if (confirm('are you sure?')) {
        removeTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();

}

function onAddTodo() {
    var elTxt = document.querySelector('input[name=newTodoTxt]');
    var txt = elTxt.value;
    var elImportance = document.querySelector('input[name=importance]');
    var importance = elImportance.value;
    if (!txt || importance > 3 || importance < 1) return;
    addTodo(txt, +importance);
    elTxt.value = '';
    elImportance.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    console.log('Filtering', filterBy);
    renderTodos();
}

function onSort(sortBy) {
    sortTodos(sortBy);
    renderTodos();
}