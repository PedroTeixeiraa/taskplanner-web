import { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { useRequisicoes } from './use-requisicoes';

import './App.css';

export default function App() {
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState('');

  const { salvarTask, buscarTasks, atualizar, remover } = useRequisicoes()

  useEffect(() => {
    const buscar = async () => {
      const tasks = await buscarTasks()
      setTasks(tasks)
    }

    if (!tasks) {
      buscar()
    }
  })

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      const dados = {
        nome: newTask,
        concluida: 0,
      }
      await salvarTask(dados).then(() => {
        setTasks([...tasks, { nome: newTask, concluida: false }]);
        setNewTask('');
      })
    }
  };

  const handleRemoveTask = async (index, id) => {
    await remover(id).then(() => {
      const updatedTasks = [...tasks]
      updatedTasks.splice(index, 1)
      setTasks(updatedTasks)
    })
  }

  const handleToggleTask = async (index, task) => {
    const updatedTasks = [...tasks]
    const dados = {
      nome: task.id,
      concluida: !updatedTasks[index].concluida ? 1 : 0
    }

    await atualizar(dados, task.id).then(() => {
      updatedTasks[index].concluida = !updatedTasks[index].concluida
      setTasks(updatedTasks)
    })
  }

  return (
    <div className="pagina">
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
          {tasks?.map((task, index) => (
            <li key={index} className={`task-item ${task.concluida ? 'completed' : ''}`}>
              <span
                className="task-text"
              >
                {task.nome}
              </span>
              <div className="task-actions">
                {!task.concluida ? (
                  <button
                    className="action-button"
                    onClick={() => handleToggleTask(index, task)}
                  >
                    <FaCheck />
                  </button>
                ) : null}

                <button
                  className="action-button"
                  onClick={() => handleRemoveTask(index, task.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}