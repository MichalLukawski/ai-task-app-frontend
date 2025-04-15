//frontend/src/components/DueDateEditor.jsx

import { useState, useEffect } from 'react';

export default function DueDateEditor({ value, onChange }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      const iso = date.toISOString().split('T')[0]; // YYYY-MM-DD
      setInput(iso);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);

    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(newValue);
    if (isValid) {
      const fullDate = new Date(newValue);
      onChange(fullDate.toISOString());
    } else {
      onChange(null); // nieprawidłowe = rollback w TaskCard
    }
  };

  return (
    <input
      type="date"
      value={input}
      onChange={handleChange}
      className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800 border border-blue-200"
      title="Zmień datę wykonania"
    />
  );
}
