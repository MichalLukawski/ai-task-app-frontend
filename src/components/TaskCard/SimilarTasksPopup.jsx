// frontend/src/components/TaskCard/SimilarTasksPopup.jsx

import React from 'react';
import { formatDate } from '../../utils/dateUtils';

export default function SimilarTasksPopup({ tasks, onClose }) {
  if (!tasks?.length) return null;

  return (
    <div className="mt-3 border rounded p-4 bg-white shadow-md w-full">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">Podobne zadania</p>
        <button
          className="text-xs text-slate-500 hover:text-black"
          onClick={onClose}
        >
          ✕ zamknij
        </button>
      </div>

      <ul className="space-y-4 max-h-64 overflow-auto text-sm text-slate-700">
      {tasks.map((t) => (
  <li key={t._id} className="border-b border-slate-200 pb-3">
    <div className="flex justify-between items-start mb-1">
      <p className="font-semibold text-slate-900">{t.title || "Bez tytułu"}</p>
      <span className="text-xs text-gray-500 italic whitespace-nowrap">
        Utworzono: {formatDate(t.createdAt, true)}
      </span>
    </div>

    {t.description && (
      <p className="text-xs italic text-slate-500 mb-2">{t.description}</p>
    )}

    {t.summary ? (
      <div>
        <p className="font-medium text-slate-800 mb-1">Podsumowanie:</p>
        <p className="text-xs whitespace-pre-line text-slate-600">{t.summary}</p>
      </div>
    ) : (
      <p className="text-xs text-slate-400 italic">Brak podsumowania</p>
    )}

    {t.closedAt && (
      <p className="text-xs text-gray-500 italic text-right mt-2">
        Zamknięto: {formatDate(t.closedAt, true)}
      </p>
    )}
  </li>
))}

</ul>

    </div>
  );
}
