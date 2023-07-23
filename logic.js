var id=0;

let array = JSON.parse(localStorage.getItem('array')) || [];
function render(array){
    var tasks=document.getElementById('tasks');
    tasks.innerHTML="";
    array.forEach(function(item){
        newElement(item);
    })
}

var newBtn=document.getElementById('add');
newBtn.addEventListener('click', function(){
    addFunction();
})

function addFunction(){
    var inputValue = document.getElementById("new-task").value;
    if(inputValue==='')
    {
      alert("Add Title");
      return;
    }
    document.getElementById("new-task").value = "";
    id++;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;
    const category = document.getElementById('category').value;
    const subtaskInput = document.getElementById('subtaskInput').value.trim();
    const tagsInput = document.getElementById('tagsInput').value;
    const res = tagsInput.split(',').map((tag) => tag.trim()).filter((tag) => tag.length !== 0);

    /*var task={};
    task['id']=id;
    task['title']=inputValue;
    //task['priority']=prior;*/
    const task = {
      id: id,
      title: inputValue,
      priority: priority,
      dueDate: dueDate,
      category: category,
      tags: res,
  };
  if (subtaskInput) {
    if (!task.subtasks) {
        task.subtasks = [];
    }
    task.subtasks.push(subtaskInput);
}

// Add the new todo to the beginning of the todos array
array.unshift(task);

// Re-render the todo list with the new task on top
render(array);

// Clear input fields after adding the task
clearInputFields();
}
    localStorage.setItem('array', JSON.stringify(array));

function deleteFunction(id){
    var idx=0;
    array.forEach(function(item){
        if(item.id==id){
            array.splice(idx,1);
            console.log('del');
        }
        idx+=1;
    })
    localStorage.setItem('array', JSON.stringify(array));
    render(array);
}
/*function deleteFunction(id){
  var idx=0;
  array.forEach(function(item){
      if(item.id==id){
          array.splice(idx,1);
          console.log('del');
      }
      idx+=1;
  })
  localStorage.setItem('array', JSON.stringify(array));
  render(array);
}*/

function newElement(item) {
    var tasks=document.getElementById('tasks');
    var li = document.createElement("li");
    var t = document.createTextNode(item.title);
    //const prior=document.createTextNode(item.priority);
    li.appendChild(t);
  
    if(item.priority!='')
    {
    var prr3 = document.createElement("button");
    var tpr3 = document.createTextNode(item.priority);
    prr3.className=item.priority;
    prr3.appendChild(tpr3);
    li.appendChild(prr3);
    }
    
    if(item.category!='')
    {
    var cat = document.createElement("button");
    var tcat = document.createTextNode(item.category);
    cat.className=item.category;
    cat.appendChild(tcat);
    li.appendChild(cat);
    }

    /*tags.forEach(tag => {
      const tagSpan = document.createElement("button");
      var tt = document.createTextNode("tag");
      //tagSpan.textContent = tag;
      tagSpan.appendChild(tt);
      li.appendChild(tagSpan);
    });*/
    if(item.dueDate!=''){
    var ddt = document.createElement("button");
    var tddt = document.createTextNode(item.dueDate);
    ddt.className=item.dueDate;
    ddt.appendChild(tddt);
    li.appendChild(ddt);
    }
    
    /*var sub = document.createElement("button");
    var tsub = document.createTextNode("Add a Subtask");
    sub.className="add_subtask";
    sub.appendChild(tsub);
    li.appendChild(sub);
    sub.setAttribute("onclick",addSubtask(sub));*/
    if(item.tags!='')
    {
     var i;
     var n=item.tags.length;
    for(i=0;i<n;i++)
    {
   var att = document.createElement("button");
    var tt = document.createTextNode(item.tags[i]);
    att.className=item.tags[i];
    att.appendChild(tt);
    li.appendChild(att);
    }
  }

    var btn1 = document.createElement("button");
    var txt1 = document.createTextNode("edit");
    btn1.className="edit";
    btn1.appendChild(txt1);
    li.appendChild(btn1);

    var btn = document.createElement("button");
    var txt = document.createTextNode("delete");
    btn.className = "close";
    btn.id=item.id;
    btn.appendChild(txt);
    li.appendChild(btn);

    btn1.onclick=function(){
        //editFunction(btn1.getAttribute('id'));
        document.getElementById("new-task").value=item.title;
        document.getElementById('priority').value=item.priority;
        document.getElementById('dueDate').value=item.dueDate;
        document.getElementById('category').value=item.category;
        deleteFunction(btn.getAttribute('id'));
        
    }
    btn.onclick=function(){
        deleteFunction(btn.getAttribute('id'));
    }
    tasks.appendChild(li);
    
}
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

/*function savearray() {
  localStorage.setItem('array', JSON.stringify(array));
}*/
function renderCategories() {
  const categorySelect = document.getElementById('category');
  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Others'];

  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
  });
}

// Call the function to render categories on page load
renderCategories();

function renderCategoryfilter() {
  const categorySelect = document.getElementById('categoryFilter');
  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Others'];

  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
  });
}
renderCategoryfilter()

// Function to filter tasks
function filterTasks() {
  const priorityFilter = document.getElementById('priorityy').value;
  const dueDateFilter = document.getElementById('dueDateFilter').value;
  const categoryFilter = document.getElementById('categoryFilter').value;
  let farr=[];
  var i;
  var n=array.length
  for(i=0;i<n;i++)
  {
    if((!priorityFilter || array[i].priority === priorityFilter)&&
    (!dueDateFilter || array[i].dueDate === dueDateFilter) &&
    (!categoryFilter || array[i].category === categoryFilter))
    farr.push(array[i]);
  }
  render(farr);
}

// Function to sort tasks

const duedatesort= (a,b) => new Date(a.dueDate) - new Date(b.dueDate);
const priorityOrder = { low: 1, medium: 2, high: 3 };
const prioritysort =(a,b) => priorityOrder[a.priority] - priorityOrder[b.priority];

function sortTasks(sortBy) {
  const sarr = [...array];

  if (sortBy === 'dueDate') {
    sarr.sort(duedatesort)
     // sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortBy === 'priority') {
     //const priorityOrder = { low: 1, medium: 2, high: 3 };
      sarr.sort(prioritysort)
      //sortedTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  }
  render(sarr);
}


// Function to search for tasks
function searchTasks() {
  const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
  let sarr=[];
  var i;
  var n=array.length
  for(i=0;i<n;i++)
  {
    if(array[i].title.toLowerCase().includes(searchTerm) ||
    array[i].tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    sarr.push(array[i]);
  }
  render(sarr);
}
/*
// Function to render subtasks
function renderSubtasks(subtasks, parentIndex) {
  const parentTodo = document.querySelectorAll('li')[parentIndex];
  const subtaskList = parentTodo.querySelector('.subtasks');
  subtaskList.innerHTML = '';

  subtasks.forEach((subtask, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <input type="checkbox" onchange="markSubtaskDone(${parentIndex}, ${index})" ${subtask.done ? 'checked' : ''}>
          <span>${subtask.text}</span>
          <button onclick="deleteSubtask(${parentIndex}, ${index})">Delete</button>
      `;
      subtaskList.appendChild(li);
  });
}

// Function to add a subtask
function addSubtask(btn) {
  const parentIndex = Array.from(document.querySelectorAll('.add-subtask-btn')).indexOf(btn);
  const subtaskInput = btn.previousElementSibling;
  const subtaskText = subtaskInput.value.trim();

  if (subtaskText !== '') {
      if (!array[parentIndex].subtasks) {
          array[parentIndex].subtasks = [];
      }
      array[parentIndex].subtasks.push({ text: subtaskText, done: false });
      localStorage.setItem('array', JSON.stringify(array));
      renderSubtasks(array[parentIndex].subtasks, parentIndex);
      subtaskInput.value = '';
  }
}

// Function to mark subtask as done
function markSubtaskDone(parentIndex, subtaskIndex) {
  array[parentIndex].subtasks[subtaskIndex].done = !array[parentIndex].subtasks[subtaskIndex].done;
  localStorage.setItem('array', JSON.stringify(array));
  renderSubtasks(array[parentIndex].subtasks, parentIndex);
}

// Function to delete a subtask
function deleteSubtask(parentIndex, subtaskIndex) {
  array[parentIndex].subtasks.splice(subtaskIndex, 1);
  localStorage.setItem('array', JSON.stringify(array));
  renderSubtasks(array[parentIndex].subtasks, parentIndex);
}*/
/*let dragStartIndex;

// Function to handle drag start event
function dragStart(event) {
    dragStartIndex = event.target.closest('li').getAttribute('data-index');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', dragStartIndex);
}

// Function to handle drag over event
function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

// Function to handle drop event
function drop(event) {
    const dropIndex = event.target.closest('li').getAttribute('data-index');
    event.preventDefault();

    if (dragStartIndex !== dropIndex) {
        const index1 = parseInt(dragStartIndex);
        const index2 = parseInt(dropIndex);
        [array[index1], array[index2]] = [array[index2], array[index1]];
        localStorage.setItem('array', JSON.stringify(array));
        renderTodos();
    }
}*/

function Backlogs() {
  //const today=new Date();
  var arr=[];
  var i;
  var n=array.length;
  for(i=0;i<n;i++)
  {
    if(array[i].dueDate==='')
    continue;
    if(new Date(array[i].dueDate)-new Date()<0)
    {
      arr.push(array[i]);
    }
  }
  render(arr);
}

function checkReminders() {
  const currentTime = new Date().getTime();

  array.forEach(item => {
      const dueDate = new Date(item.dueDate).getTime();
      if ( dueDate && dueDate <= currentTime) {
          alert(`Reminder: ${item.title} is due!`);
      }
  });
}

// Check for reminders every 5 seconds (this is just a mock, for real reminders, use server-side code)
setInterval(checkReminders, 20000);