"use client";

import { useState } from "react";

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
  const containerStyle: React.CSSProperties = {
    width: "480px",
    height: "400px",
    perspective: "1200px",
    cursor: "default",
  };

  const innerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: "16px",
    overflow: "hidden",
  };

  const backStyle: React.CSSProperties = {
    ...faceBase,
    transform: "rotateY(180deg)",
  };

  const hoverProps = {
    onMouseEnter: () => setFlipped(true),
    onMouseLeave: () => setFlipped(false),
  };
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={containerStyle}
      {...hoverProps}
    >
      <div style={innerStyle}>
        <div style={faceBase} className="bg-white dark:bg-[#1f2937]">{front}</div>
        <div style={backStyle} className="bg-white dark:bg-[#1f2937]">{back}</div>
      </div>
    </div>
  );
};

export default FlipCard;
