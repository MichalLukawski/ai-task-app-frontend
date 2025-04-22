// frontend/src/components/TaskCard/TaskCard.jsx

import React from 'react';
import { useTaskCardState } from '../../hooks/useTaskCardState';
import { useTaskCardInteraction } from '../../hooks/useTaskCardInteraction';
import TaskCardView from './TaskCardView';


const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const {
    cardRef,
    isFocused,
    setIsFocused,

    isEditingDueDate,
    setIsEditingDueDate,
    dueDate,
    setDueDate,
    saveDueDate,

    isEditingDifficulty,
    setIsEditingDifficulty,
    difficulty,
    setDifficulty,
    saveDifficulty,

    isClosingWithAI,
    setIsClosingWithAI,
    aiSummary,
    setAiSummary,
    aiSummaryError,
    setAiSummaryError,
    closeWithAi,
    closeWithoutAI,
    isSaving,

deleteTask,

    showSaved,
  } = useTaskCardState({ task, onTaskUpdated, onTaskDeleted });

  const { handleCardClick } = useTaskCardInteraction({
    cardRef,
    isFocused,
    setIsFocused,
    isEditingDueDate,
    setIsEditingDueDate,
    dueDate,
    saveDueDate,
    isEditingDifficulty,
    setIsEditingDifficulty,
    difficulty,
    saveDifficulty,
  });

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      className={`task-card transition-all duration-200 rounded-2xl border border-slate-200 bg-white p-4 ${
        isFocused ? 'scale-[1.02] shadow-xl' : 'scale-100'
      }`}
      onClick={handleCardClick}
    >
      <TaskCardView
        task={task}
        dueDate={dueDate}
        difficulty={difficulty}
        isFocused={isFocused}
        isEditingDueDate={isEditingDueDate}
        isEditingDifficulty={isEditingDifficulty}
        onEditDueDate={() => setIsEditingDueDate(true)}
        onEditDifficulty={() => setIsEditingDifficulty(true)}
        onChangeDueDate={setDueDate}
        onChangeDifficulty={setDifficulty}
        onSaveDueDate={saveDueDate}
        onSaveDifficulty={saveDifficulty}
        isClosingWithAI={isClosingWithAI}
        setIsClosingWithAI={setIsClosingWithAI}
        aiSummary={aiSummary}
        setAiSummary={setAiSummary}
        aiSummaryError={aiSummaryError}
        setAiSummaryError={setAiSummaryError}
        closeWithAi={closeWithAi}
        closeWithoutAI={closeWithoutAI}
        isSaving={isSaving}
        deleteTask={deleteTask}
      />

      {showSaved && (
        <div className="text-green-500 text-xs mt-1 animate-fade-in-out">✔ Zapisano</div>
      )}
    </div>
  );
};

export default TaskCard;
