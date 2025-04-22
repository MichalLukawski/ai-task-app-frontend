// frontend/src/components/TaskCard/CloseWithAiBox.jsx
import React from 'react';

export default function CloseWithAiBox({ value, onChange, onSave, onCancel, error, isSaving }) {
  return (
    <div className="mt-4 p-3 border rounded-md bg-slate-50">
      <label className="block text-sm text-slate-700 font-medium mb-1">Podsumowanie zadania:</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded resize-none text-sm"
        rows={4}
        placeholder="Wprowadź krótkie podsumowanie ukończonego zadania..."
        disabled={isSaving}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {isSaving && (
        <p className="mt-2 text-sm text-blue-600 italic">Przetwarzanie podsumowania przez AI...</p>
      )}
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Anuluj
        </button>
        <button
          onClick={() => onSave(false)}
          disabled={isSaving}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Zapisz
        </button>
      </div>
    </div>
  );
}
