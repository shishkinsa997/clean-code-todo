const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-button');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createDomElement = (tag, properties = {}) => {
  return Object.assign(document.createElement(tag), properties);
};

const createNewTaskElement = function (taskString) {
  const listItem = createDomElement('li');

  const checkBox = createDomElement('input', { type: 'checkbox' });
  const label = createDomElement('label', { innerText: taskString, className: 'task-label' });

  const editInput = createDomElement('input', { type: 'text', className: 'task-input' });
  const editButton = createDomElement('button', { innerText: 'Edit', className: 'edit-button' }); //innerText encodes special characters, HTML does not.

  const deleteButton = createDomElement('button', { className: 'delete-button' });
  const deleteButtonImg = createDomElement('img', { src: './remove.svg', alt: 'remove' });

  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.append(listItem);

  taskInput.value = '';
};

const editTask = function (listItem) {
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit-button');
  const isEditMode = listItem.classList.contains('edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function (listItem) {
  listItem.remove();
};

const handleTaskClick = function (event) {
  const listItem = event.target.closest('li');
  if (!listItem) return;

  if (event.target.closest('.edit-button')) {
    editTask(listItem);
  } else if (event.target.closest('.delete-button')) {
    deleteTask(listItem);
  }
};

const handleTaskChange = function (event) {
  const checkBox = event.target;
  if (!checkBox.matches('input[type=checkbox]')) return;

  const listItem = checkBox.closest('li');
  if (!listItem) return;

  const targetHolder = checkBox.checked ? completedTasksHolder : incompleteTaskHolder;
  targetHolder.append(listItem);
};

addButton.addEventListener('click', addTask);
incompleteTaskHolder.addEventListener('click', handleTaskClick);
completedTasksHolder.addEventListener('click', handleTaskClick);
incompleteTaskHolder.addEventListener('change', handleTaskChange);
completedTasksHolder.addEventListener('change', handleTaskChange);
