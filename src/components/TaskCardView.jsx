// frontend/src/components/TaskCardView.jsx

import { formatDate } from '../utils/dateUtils';
import DueDateProgress from './DueDateProgress';
import DifficultyStars from './DifficultyStars';

export default function TaskCardView({ task }) {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title || 'Untitled Task'}</h3>
        <span className="text-xs text-gray-500 italic">{formatDate(task.createdAt)}</span>
      </div>

      <p className="mt-1 text-sm text-gray-700 leading-relaxed">
        {task.summary || task.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4 text-sm items-center">
        {task.dueDate && (
          <DueDateProgress createdAt={task.createdAt} dueDate={task.dueDate} />
        )}

        {task.difficulty && (
          <DifficultyStars level={task.difficulty} />
        )}

        {task.similarTasks?.length > 0 && (
          <button
            className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full"
            title="Zobacz podobne zadania"
          >
            🧠 Podobne ({task.similarTasks.length})
          </button>
        )}
      </div>
    </>
  );
}