import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form">
      <div className="row">
        <div style={{ flex: 1, minWidth: 240 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="todo-input"
            placeholder="Add a new todo..."
          />
        </div>
        <button type="submit" aria-label="add-todo-button">
          Add
        </button>
      </div>
    </form>
  );
}
