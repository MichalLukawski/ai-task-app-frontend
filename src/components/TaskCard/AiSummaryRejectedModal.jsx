// frontend/src/components/TaskCard/AiSummaryRejectedModal.jsx

import React from 'react';

export default function AiSummaryRejectedModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Podsumowanie wymaga poprawek</h2>
        <p className="text-sm text-gray-700 mb-4">
          Twoje podsumowanie nie spełnia wymagań merytorycznych wskazanych przez system AI. Czy mimo
          to chcesz je zapisać jako końcową wersję?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Nie, poprawię
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            Tak, zapisz mimo to
          </button>
        </div>
      </div>
    </div>
  );
}
