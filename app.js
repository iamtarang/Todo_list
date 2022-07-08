//Selectors
const addform = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

var todoList = [];

var existingList = localStorage.getItem("localItem");

//if existingList is not null then set data
if (existingList) {
  todoList = JSON.parse(localStorage.getItem("localItem"));
}

const updateDataToLocalStorage = () => {
  localStorage.setItem("localItem", JSON.stringify(todoList));
};

//Displaying ToDos
const generateTemplate = (todo) => {
  list.innerHTML = "";
  todoList.forEach((data, index) => {
    const html = `
        <li class="list-group-item d-flex text-light justify-content-between align-items-center" index="${index}">
            <span>${data}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
        `;

    list.innerHTML += html;
  });
};

//Adding ToDos
addform.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addform.add.value.trim();
  if (todo.length) {
    todoList.push(todo);
    updateDataToLocalStorage();
    addform.reset();

    generateTemplate(todo);
  }
});

//Deleting ToDos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure to delete the to-do?")) {
      const index = e.target.parentElement;

      todoList.splice(index, 1);
      e.target.parentElement.remove();
      updateDataToLocalStorage();
      generateTemplate();
    }
  }
});

//Searching through ToDos
const filterTools = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

//key-up event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTools(term);
});

generateTemplate();
