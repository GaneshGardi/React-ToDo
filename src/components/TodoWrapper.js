import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(''); // State to manage error message

    const addTodo = todo => {
        if (todo.trim() === '') {
            setError('Enter task before adding'); // Set error message
            return;
        }
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
        setError(''); // Clear error message after successful addition
    };

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    };

    return (
        <div className='todo-wrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {error && <p className='error-message'>{error}</p>} {/* Conditionally render error message with custom CSS class */}
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};

export default TodoWrapper;
