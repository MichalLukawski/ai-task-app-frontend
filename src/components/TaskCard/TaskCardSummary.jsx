// frontend/src/components/TaskCard/TaskCardSummary.jsx

import { formatDate } from '../../utils/dateUtils';

export default function TaskCardSummary({ summary, closedAt }) {
  if (!summary) return null;

  return (
    <div className="bg-slate-50 p-3 rounded-md border text-slate-700">
      <p className="font-medium text-slate-800 mb-1">Podsumowanie:</p>
      <p className="whitespace-pre-line mb-1">{summary}</p>
      {closedAt && (
        <div className="text-xs text-gray-500 italic text-right">
          Zamknięto: {formatDate(closedAt, true)}
        </div>
      )}
    </div>
  );
}
