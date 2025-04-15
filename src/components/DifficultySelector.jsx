//frontend/src/components/DifficultySelector.jsx

import { useRef } from 'react';

const levels = [1, 2, 3, 4, 5];

const getColor = (level) => {
  const map = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-lime-100 text-lime-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-amber-200 text-amber-900',
    5: 'bg-purple-200 text-purple-900',
  };
  return map[level] || 'bg-gray-100 text-gray-800';
};

export default function DifficultySelector({ value, onChange }) {
  const selectRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      selectRef.current?.blur(); // zatwierdzenie zmiany
    }
  };

  return (
    <select
      ref={selectRef}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onKeyDown={handleKeyDown}
      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer editable-field ${getColor(value)}`}
    >
      <option value={1}>★☆☆☆☆ (1)</option>
      <option value={2}>★★☆☆☆ (2)</option>
      <option value={3}>★★★☆☆ (3)</option>
      <option value={4}>★★★★☆ (4)</option>
      <option value={5}>★★★★★ (5)</option>
    </select>
  );
}
