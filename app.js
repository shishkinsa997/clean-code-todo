const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = createDomElement('li');

  const checkBox = createDomElement('input', { type: 'checkbox' });
  const label = createDomElement('label', { innerText: taskString, className: 'task-label' });

  const editInput = createDomElement('input', { type: 'text', className: 'task-input' });
  const editButton = createDomElement('button', { innerText: 'Edit', className: 'edit-button' }); //innerText encodes special characters, HTML does not.

  const deleteButton = createDomElement('button', { className: 'delete-button' });
  const deleteButtonImg = createDomElement('img', { src: './remove.svg' });

  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

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

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;

  parentList.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);

  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);

  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit-button');
  const deleteButton = taskListItem.querySelector('button.delete-button');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = onCheckboxChange;
};

const createDomElement = (tag, properties = {}) => {
  return Object.assign(document.createElement(tag), properties);
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
