// frontend/src/components/TaskCard/TaskCard.jsx

import React, { useEffect, useRef } from "react";
import { useTaskCardState } from "../../hooks/useTaskCardState";
import TaskCardView from "./TaskCardView";

const TaskCard = ({ task, onTaskUpdated }) => {
  const {
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

    showSaved,
  } = useTaskCardState({ task, onTaskUpdated });

  const wasEditedRef = useRef(false);
  const isFocusedRef = useRef(isFocused);

  // DEBUG
  console.log("[RENDER] isFocused:", isFocused);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  useEffect(() => {
    if (dueDate !== task.dueDate || difficulty !== task.difficulty) {
      wasEditedRef.current = true;
    }
  }, [dueDate, difficulty, task.dueDate, task.difficulty]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!cardRef.current) return;
  
      const clickedOutside = !cardRef.current.contains(event.target);
      const clickedEditable = event.target.closest(".editable-field");
  
      console.log("[handleClickOutside] isFocused =", isFocusedRef.current);
  
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
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }
  
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    isEditingDueDate,
    isEditingDifficulty,
    dueDate,
    difficulty,
    saveDueDate,
    saveDifficulty,
  ]);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const inEditable = event.target.closest(".editable-field");
        if (inEditable) return;
  
        if (!isFocusedRef.current) {
          // Nie focusuj innej karty przy Enterze
          return;
        }
  
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
          setIsFocused(false); // Zamknij kartę jeśli już była otwarta
        }
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isEditingDueDate,
    isEditingDifficulty,
    dueDate,
    difficulty,
    saveDueDate,
    saveDifficulty,
  ]);
 
  const handleCardClick = (event) => {
    const clickedEditable = event.target.closest(".editable-field");

    console.log("[CLICK]", {
      target: event.target,
      clickedEditable,
      isFocused: isFocusedRef.current,
    });

    if (!isFocusedRef.current) {
      console.log(">>> setIsFocused(true) [click]");
      setIsFocused(true);
      return;
    }

    if (clickedEditable) {
      console.log("→ Ignoruję kliknięcie w editable-field");
      return;
    }

    if (wasEditedRef.current) {
      console.log("→ Zapisuję dane z kliknięcia");
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
      console.log("→ Zamykam kartę z kliknięcia");
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      className={`task-card transition-all duration-200 rounded-2xl border border-slate-200 bg-white p-4 ${
        isFocused ? "scale-[1.02] shadow-xl" : "scale-100"
      }`}
      onClick={handleCardClick}
    >
      <TaskCardView
        task={task}
        dueDate={dueDate}
        difficulty={difficulty}
        isFocused={isFocused}
        isEditingDueDate={isEditingDueDate}
        setIsEditingDueDate={setIsEditingDueDate}
        setDueDate={setDueDate}
        saveDueDate={saveDueDate}
        isEditingDifficulty={isEditingDifficulty}
        setIsEditingDifficulty={setIsEditingDifficulty}
        setDifficulty={setDifficulty}
        saveDifficulty={saveDifficulty}
      />

      {showSaved && (
        <div className="text-green-500 text-xs mt-1 animate-fade-in-out">
          ✔ Zapisano
        </div>
      )}
    </div>
  );
};

export default TaskCard;
