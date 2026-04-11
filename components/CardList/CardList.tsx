"use client";

import { motion } from "framer-motion";
import FlipCard from "@/components/FlipCard/FlipCard";
import FrontCard from "@/components/FrontCard/FrontCard";
import BackCard from "@/components/BackCard/BackCard";
import { Card } from "@/types/Card";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

interface CardListProps {
  cardList: Card[];
  setCardList: React.Dispatch<React.SetStateAction<Card[]>>;
  onRemove: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const CardList = ({
  cardList,
  setCardList,
  onRemove,
  onToggleFavorite,
}: CardListProps) => {
  const {
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
  } = useDragAndDrop(cardList, setCardList);

  return (
    <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 xl:grid-cols-3">
      {cardList.map((card, index) => (
        <motion.div
          key={card.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={
            draggedId === card.id
              ? { opacity: 0.9, scale: 1.02, zIndex: 20 }
              : { opacity: 1, scale: 1, zIndex: 0 }
          }
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className={`w-full max-w-120 relative rounded-2xl transition-shadow ${
            draggedId === card.id
              ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/25"
              : touchOverIndex === index || dragOverIndex === index
                ? "ring-2 ring-purple-400 shadow-lg shadow-purple-400/25"
                : ""
          }`}
          data-card-index={index}
          style={{ touchAction: "none" }}
          onDragEnter={() => {
            if (draggedId && draggedId !== card.id) setDragOverIndex(index);
          }}
          onDragLeave={() => {
            if (dragOverIndex === index) setDragOverIndex(null);
          }}
          onTouchStart={() => handleTouchStart(index, card.id)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <FlipCard
            onDragStart={() => handleDragStart(index, card.id)}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop(index)}
            onDragOver={handleDragOver}
            front={<FrontCard {...card} />}
            back={
              <BackCard
                props={card}
                handleRemove={onRemove}
                onToggleFavorite={onToggleFavorite}
              />
            }
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CardList;
