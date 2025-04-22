//frontend/src/components/TaskCard/DifficultySelector.jsx

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

export default function DifficultySelector({ value, onChange, onBlur, onKeyDown }) {
  const selectRef = useRef(null);

  return (
    <select
      ref={selectRef}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onBlur={() => {
        setTimeout(() => onBlur(), 0);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.target.blur();
        }
      }}
      className={`editable-field px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getColor(value)}`}
    >
      {levels.map((lvl) => (
        <option key={lvl} value={lvl}>
          {'★'.repeat(lvl) + '☆'.repeat(5 - lvl)} ({lvl})
        </option>
      ))}
    </select>
  );
}
