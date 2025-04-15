//frontend/src/components/TaskCard.jsx

import { useEffect } from 'react';
import useTaskCardState from '../hooks/useTaskCardState';
import TaskCardEdit from './TaskCardEdit';
import TaskCardView from './TaskCardView';

export default function TaskCard({ task, onTaskUpdated }) {
  const {
    isEditing,
    setIsEditing,
    difficulty,
    dueDate,
    showSaved,
    cardRef,
    handleClickOutside,
    handleKeyDown,
    handleCardClick,
    setDifficulty,
    setDueDate,
  } = useTaskCardState(task, onTaskUpdated);

  // Obsługa kliknięcia poza kartą
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, difficulty, dueDate]);

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`rounded-2xl border bg-gray-50 p-5 shadow-sm transition cursor-pointer relative z-10 outline-none ${
        isEditing ? 'z-20 scale-105 shadow-lg ring-2 ring-blue-200' : 'hover:shadow-md'
      }`}
    >
      {isEditing ? (
        <TaskCardEdit
          task={task}
          difficulty={difficulty}
          dueDate={dueDate}
          setDifficulty={setDifficulty}
          setDueDate={setDueDate}
        />
      ) : (
        <TaskCardView task={task} />
      )}

      {showSaved && (
        <span className="ml-auto text-green-600 text-xs">✔ Zapisano</span>
      )}
    </div>
  );
}
