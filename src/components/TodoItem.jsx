import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faTrashAlt, faEdit, faSave, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ todo, removeTodo, toggleComplete, updateTodoText, moveTodoUp, moveTodoDown }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      updateTodoText(todo.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          className="input-element"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="input-element"
          value={todo.text}
          disabled
        />
      )}
      <div className="action-btns">
        {/* Блок для кнопок управления */}
        <div className="controls">
          <button onClick={() => moveTodoUp(todo.id)} className="move-btn">
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <button onClick={() => moveTodoDown(todo.id)} className="move-btn">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button onClick={handleEdit} className="edit-btn">
            <FontAwesomeIcon icon={isEditing ? faSave : faEdit} />
          </button>
          <button onClick={() => toggleComplete(todo.id)} className="complete-btn">
            <FontAwesomeIcon icon={todo.completed ? faCheckCircle : faCircle} />
          </button>
          <button onClick={() => removeTodo(todo.id)} className="remove-btn">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
