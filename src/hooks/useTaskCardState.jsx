//frontend/src/hooks/useTaskCardState.js

import { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';

export default function useTaskCardState(task, onTaskUpdated) {
  const [isEditing, setIsEditing] = useState(false);
  const [difficulty, setDifficulty] = useState(task.difficulty);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [showSaved, setShowSaved] = useState(false);
  const [enterCount, setEnterCount] = useState(0);

  const original = useRef({ difficulty: task.difficulty, dueDate: task.dueDate });
  const cardRef = useRef();
  const justOpenedRef = useRef(false); // blokada na pierwszy klik po wejściu w edycję

  // 🧠 handleClickOutside musi być zdefiniowany PRZED użyciem w useEffect
  const handleClickOutside = (e) => {
    if (justOpenedRef.current) {
      justOpenedRef.current = false;
      return;
    }

    const isOutside = !cardRef.current?.contains(e.target);
    const isNotEditable = !e.target.closest('.editable-field');

    if (isEditing && (isOutside || isNotEditable)) {
      confirmAndExitEdit();
    }
  };

  // Synchronizacja danych wejściowych z taska
  useEffect(() => {
    setDifficulty(task.difficulty);
    setDueDate(task.dueDate);
    original.current = { difficulty: task.difficulty, dueDate: task.dueDate };
  }, [task.difficulty, task.dueDate]);

  // Obsługa kliknięcia poza kartą
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isEditing, difficulty, dueDate]);

  const handleCardClick = (e) => {
    const clickedInEditable = e.target.closest('.editable-field');

    if (!isEditing) {
      setIsEditing(true);
      justOpenedRef.current = true;
      setEnterCount(0);
    } else if (!clickedInEditable) {
      confirmAndExitEdit();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (enterCount >= 1) {
        confirmAndExitEdit();
      } else {
        if (document.activeElement) {
          document.activeElement.blur();
        }
        setEnterCount((prev) => prev + 1);
      }
    }
  };

  const confirmAndExitEdit = () => {
    const isValidDate = !dueDate || !isNaN(new Date(dueDate).getTime());

    if (isValidDate) {
      saveChanges();
    } else {
      rollbackChanges();
    }

    setIsEditing(false);
    setEnterCount(0);
  };

  const saveChanges = async () => {
    const { difficulty: originalDiff, dueDate: originalDate } = original.current;

    const noChanges = difficulty === originalDiff && dueDate === originalDate;
    if (noChanges) return;

    const updates = { difficulty };
    if (dueDate) updates.dueDate = dueDate;

    try {
      const res = await axios.patch(`/tasks/${task._id}`, updates);
      onTaskUpdated?.(res.data.data);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    } catch (err) {
      console.error('Update failed:', err);
      rollbackChanges();
    }
  };

  const rollbackChanges = () => {
    setDifficulty(original.current.difficulty);
    setDueDate(original.current.dueDate);
  };

  return {
    isEditing,
    setIsEditing,
    difficulty,
    setDifficulty,
    dueDate,
    setDueDate,
    cardRef,
    showSaved,
    handleCardClick,
    handleKeyDown,
    handleClickOutside,
  };
}
