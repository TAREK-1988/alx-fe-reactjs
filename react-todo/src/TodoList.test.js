cat > src/TodoList.test.js << 'EOF'
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./components/TodoList.jsx";

describe("TodoList", () => {
  test("renders initial demo todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Ship the feature")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByLabelText(/new todo/i);
    fireEvent.change(input, { target: { value: "New Task" } });

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("toggles a todo completion on click", () => {
    render(<TodoList />);

    const todoButton = screen.getByRole("button", { name: "Learn React" });
    expect(todoButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(todoButton);
    expect(todoButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(todoButton);
    expect(todoButton).toHaveAttribute("aria-pressed", "false");
  });

  test("deletes a todo", () => {
    render(<TodoList />);

    expect(screen.getByText("Write tests")).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button", { name: /delete write tests/i });
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Write tests")).not.toBeInTheDocument();
  });
});
EOF
