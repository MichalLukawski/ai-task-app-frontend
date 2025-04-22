
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import TaskCard from '../components/TaskCard/TaskCard';
import CreateTaskForm from '../components/CreateTaskForm';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('open'); // 'open' | 'closed'
  const { get } = useApi();

  const fetchTasks = async () => {
    try {
      const res = await get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch tasks:', err);
      setTasks([]);
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

  const handleTaskDeleted = (taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  const openTasks = tasks.filter((t) => t.status !== 'closed');
  const closedTasks = tasks.filter((t) => t.status === 'closed');

 /* const sortedOpenTasks = [...openTasks].sort((a, b) => {
    const aDue = a.dueDate ? new Date(a.dueDate) : null;
    const bDue = b.dueDate ? new Date(b.dueDate) : null;
    const aCreated = new Date(a.createdAt);
    const bCreated = new Date(b.createdAt);

    if (aDue && bDue) return aDue - bDue;
    if (aDue && !bDue) return aDue > bCreated ? 1 : -1;
    if (!aDue && bDue) return bDue > aCreated ? -1 : 1;
    return bCreated - aCreated;
  });*/

  const sortedOpenTasks = [...openTasks].sort((a, b) => {
    
    const aCreated = new Date(a.createdAt);
    const bCreated = new Date(b.createdAt);

    
    return bCreated - aCreated;
  });

  const sortedClosedTasks = [...closedTasks].sort((a, b) => {
    const aClosed = new Date(a.closedAt || a.updatedAt || a.createdAt);
    const bClosed = new Date(b.closedAt || b.updatedAt || b.createdAt);
    return bClosed - aClosed;
  });

  const renderTasks = (list) =>
    list.length > 0 ? (
      list.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      ))
    ) : (
      <p className="text-gray-500">You don't have any tasks in this category.</p>
    );

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
          {/* Zakładki */}
          <div className="flex gap-6 border-b mb-4">
            <button
              onClick={() => setActiveTab('open')}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'open'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
            >
              Your Tasks ({sortedOpenTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'closed'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
            >
              Closed Tasks ({sortedClosedTasks.length})
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'open'
              ? renderTasks(sortedOpenTasks)
              : renderTasks(sortedClosedTasks)}
          </div>
        </div>
      </div>
    </div>
  );
}
