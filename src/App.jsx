import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const getRandomColor = () => {
    const colors = ["#FFEBEE", "#E3F2FD", "#F3E5F5", "#FFF3E0", "#E8F5E9", "#E0F7FA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addTodo = (newTodo) => {
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false, color: getRandomColor() },
    ]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
