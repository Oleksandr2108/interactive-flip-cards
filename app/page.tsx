"use client";

import { useEffect, useState } from "react";
import { cards } from "@/data/cards";
import { Card } from "@/types/Card";
import AddCardForm from "@/components/AddCardForm/AddCardForm";
import Header from "@/components/Header/Header";
import CardList from "@/components/CardList/CardList";

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

  const handleToggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };

  const cardFavoriteCount = cardList.filter((card) => card.isFavorite).length;
  return (
    <>
      <Header
        cardCount={cardFavoriteCount}
        totalCards={cardList.length}
      />
      <main className="container min-h-screen bg-slate-50 text-slate-950 p-4 transition-colors dark:bg-[#101828] dark:text-slate-100">
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

          <div
            className=" w-full rounded-xl flex items-center justify-center py-4 mb-5 text-sm text-center 
                bg-[#eff6ff] dark:bg-[#1C398E]/20  border border-[#bedbff] dark:border-[#193cb8] 
            "
          >
            💡{" "}
            <span className="text-[#193cb8] dark:text-[#8ec5ff]">
              <strong className="text-[#193cb8] dark:text-[#8ec5ff] font-bold">
                Tip:
              </strong>{" "}
              Drag the cards to reorder them
            </span>
          </div>

          <CardList
            cardList={cardList}
            setCardList={setCardList}
            onRemove={handleRemoveCard}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>
    </>
  );
}
