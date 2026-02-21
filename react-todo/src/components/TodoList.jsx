import { useMemo, useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";

const demoTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write tests", completed: false },
  { id: 3, text: "Ship the feature", completed: true }
];

export default function TodoList() {
  const [todos, setTodos] = useState(demoTodos);

  const nextId = useMemo(() => {
    return () => Date.now();
  }, []);

  const addTodo = (text) => {
    const todo = { id: nextId(), text, completed: false };
    setTodos((prev) => [todo, ...prev]);
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
      <ul aria-label="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <button
              type="button"
              onClick={() => toggleTodo(todo.id)}
              aria-pressed={todo.completed}
            >
              {todo.text}
            </button>
            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              aria-label={`delete ${todo.text}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
