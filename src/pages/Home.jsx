import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import { getTasks, saveTasks } from '../utils/localStorageHelper';


function Home() {
  const [tasks, setTasks] = useState(getTasks());
  const [editingTask, setEditingTask] = useState(null);

  

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };


  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <TaskForm
            addTask={addTask}
            editingTask={editingTask}
            updateTask={updateTask}
          />
        </div>

        <div className="col-lg-8">
          <TaskTable
            tasks={tasks}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;