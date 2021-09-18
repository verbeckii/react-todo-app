import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css'

    //get onDeleted, onToggleImportant, onToggleDone from app.js
    const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    //use spread operator it's equal label={ item.lable }
    const elements = todos.map((item) => {

        // we don't need id
        const { id, ...itemProps } = item;

        return ( 
            <li key={item.id} className="list-group-item">
                <TodoListItem 
                { ...itemProps } 
                onDeleted={() => onDeleted(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleDone={() => onToggleDone(id)}
                
                /> 
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;