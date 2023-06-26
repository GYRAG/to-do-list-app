import React, { useState, useReducer, useEffect } from 'react';
import './App.css';

const initialState = {
  tasks: [],
  completedTasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), name: action.payload },
        ],
      };
    case 'COMPLETE_TASK':
      const taskToComplete = state.tasks.find(
        (task) => task.id === action.payload
      );
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        completedTasks: [...state.completedTasks, taskToComplete],
      };
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        completedTasks: state.completedTasks.filter(
          (task) => task.id !== action.payload
        ),
      };
    case 'MOVE_TO_TODO':
      const taskToMove = state.completedTasks.find(
        (task) => task.id === action.payload
      );
      return {
        tasks: [...state.tasks, taskToMove],
        completedTasks: state.completedTasks.filter(
          (task) => task.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNewTask = (e) => {
    e.preventDefault();
    const taskName = e.target.elements.task.value;
    if (taskName) {
      dispatch({ type: 'ADD_TASK', payload: taskName });
      e.target.elements.task.value = '';
    }
  };

  const handleTaskComplete = (taskId) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId });
  };

  const handleDeleteTask = (taskId, isCompleted) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const handleMoveToTodo = (taskId) => {
    dispatch({ type: 'MOVE_TO_TODO', payload: taskId });
  };

  useEffect(() => {
    console.log('Component did mount');

    return () => {
      console.log('Component will unmount');
    };
  }, []);

  useEffect(() => {
    console.log('Tasks changed:', state.tasks);
  }, [state.tasks]);

  useEffect(() => {
    console.log('Completed tasks changed:', state.completedTasks);
  }, [state.completedTasks]);

  return (
    <div>
      <h1>To-Do List Application</h1>

      <form onSubmit={handleNewTask}>
        <input type="text" name="task" placeholder="Enter a new task" />
        <button type="submit">Add Task</button>
      </form>

      <div>
        <h2>Tasks to Complete</h2>
        <ul>
          {state.tasks.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => handleTaskComplete(task.id)}>
                Mark as Complete
              </button>
              <button onClick={() => handleDeleteTask(task.id, false)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Completed Tasks</h2>
        <ul>
          {state.completedTasks.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => handleDeleteTask(task.id, true)}>
                Delete
              </button>
              <button onClick={() => handleMoveToTodo(task.id)}>
                Move to Tasks
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
