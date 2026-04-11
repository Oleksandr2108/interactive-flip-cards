import { useState, useRef } from "react";

export function useDragAndDrop<T extends { id: string }>(
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [touchOverIndex, setTouchOverIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const touchRef = useRef<{ index: number } | null>(null);

  const handleDragStart = (index: number, id: string) => {
    setDragIndex(index);
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDraggedId(null);
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      handleDragEnd();
      return;
    }
    const newList = [...items];
    [newList[dragIndex], newList[index]] = [newList[index], newList[dragIndex]];
    setItems(newList);
    handleDragEnd();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleTouchStart = (index: number, id: string) => {
    touchRef.current = { index };
    setDragIndex(index);
    setDraggedId(id);
    setTouchOverIndex(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const cardEl = el?.closest("[data-card-index]") as HTMLElement | null;
    if (cardEl) {
      const idx = Number(cardEl.dataset.cardIndex);
      setTouchOverIndex(
        !isNaN(idx) && idx !== touchRef.current?.index ? idx : null,
      );
    } else {
      setTouchOverIndex(null);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current === null) return;
    const fromIndex = touchRef.current.index;
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const cardEl = target?.closest("[data-card-index]") as HTMLElement | null;
    if (cardEl) {
      const toIndex = Number(cardEl.dataset.cardIndex);
      if (!isNaN(toIndex) && toIndex !== fromIndex) {
        setItems((prev) => {
          const newList = [...prev];
          [newList[fromIndex], newList[toIndex]] = [
            newList[toIndex],
            newList[fromIndex],
          ];
          return newList;
        });
      }
    }
    touchRef.current = null;
    setTouchOverIndex(null);
    handleDragEnd();
  };

  return {
    draggedId,
    touchOverIndex,
    dragOverIndex,
    setDragOverIndex,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
