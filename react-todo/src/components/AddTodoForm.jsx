cat > src/components/AddTodoForm.jsx << 'EOF'
import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form">
      <label htmlFor="new-todo">New todo</label>
      <input
        id="new-todo"
        name="new-todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
EOF
