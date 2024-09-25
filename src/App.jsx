import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage or initialize an empty array
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const getRandomColor = () => {
    const colors = ["#FFEBEE", "#E3F2FD", "#F3E5F5", "#FFF3E0", "#E8F5E9", "#E0F7FA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: newTodo, completed: false, color: getRandomColor() },
    ]);
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <h2 className="title">Todo List</h2>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} setTodos={updateTodo} removeTodo={removeTodo} />
    </div>
  );
}

export default App;
