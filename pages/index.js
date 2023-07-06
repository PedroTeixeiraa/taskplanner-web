import { useState } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Task Planner</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>
          <FaPlus />
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span
              className="task-text"
            >
              {task.text}
            </span>
            <div className="task-actions">
              <button
                className="action-button"
                onClick={() => handleToggleTask(index)}
              >
                {task.completed ? <FaCheck /> : <FaCheck className="hidden" />}
              </button>
              <button
                className="action-button"
                onClick={() => handleRemoveTask(index)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
          .pagina {
            display: flex;
            flex-direction: column;
            align-items: center; 
            height: 100vh;
            width: 100vw;
            max-width: 400px;
          }
          .container {
            border: 2px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin: 16px;
            max-width: 400px;
          }

          .add-task {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
          }

          .add-task input {
            margin-right: 8px;
            padding: 4px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            width: 200px;
          }

          .add-task button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            border: none;
            background-color: #0070f3;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .add-task button:hover {
            background-color: #0053b3;
          }

          .task-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          .task-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            padding: 8px 0;
              }

          .task-item.completed {
            text-decoration: line-through;
            color: #aaa;
          }

          .task-text {
            flex: 1;
            margin-right: 8px;
            font-size: 14px;
            cursor: pointer;
          }

          .task-actions {
            display: flex;
            gap: 8px;
          }

          .action-button {
            padding: 4px;
            border: none;
            background-color: #ff0000;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .action-button:hover {
            background-color: #cc0000;
          }

          .hidden {
            display: none;
          }
      `}</style>
    </div>
  );
}