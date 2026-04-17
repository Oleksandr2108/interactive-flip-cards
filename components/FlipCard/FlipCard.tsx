"use client";

import { useState } from "react";
import { useFlipSound } from "@/hooks/useFlipSound";
import styles from "./FlipCard.module.css";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrop: () => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const FlipCard = ({
  front,
  back,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
}: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const playFlip = useFlipSound();

  const hoverProps = {
    onMouseEnter: () => {
      setFlipped(true);
      playFlip();
    },
    onMouseLeave: () => {
      setFlipped(false);
      playFlip();
    },
  };
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className={styles.container}
      {...hoverProps}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
        <div className={`${styles.face} bg-white dark:bg-[#1f2937]`}>
          {front}
        </div>
        <div
          className={`${styles.face} ${styles.back} bg-white dark:bg-[#1f2937]`}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
