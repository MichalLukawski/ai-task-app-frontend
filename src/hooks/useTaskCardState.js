// frontend/src/hooks/useTaskCardState.js

import { useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';

export const useTaskCardState = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isFocused, setIsFocused] = useState(false);

  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);

  const [dueDate, setDueDate] = useState(task.dueDate);
  const [difficulty, setDifficulty] = useState(task.difficulty);

  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const [isClosingWithAI, setIsClosingWithAI] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [aiSummaryError, setAiSummaryError] = useState(null);

  const api = useApi();
  const cardRef = useRef(null);
  const taskRef = useRef(task);

  useEffect(() => {
    setDueDate(task.dueDate);
    setDifficulty(task.difficulty);
    taskRef.current = task;
  }, [task.dueDate, task.difficulty]);

  useEffect(() => {
    refetchTask();
  }, []);

  const refetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${task._id}`);
      const updated = response?.data;
      setDueDate(updated.dueDate);
      setDifficulty(updated.difficulty);
      taskRef.current = updated;
      onTaskUpdated(updated);
    } catch (e) {
      console.error('❌ Błąd pobierania zadania:', e);
    }
  };

  const saveField = async (fieldName, newValue) => {
    if (!taskRef.current || newValue === taskRef.current[fieldName]) return;

    try {
      setIsSaving(true);
      await api.patch(`/tasks/${task._id}`, { [fieldName]: newValue });
      await refetchTask();
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    } catch (e) {
      console.error(`❌ Błąd zapisu pola ${fieldName}:`, e);
      alert(`Błąd zapisu pola ${fieldName}.`);
    } finally {
      if (fieldName === 'dueDate') setIsEditingDueDate(false);
      if (fieldName === 'difficulty') setIsEditingDifficulty(false);
      setIsSaving(false);
    }
  };

  const saveDueDate = async (newDate) => {
    if (!newDate || newDate === taskRef.current.dueDate) {
      setDueDate(taskRef.current.dueDate);
      return;
    }
    await saveField('dueDate', newDate);
  };

  const saveDifficulty = async (newValue) => {
    if (
      typeof newValue !== 'number' ||
      newValue < 1 ||
      newValue > 5 ||
      newValue === taskRef.current.difficulty
    ) {
      setDifficulty(taskRef.current.difficulty);
      return;
    }
    await saveField('difficulty', newValue);
  };

  const closeWithAi = async (force = false) => {
    try {
      setIsSaving(true);
      const response = await api.patch(`/tasks/${task._id}/ai-close`, {
        summary: aiSummary,
        force,
      });
      const updated = response?.data;
      taskRef.current = updated;
      onTaskUpdated(updated);
      setIsClosingWithAI(false);
      setAiSummary('');
      setAiSummaryError(null);
    } catch (e) {
      console.error("❌ Błąd zamykania zadania przez AI:", e);
      const code = e?.response?.data?.code;
      const message = e?.response?.data?.message || "Wystąpił błąd";
    
      if (code === "AI_REJECTED") {
        setAiSummaryError(message);
      } else {
        alert(`Błąd zapisu podsumowania: ${message}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const closeWithoutAI = async () => {
    try {
      setIsSaving(true);
      const response = await api.patch(`/tasks/${task._id}/close`, {
        summary: aiSummary,
      });
      const updated = response?.data;
      taskRef.current = updated;
      onTaskUpdated(updated);
      setIsClosingWithAI(false);
      setAiSummary("");
      setAiSummaryError(null);
    } catch (e) {
      console.error("❌ Błąd ręcznego zamknięcia zadania:", e);
      setAiSummaryError("Nie udało się zamknąć zadania.");
    } finally {
      setIsSaving(false);
    }
  };
  

  const saveAll = async () => {
    if (dueDate !== taskRef.current.dueDate) await saveDueDate(dueDate);
    if (difficulty !== taskRef.current.difficulty) await saveDifficulty(difficulty);
  };

  const cancelChanges = () => {
    setDueDate(taskRef.current.dueDate);
    setDifficulty(taskRef.current.difficulty);
    setIsEditingDueDate(false);
    setIsEditingDifficulty(false);
  };

  const deleteTask = async () => {
    try {
      await api.del(`/tasks/${task._id}`);
      onTaskDeleted(task._id);
     
    } catch (e) {
      console.error("❌ Błąd usuwania zadania:", e);
      alert("Nie udało się usunąć zadania.");
    }
  };

  const hasChanges =
    dueDate !== taskRef.current.dueDate || difficulty !== taskRef.current.difficulty;

  return {
    cardRef,
    isFocused,
    setIsFocused,

    isEditingDueDate,
    setIsEditingDueDate,
    dueDate,
    setDueDate,
    saveDueDate,

    isEditingDifficulty,
    setIsEditingDifficulty,
    difficulty,
    setDifficulty,
    saveDifficulty,

    isClosingWithAI,
    setIsClosingWithAI,
    aiSummary,
    setAiSummary,
    aiSummaryError,
    closeWithAi,
    closeWithoutAI,
    setAiSummaryError,

    saveAll,
    cancelChanges,
    hasChanges,

    isSaving,
    showSaved,
    deleteTask,
  };
};
