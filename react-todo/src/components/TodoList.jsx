import { useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";

const initialTodos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Write Tests", completed: true },
  { id: 3, title: "Ship Project", completed: false }
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />

      <div className="list" aria-label="todo-list">
        {todos.map((t) => (
          <div key={t.id} className="todoItem">
            <span
              className={`todoTitle ${t.completed ? "completed" : ""}`}
              onClick={() => toggleTodo(t.id)}
              role="button"
              tabIndex={0}
              aria-label={`todo-${t.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleTodo(t.id);
              }}
            >
              {t.title}
            </span>

            <button
              className="danger"
              onClick={() => deleteTodo(t.id)}
              aria-label={`delete-${t.title}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
