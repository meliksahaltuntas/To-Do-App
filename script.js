// variables
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
// const items = ["item 1", "item 2", "item 3"];
let items;

// load items
loadItems();

// call event listener
eventListeners();
function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem);

  //   delete item
  taskList.addEventListener("click", deleteItem);

  //   delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();

  items.forEach(function (item) {
    createItem(item);
  });
}

// get items from local storage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// set item to local Storage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// delete item from local storage
function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

// create
function createItem(text) {
  //   create li
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  //   create a
  const a = document.createElement("a");
  a.className = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fa-solid fa-x float-end"></i>';

  //   add a to li
  li.appendChild(a);

  //   add li to ul
  taskList.appendChild(li);
}

// add new item
function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
  }

  // create item
  createItem(input.value);

  // save to LS
  setItemToLS(input.value);

  // clear input
  input.value = "";

  e.preventDefault();
}

// delete an item
function deleteItem(e) {
  if (e.target.className === "fa-solid fa-x float-end") {
    e.target.parentElement.parentElement.remove();

    //   delete item from local storage
    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
  }

  e.preventDefault();
}

// delete all items
function deleteAllItems() {
  if (confirm("are you sure?Whole tasks will be deleted.")) {
    taskList.innerHTML = "";
    localStorage.clear();

    e.preventDefault();
  }
}
// // delete all items versiyon 2
// function deleteAllItems (e){
//     // tasklist.innerHTML='';
//     tasklist.childNodes.forEach (function(item){
//       if(item.nodeType===1){
//          item.remove();
//       }
//     });
//     e. preventDefault ();}
