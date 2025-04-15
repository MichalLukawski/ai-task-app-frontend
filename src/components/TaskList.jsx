//forntend/src/components/TaskList.jsx

import TaskCard from './TaskCard';

export default function TaskList({ tasks }) {
  if (!tasks?.length) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
