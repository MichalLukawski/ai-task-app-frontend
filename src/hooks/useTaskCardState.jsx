// frontend/src/hooks/useTaskCardState.js

import { useEffect, useRef, useState } from "react";
import { useApi } from "../hooks/useApi";

export const useTaskCardState = ({ task, onTaskUpdated }) => {
  const [isFocused, setIsFocused] = useState(false);

  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);

  const [dueDate, setDueDate] = useState(task.dueDate);
  const [difficulty, setDifficulty] = useState(task.difficulty);

  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const api = useApi();
  const cardRef = useRef(null);

  // Synchronizuj lokalne dane, gdy przychodzi nowy task
  useEffect(() => {
    setDueDate(task.dueDate);
    setDifficulty(task.difficulty);
  }, [task.dueDate, task.difficulty]);

  const refetchTask = async () => {
    try {
      const updated = await api.get(`/tasks/${task._id}`);
      setDueDate(updated.dueDate);
      setDifficulty(updated.difficulty);
      onTaskUpdated(updated);
    } catch (e) {
      console.error("❌ Błąd pobierania zadania:", e);
    }
  };

  const saveDueDate = async (newDate) => {
    if (!newDate || newDate === task.dueDate) {
      setDueDate(task.dueDate);
      return;
    }

    try {
      setIsSaving(true);
      await api.patch(`/tasks/${task._id}`, { dueDate: newDate });
      await refetchTask();
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    } catch (e) {
      console.error("❌ Błąd zapisu daty:", e);
      alert("Błąd zapisu daty.");
    } finally {
      setIsEditingDueDate(false);
      setIsSaving(false);
    }
  };

  const saveDifficulty = async (newValue) => {
    if (
      typeof newValue !== "number" ||
      newValue < 1 ||
      newValue > 5 ||
      newValue === task.difficulty
    ) {
      setDifficulty(task.difficulty);
      return;
    }

    try {
      setIsSaving(true);
      await api.patch(`/tasks/${task._id}`, { difficulty: newValue });
      await refetchTask();
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    } catch (e) {
      console.error("❌ Błąd zapisu trudności:", e);
      alert("Błąd zapisu trudności.");
    } finally {
      setIsEditingDifficulty(false);
      setIsSaving(false);
    }
  };

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

    isSaving,
    showSaved,
  };
};
