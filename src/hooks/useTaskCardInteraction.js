// frontend/src/hooks/useTaskCardInteraction.js

import { useEffect, useRef } from 'react';

export const useTaskCardInteraction = ({
  cardRef,
  isFocused,
  setIsFocused,
  isEditingDueDate,
  setIsEditingDueDate,
  dueDate,
  saveDueDate,
  isEditingDifficulty,
  setIsEditingDifficulty,
  difficulty,
  saveDifficulty,
}) => {
  const wasEditedRef = useRef(false);
  const isFocusedRef = useRef(isFocused);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  useEffect(() => {
    if (dueDate !== undefined && difficulty !== undefined) {
      wasEditedRef.current = true;
    }
  }, [dueDate, difficulty]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!cardRef.current) return;

      const clickedOutside = !cardRef.current.contains(event.target);
      const clickedEditable = event.target.closest('.editable-field');

      if (clickedOutside) {
        if (isEditingDueDate) {
          saveDueDate(dueDate);
          setIsEditingDueDate(false);
        }
        if (isEditingDifficulty) {
          saveDifficulty(difficulty);
          setIsEditingDifficulty(false);
        }
        setIsFocused(false);
        wasEditedRef.current = false;
      } else if (!clickedEditable) {
        if (wasEditedRef.current) {
          if (isEditingDueDate) {
            saveDueDate(dueDate);
            setIsEditingDueDate(false);
          }
          if (isEditingDifficulty) {
            saveDifficulty(difficulty);
            setIsEditingDifficulty(false);
          }
          wasEditedRef.current = false;
        } else {
          setIsFocused(false);
        }
      }
    };

    let timer;
    if (isFocusedRef.current) {
      timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isEditingDueDate, isEditingDifficulty, dueDate, difficulty, saveDueDate, saveDifficulty]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        const inEditable = event.target.closest('.editable-field');
        if (inEditable) return;

        if (!isFocusedRef.current) return;

        if (wasEditedRef.current) {
          if (isEditingDueDate) {
            saveDueDate(dueDate);
            setIsEditingDueDate(false);
          }
          if (isEditingDifficulty) {
            saveDifficulty(difficulty);
            setIsEditingDifficulty(false);
          }
          wasEditedRef.current = false;
        } else {
          setIsFocused(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditingDueDate, isEditingDifficulty, dueDate, difficulty, saveDueDate, saveDifficulty]);

  const handleCardClick = (event) => {
    const clickedEditable = event.target.closest('.editable-field');

    if (!isFocusedRef.current) {
      setIsFocused(true);
      return;
    }

    if (clickedEditable) return;

    if (wasEditedRef.current) {
      if (isEditingDueDate) {
        saveDueDate(dueDate);
        setIsEditingDueDate(false);
      }
      if (isEditingDifficulty) {
        saveDifficulty(difficulty);
        setIsEditingDifficulty(false);
      }
      wasEditedRef.current = false;
    } else {
      setIsFocused(false);
    }
  };

  return {
    handleCardClick,
  };
};
