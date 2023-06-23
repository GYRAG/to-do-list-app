import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleNewTask = (e) => {
    e.preventDefault();
    const taskName = e.target.elements.task.value;
    if (taskName) {
      const newTask = {
        id: Date.now(),
        name: taskName,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      e.target.elements.task.value = '';
    }
  };

  const handleTaskComplete = (taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);
    setCompletedTasks((prevTasks) => [...prevTasks, completedTask]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteTask = (taskId, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } else {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    }
  };

  const handleMoveToTodo = (taskId) => {
    const movedTask = completedTasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => [...prevTasks, movedTask]);
    setCompletedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div>
      <h1>To-Do List აპლიკაცია</h1>

      <form onSubmit={handleNewTask}>
        <input type="text" name="task" placeholder="Enter a new task" />
        <button type="submit">davalebis damateba</button>
      </form>

      <div>
        <h2>შესასრულებელი</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => handleTaskComplete(task.id)}>დასრულება</button>
              <button onClick={() => handleDeleteTask(task.id, false)}>წაშლა</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>შესრულებული</h2>
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => handleDeleteTask(task.id, true)}>წაშლა</button>
              <button onClick={() => handleMoveToTodo(task.id)}>დასასრულებელი</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
