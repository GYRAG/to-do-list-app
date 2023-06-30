import React, { useState, useCallback } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleNewTask = useCallback((e) => {
    e.preventDefault();
    const taskName = e.target.elements.task.value.trim();
    if (taskName) {
      const newTask = {
        id: Date.now(),
        name: taskName,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      e.target.reset();
    }
  }, []);

  const handleTaskComplete = useCallback((taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);
    setCompletedTasks((prevTasks) => [...prevTasks, completedTask]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, [tasks]);

  const handleDeleteTask = useCallback((taskId, isCompleted) => {
    const updatedTasks = isCompleted
      ? completedTasks.filter((task) => task.id !== taskId)
      : tasks.filter((task) => task.id !== taskId);

    if (isCompleted) {
      setCompletedTasks(updatedTasks);
    } else {
      setTasks(updatedTasks);
    }
  }, [completedTasks, tasks]);

  return (
    <div>
      <h1>To-Do List აპლიკაცია</h1>

      <form onSubmit={handleNewTask}>
        <input type="text" name="task" placeholder="Enter a new task" />
        <button type="submit">დაამატე დავალებები</button>
      </form>

      <div>
        <h2>შესასრულებელი დავალება</h2>
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={handleTaskComplete}
              onDelete={handleDeleteTask}
              isCompleted={false}
            />
          ))}
        </ul>
      </div>

      <div>
        <h2>შესრულებული დავალებები</h2>
        <ul>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              isCompleted={true}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TaskItem({ task, onComplete, onDelete, isCompleted }) {
  const handleComplete = useCallback(() => {
    onComplete(task.id);
  }, [onComplete, task.id]);

  const handleDelete = useCallback(() => {
    onDelete(task.id, isCompleted);
  }, [onDelete, task.id, isCompleted]);

  return (
    <li>
      {task.name}
      <button onClick={handleComplete}>შესასრულებლებში გადატანა</button>
      <button onClick={handleDelete}>წაშლა</button>
    </li>
  );
}

export default TodoList;
