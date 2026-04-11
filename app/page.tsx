"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackCard from "@/components/BackCard/BackCard";
import FlipCard from "@/components/FlipCard/FlipCard";
import FrontCard from "@/components/FrontCard/FrontCard";
import AddCardForm from "@/components/AddCardForm/AddCardForm";
import { cards } from "@/data/cards";
import { Card } from "@/types/Card";

const STORAGE_KEY = "interactive-flip-cards";

export default function Home() {
  const [cardList, setCardList] = useState<Card[]>(() => {
    if (typeof window === "undefined") {
      return cards;
    }

    const savedCards = window.localStorage.getItem(STORAGE_KEY);
    if (!savedCards) {
      return cards;
    }

    try {
      return JSON.parse(savedCards);
    } catch {
      return cards;
    }
  });

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cardList));
  }, [cardList]);

  const handleAddCard = (newCard: Card) => {
    setCardList((prev) => [newCard, ...prev]);
  };

  const handleRemoveCard = (id: string) => {
    setCardList((prev) => prev.filter((card) => card.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setCardList((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card,
      ),
    );
  };

  const handleDragStart = (index: number, id: string) => {
    setDragIndex(index);
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDraggedId(null);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      handleDragEnd();
      return;
    }
    const newList = [...cardList];
    [newList[dragIndex], newList[index]] = [newList[index], newList[dragIndex]];
    setCardList(newList);
    handleDragEnd();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleToggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 p-8">
      <div className="space-y-10">
        <div
          className="
          w-40
          flex items-center justify-center 
          shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] 
          bg-linear-to-r 
          from-[#155dfc] to-[#9810fa] 
          rounded-[10px] 
          px-6 py-3 
          text-[16px]  font-semibold text-white
          cursor-pointer"
          onClick={handleToggleForm}
        >
          {isOpenForm ? "❌ Close Form" : "✨ Add Card"}
          
        </div>
        {isOpenForm && <AddCardForm onAdd={handleAddCard} />}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
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
              className="w-120 relative rounded-2xl"
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
                    handleRemove={handleRemoveCard}
                    onToggleFavorite={handleToggleFavorite}
                  />
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
