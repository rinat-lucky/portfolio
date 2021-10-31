const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const pendingNumb = document.querySelector('.pendingNumb');
const deleteAllBtn = document.querySelector('.footer button');

// проверка введенного текста для активации кнопки добавления задачи
function inputTask() {
    let userData = inputBox.value; // текст введенной задачи
    if (userData.trim() != 0) { // проверка на то, что введен не пробел
        addBtn.classList.add('active'); // класс активности для кнопки добавления задачи
    } else {
        addBtn.classList.remove('active');
    }
};

// добавление задачи в local storage
function addTask() {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('Мои задачи');
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem('Мои задачи', JSON.stringify(listArr)); // обновление списка задач в хранилище
    showTasks();
    addBtn.classList.remove('active');
};

// вывод на экран списка задач, которые хранятся в local storage
function showTasks() {
    let getLocalStorage = localStorage.getItem('Мои задачи'); // получение списка (массива) задач из хранилища в формате JSON
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    pendingNumb.textContent = listArr.length; // длину массива выводим в поле "всего задач ..."
    if (listArr.length > 0) {
        deleteAllBtn.classList.add('active'); // класс активности для кнопки очистки
    } else {
        deleteAllBtn.classList.remove('active');
    } // если задач нет, то кнопка очистки неактивна

    let newLiTag =''; // переменная, значение которой - это текст задачи
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // динамическое добавление текста новой задачи в список задач
    inputBox.value = ''; // очистка инпута после добавления задачи в список
}

// удаление одной конкретной задачи
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('Мои задачи');
    listArr = JSON.parse(getLocalStorage); // получение списка задач из хранилища

    listArr.splice(index, 1); // удаление из массива задач той задачи, в одной строке с которой была нажата кнопка "удалить"
    localStorage.setItem('Мои задачи', JSON.stringify(listArr)); // обновление списка задач в хранилище
    showTasks(); 
}

// удаление сразу всех задач
function clearTasks() {
    listArr = []; // делаем список задач пустым
    localStorage.setItem('Мои задачи', JSON.stringify(listArr)); // обновление списка задач в хранилище
    showTasks();
};

inputBox.addEventListener('keyup', inputTask); // ввод текста задачи
addBtn.addEventListener('click', addTask); // клик пользователя на кнопку "добавить задачу"
deleteAllBtn.addEventListener('click', clearTasks); // клик пользователя на кнопку "очистить"

showTasks();
inputTask();
addTask();
clearTasks();