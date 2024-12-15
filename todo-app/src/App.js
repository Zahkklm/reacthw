import React, { useState } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTask}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            autoFocus
          />
        </form>
      </header>

      {tasks.length > 0 && (
        <>
          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {filteredTasks.map((task, index) => (
                <li key={index} className={task.completed ? 'completed' : ''}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(index)}
                    />
                    <label>{task.text}</label>
                    <button className="destroy" onClick={() => deleteTask(index)}></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <footer className="footer">
            <span className="todo-count">
              <strong>{tasks.filter((task) => !task.completed).length}</strong> items left
            </span>
            <ul className="filters">
              <li>
                <button
                  className={filter === 'all' ? 'selected' : ''}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={filter === 'active' ? 'selected' : ''}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  className={filter === 'completed' ? 'selected' : ''}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </li>
            </ul>
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export default App;
