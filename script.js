const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  saveAndRender();
});

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    if (filter === "completed" && !todo.completed) return;
    if (filter === "pending" && todo.completed) return;

    const li = document.createElement("li");
    li.className = "bg-white/10 p-3 rounded flex justify-between items-center";
    li.innerHTML = `
      <span class="${todo.completed ? 'line-through text-gray-300' : ''}">${todo.text}</span>
      <div class="space-x-2">
        <button onclick="toggleComplete(${i})" title="Toggle Complete"><i class="fa-solid fa-check text-green-400 hover:text-green-500"></i></button>
        <button onclick="editTodo(${i})" title="Edit"><i class="fa-solid fa-pen text-yellow-400 hover:text-yellow-500"></i></button>
        <button onclick="deleteTodo(${i})" title="Delete"><i class="fa-solid fa-trash text-red-400 hover:text-red-500"></i></button>
      </div>
    `;
    list.appendChild(li);
  });
}

function toggleComplete(i) {
  todos[i].completed = !todos[i].completed;
  saveAndRender();
}

function editTodo(i) {
  const newText = prompt("Edit task:", todos[i].text);
  if (newText) {
    todos[i].text = newText.trim();
    saveAndRender();
  }
}

function deleteTodo(i) {
  todos.splice(i, 1);
  saveAndRender();
}

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("bg-blue-600", "text-white"));
    btn.classList.add("bg-blue-600", "text-white");
    filter = btn.dataset.filter;
    render();
  })
);

render();
