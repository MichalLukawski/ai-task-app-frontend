//frontend/src/pages/DashboardPage.jsx

import { useEffect, useState } from 'react';
import axios from '../api/axios';
import TaskCard from '../components/TaskCard';
import CreateTaskForm from '../components/CreateTaskForm';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Formularz po lewej */}
        <div className="md:col-span-1">
          <div className="bg-slate-50 p-6 rounded-2xl shadow-lg border">
            <CreateTaskForm onTaskCreated={fetchTasks} />
          </div>
        </div>

        {/* Lista tasków po prawej */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onTaskUpdated={handleTaskUpdated} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
