import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }) => {
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const updateTodoText = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const moveTodoUp = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
      setTodos(newTodos);
    }
  };

  const moveTodoDown = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
      setTodos(newTodos);
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
          updateTodoText={updateTodoText}
          moveTodoUp={moveTodoUp}
          moveTodoDown={moveTodoDown}
        />
      ))}
    </div>
  );
};

export default TodoList;
