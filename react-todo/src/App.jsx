cat > src/App.jsx << 'EOF'
import TodoList from "./components/TodoList.jsx";

export default function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}
EOF
