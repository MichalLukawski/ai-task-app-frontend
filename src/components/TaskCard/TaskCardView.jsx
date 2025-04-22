import { useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import DueDateProgress from './DueDateProgress';
import DueDateEditor from './DueDateEditor';
import DifficultyStars from './DifficultyStars';
import DifficultySelector from './DifficultySelector';
import CloseWithAiBox from './CloseWithAiBox';
import AiSummaryRejectedModal from './AiSummaryRejectedModal';
import SimilarTasksPopup from './SimilarTasksPopup';
import TaskCardSummary from './TaskCardSummary';

export default function TaskCardView({
  task,
  dueDate,
  difficulty,
  isFocused,
  isEditingDueDate,
  isEditingDifficulty,
  onEditDueDate,
  onEditDifficulty,
  onChangeDueDate,
  onChangeDifficulty,
  onSaveDueDate,
  onSaveDifficulty,
  isClosingWithAI,
  setIsClosingWithAI,
  aiSummary,
  setAiSummary,
  aiSummaryError,
  closeWithAi,
  closeWithoutAI,
  setAiSummaryError,
  isSaving,
  deleteTask,
}) {
  const [showSimilar, setShowSimilar] = useState(false);

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title || 'Untitled Task'}
        </h3>
        <span className="text-xs text-gray-500 italic">
          {formatDate(task.createdAt)}
        </span>
      </div>

      <div className="mt-1 text-sm text-gray-700 leading-relaxed">
        <p className="mb-2 whitespace-pre-line">{task.description}</p>
        {task.status === 'closed' && (
          <TaskCardSummary summary={task.summary} closedAt={task.closedAt} />
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 text-sm items-center">
        {/* Termin */}
        {isFocused && isEditingDueDate ? (
          <DueDateEditor
            value={dueDate}
            onChange={onChangeDueDate}
            onBlur={() => onSaveDueDate(dueDate)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
              }
            }}
          />
        ) : dueDate ? (
          <div onClick={onEditDueDate} className="editable-field cursor-pointer">
            <DueDateProgress createdAt={task.createdAt} dueDate={dueDate} />
          </div>
        ) : (
          isFocused && (
            <button
              onClick={onEditDueDate}
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
            onChange={onChangeDifficulty}
            onBlur={() => onSaveDifficulty(difficulty)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
              }
            }}
          />
        ) : difficulty ? (
          <div onClick={onEditDifficulty} className="editable-field cursor-pointer">
            <DifficultyStars level={difficulty} />
          </div>
        ) : (
          isFocused && (
            <button
              onClick={onEditDifficulty}
              className="text-blue-600 underline text-sm editable-field"
            >
              + Ustaw trudność
            </button>
          )
        )}

        {/* Podobne */}
        {task.similarTasks?.length > 0 && (
          <button
            onClick={() => setShowSimilar(!showSimilar)}
            className="editable-field bg-slate-200 text-slate-800 px-3 py-1 rounded-full"
          >
            🧠 Podobne ({task.similarTasks.length}) {showSimilar ? '▲' : '▼'}
          </button>
        )}

        {/* Zamknij z AI + Usuń lub tylko Usuń */}
        {!task.status || task.status === 'open' ? (
          <>
            <button
              onClick={() => setIsClosingWithAI(true)}
              className="editable-field bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
            >
              🤖 Close with AI
            </button>
            <button
              onClick={() => {
                if (confirm('Czy na pewno chcesz trwale usunąć to zadanie?')) {
                  deleteTask();
                }
              }}
              className="editable-field bg-red-100 text-red-800 px-3 py-1 rounded-full"
            >
              🗑️ Usuń
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              if (confirm('Czy na pewno chcesz usunąć zamknięte zadanie?')) {
                deleteTask();
              }
            }}
            className="editable-field bg-red-100 text-red-800 px-3 py-1 rounded-full"
          >
            🗑️ Usuń
          </button>
        )}
      </div>

      {/* Popup podobnych zadań */}
      {showSimilar && (
        <SimilarTasksPopup
          tasks={task.similarTasks}
          onClose={() => setShowSimilar(false)}
        />
      )}

      {/* Dymek zamykania z AI */}
      {isClosingWithAI && (
        <CloseWithAiBox
          value={aiSummary}
          onChange={setAiSummary}
          onSave={closeWithAi}
          onCancel={() => {
            setAiSummary('');
            setIsClosingWithAI(false);
            setAiSummaryError(null);
          }}
          error={aiSummaryError}
          isSaving={isSaving}
        />
      )}

      {/* Modal AI: „Zapisz mimo to” */}
      {aiSummaryError && (
        <AiSummaryRejectedModal
          onConfirm={() => closeWithoutAI()}
          onCancel={() => setAiSummaryError(null)}
        />
      )}
    </>
  );
}
