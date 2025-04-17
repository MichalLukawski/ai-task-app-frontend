//frontend/src/components/TaskCard/DueDateEditor.jsx

import React from "react";

const DueDateEditor = ({ value, onChange, onBlur, onKeyDown }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!newValue) {
      onChange(null);
      return;
    }

    const parsedDate = Date.parse(newValue);
    if (!isNaN(parsedDate)) {
      const isoDate = new Date(parsedDate).toISOString().split("T")[0];
      onChange(isoDate);
    }
  };

  return (
    <input
      className="editable-field px-3 py-1 rounded-full border text-sm cursor-pointer"
      type="date"
      value={value ? value.slice(0, 10) : ""}
      onChange={handleChange}
      onBlur={() => {
        setTimeout(() => onBlur(), 0);
      }}
      onKeyDown={onKeyDown}
    />
  );
};

export default DueDateEditor;
