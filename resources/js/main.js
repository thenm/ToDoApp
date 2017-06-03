// console.log('HI');
var data = (localStorage.getItem('todoList'))? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};
savedList();

function storeInLS() {
  console.log(data);
  localStorage.setItem('todoList', JSON.stringify(data));
}

document.getElementById('add-btn').addEventListener('click', function() {
  var textInput = document.getElementById('todo-inp').value;
  if(textInput) addItemToDo(textInput);
  document.getElementById('todo-inp').value ='';
  data.todo.push(textInput);
  storeInLS();
});

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var todoValue = item.innerText;
  if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(todoValue), 1);
  }
  else{
    data.completed.splice(data.completed.indexOf(todoValue), 1);
  }
  storeInLS();
  parent.removeChild(item);
}

function doneItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var todoValue = item.innerText;
  if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(todoValue), 1);
    data.completed.push(todoValue);
  }
  else{
    data.completed.splice(data.completed.indexOf(todoValue), 1);
    data.todo.push(todoValue);
  }
  storeInLS();
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

function addItemToDo(textInput, completed) {

  const doneButton ='<i class="fa fa-check-square fa-2x" aria-hidden="true"></i>';
  const delButton ='<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>';


  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

  var item = document.createElement('li');
  item.innerText = textInput;

  var controls = document.createElement('div')
  controls.classList.add('controls');

  var remove = document.createElement('button');
  remove.innerHTML = delButton;

  remove.addEventListener('click', removeItem);

  var done = document.createElement('button');
  done.innerHTML = doneButton;

  done.addEventListener('click', doneItem);

  controls.appendChild(remove);
  controls.appendChild(done);
  item.appendChild(controls);
  list.insertBefore(item, list.childNodes[0]);
}

function savedList() {
  if(!data.todo.length && !data.completed.length) return

  for(var i= 0; i<data.todo.length; i++){
    var textInput = data.todo[i];
    addItemToDo(textInput);
  }

  for(var j= 0; j<data.completed.length; j++){
    var textInput = data.completed[j];
    addItemToDo(textInput, true );
  }
}
