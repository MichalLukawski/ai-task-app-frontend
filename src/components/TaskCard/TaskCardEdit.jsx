// frontend/src/components/TaskCard/TaskCardEdit.jsx

import DifficultySelector from './DifficultySelector';
import DueDateEditor from './DueDateEditor';

export default function TaskCardEdit({ task, difficulty, dueDate, setDifficulty, setDueDate }) {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title || 'Untitled Task'}</h3>
        <span className="text-xs text-gray-400 italic">(Edytujesz)</span>
      </div>

      <p className="mt-1 text-sm text-gray-700 leading-relaxed">
        {task.summary || task.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4 text-sm items-center">
        <div className="editable-field">
          <DueDateEditor value={dueDate} onChange={setDueDate} />
        </div>
        <div className="editable-field">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
        </div>
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