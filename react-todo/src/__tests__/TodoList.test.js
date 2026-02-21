import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList.jsx";

describe("TodoList", () => {
  test("renders initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
    expect(screen.getByText("Ship Project")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    fireEvent.change(input, { target: { value: "New Todo Item" } });

    const addButton = screen.getByLabelText("add-todo-button");
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);

    const todo = screen.getByLabelText("todo-Learn React");
    expect(todo).not.toHaveClass("completed");

    fireEvent.click(todo);
    expect(todo).toHaveClass("completed");

    fireEvent.click(todo);
    expect(todo).not.toHaveClass("completed");
  });

  test("deletes a todo", () => {
    render(<TodoList />);

    expect(screen.getByText("Ship Project")).toBeInTheDocument();

    const deleteBtn = screen.getByLabelText("delete-Ship Project");
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Ship Project")).not.toBeInTheDocument();
  });
});
