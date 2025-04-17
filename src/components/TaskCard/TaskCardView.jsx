// frontend/src/components/TaskCard/TaskCardView.jsx

import { formatDate } from "../../utils/dateUtils";
import DueDateProgress from "./DueDateProgress";
import DueDateEditor from "./DueDateEditor";
import DifficultyStars from "./DifficultyStars";
import DifficultySelector from "./DifficultySelector";
import { useRef, useEffect } from "react";


export default function TaskCardView({
  task,
  dueDate,
  difficulty,
  isFocused,

  isEditingDueDate,
  setIsEditingDueDate,
  setDueDate,
  saveDueDate,

  isEditingDifficulty,
  setIsEditingDifficulty,
  setDifficulty,
  saveDifficulty,
}) {
  const isFocusedRef = useRef(isFocused);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const handleDateKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleDifficultyKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title || "Untitled Task"}
        </h3>
        <span className="text-xs text-gray-500 italic">
          {formatDate(task.createdAt)}
        </span>
      </div>

      <p className="mt-1 text-sm text-gray-700 leading-relaxed">
        {task.summary || task.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4 text-sm items-center">
        {/* Termin */}
        {isFocused && isEditingDueDate ? (
          <DueDateEditor
            value={dueDate}
            onChange={setDueDate}
            onBlur={() => saveDueDate(dueDate)}
            onKeyDown={handleDateKeyDown}
          />
        ) : dueDate ? (
          <div
            onClick={() => isFocusedRef.current && setIsEditingDueDate(true)}
            className="editable-field cursor-pointer"
          >
            <DueDateProgress createdAt={task.createdAt} dueDate={dueDate} />
          </div>
        ) : (
          isFocused && (
            <button
              onClick={() => setIsEditingDueDate(true)}
              className="text-blue-600 underline text-sm editable-field"
            >
              + Ustaw termin
            </button>
          )
        )}

        {/* Trudność */}
        {isFocused && isEditingDifficulty ? (
          <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
            onBlur={() => saveDifficulty(difficulty)}
            onKeyDown={handleDifficultyKeyDown}
          />
        ) : difficulty ? (
          <div
            onClick={() => isFocusedRef.current && setIsEditingDifficulty(true)}
            className="editable-field cursor-pointer"
          >
            <DifficultyStars level={difficulty} />
          </div>
        ) : (
          isFocused && (
            <button
              onClick={() => setIsEditingDifficulty(true)}
              className="text-blue-600 underline text-sm editable-field"
            >
              + Ustaw trudność
            </button>
          )
        )}

        {/* Przycisk podobnych */}
        {task.similarTasks?.length > 0 && (
          <button className="editable-field bg-slate-200 text-slate-800 px-3 py-1 rounded-full">
            🧠 Podobne ({task.similarTasks.length})
          </button>
        )}
      </div>
    </>
  );
}