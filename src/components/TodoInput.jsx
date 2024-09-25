import React, { useState } from "react";

const TodoInput = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="todo-input"
        placeholder="Enter TODO"
        autoFocus
      />
      <button onClick={handleAddTodo} className="input-btn">
        Add
      </button>
    </div>
  );
};

export default TodoInput;
