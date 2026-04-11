"use client";

import { useState } from "react";
import { Card } from "@/types/Card";

interface AddCardFormProps {
  onAdd: (card: Card) => void;
}

const defaultFormState = {
  title: "",
  image:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop",
  description: "",
  category: "fire" as Card["category"],
  power: 50,
  defense: 50,
  speed: 50,
  rarity: "Common" as Card["stats"]["rarity"],
  isFavorite: false,
};

const AddCardForm = ({ onAdd }: AddCardFormProps) => {
  const [form, setForm] = useState(defaultFormState);

  const handleChange = (key: string, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCard: Card = {
      id: Date.now().toString(),
      title: form.title.trim() || "New card",
      image: form.image.trim() || defaultFormState.image,
      description: form.description.trim() || "No description",
      category: form.category,
      isFavorite: form.isFavorite,
      stats: {
        power: Number(form.power),
        defense: Number(form.defense),
        speed: Number(form.speed),
        rarity: form.rarity,
      },
    };

    onAdd(newCard);
    setForm(defaultFormState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-950 shadow-xl shadow-slate-200/40"
    >
      <h2 className="text-xl font-semibold text-slate-950">Add New Card</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          Title
          <input
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
            placeholder="Card title"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Image URL
          <input
            value={form.image}
            onChange={(event) => handleChange("image", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
            placeholder="https://example.com/image.jpg"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
          Description
          <textarea
            value={form.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            className="min-h-24 w-full resize-none rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
            placeholder="Enter card description"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Category
          <select
            value={form.category}
            onChange={(event) => handleChange("category", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
          >
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="earth">Earth</option>
            <option value="air">Air</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Rarity
          <select
            value={form.rarity}
            onChange={(event) => handleChange("rarity", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
          >
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Power
          <input
            type="number"
            min={0}
            max={100}
            value={form.power}
            onChange={(event) =>
              handleChange("power", Number(event.target.value))
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Defense
          <input
            type="number"
            min={0}
            max={100}
            value={form.defense}
            onChange={(event) =>
              handleChange("defense", Number(event.target.value))
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Speed
          <input
            type="number"
            min={0}
            max={100}
            value={form.speed}
            onChange={(event) =>
              handleChange("speed", Number(event.target.value))
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-300 md:col-span-2">
          <input
            type="checkbox"
            checked={form.isFavorite}
            onChange={(event) =>
              handleChange("isFavorite", event.target.checked)
            }
            className="h-5 w-5 rounded border border-slate-300 bg-white text-amber-400 focus:ring-amber-400"
          />
          Mark as favorite
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;
