"use client";

import { useState } from "react";
import { Card } from "@/types/Card";

interface AddCardFormProps {
  onAdd: (card: Card) => void;
}

type CategoryOption = Card["category"] | "";
type RarityOption = Card["stats"]["rarity"] | "";

type FormState = {
  title: string;
  image: string;
  description: string;
  category: CategoryOption;
  power: number;
  defense: number;
  speed: number;
  rarity: RarityOption;
  isFavorite: boolean;
};

const defaultFormState: FormState = {
  title: "",
  image: "",
  description: "",
  category: "",
  power: 50,
  defense: 50,
  speed: 50,
  rarity: "",
  isFavorite: false,
};

const categoryOptions: Array<{ value: CategoryOption; label: string }> = [
  { value: "", label: "Select category" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "earth", label: "Earth" },
  { value: "air", label: "Air" },
];

const rarityOptions: Array<{ value: RarityOption; label: string }> = [
  { value: "", label: "Select rarity" },
  { value: "Common", label: "Common" },
  { value: "Rare", label: "Rare" },
  { value: "Epic", label: "Epic" },
  { value: "Legendary", label: "Legendary" },
];

const AddCardForm = ({ onAdd }: AddCardFormProps) => {
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const getInputClass = (field: keyof FormState) =>
    `w-full mt-2 rounded-2xl border px-4 py-3 bg-slate-100 text-slate-950 outline-none transition focus:border-sky-400 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:focus:border-sky-300 ${
      errors[field] ? "border-red-500" : "border-slate-300"
    }`;

  const renderError = (field: keyof FormState) =>
    errors[field] ? (
      <p className="text-red-500 text-xs">{errors[field]}</p>
    ) : null;

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) {
      nextErrors.title = "Title is required";
    }

    if (!form.image.trim()) {
      nextErrors.image = "URL is required";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Description is required";
    }

    if (!form.category) {
      nextErrors.category = "Select a category";
    }

    if (!form.rarity) {
      nextErrors.rarity = "Select rarity";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      title: form.title.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      category: form.category as Card["category"],
      isFavorite: form.isFavorite,
      stats: {
        power: form.power,
        defense: form.defense,
        speed: form.speed,
        rarity: form.rarity as Card["stats"]["rarity"],
      },
    };

    onAdd(newCard);
    setForm(defaultFormState);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-950 shadow-xl shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20"
    >
      <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">
        Add New Card
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Title*
          <input
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className={getInputClass("title")}
            placeholder="Card title"
          />
          {renderError("title")}
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Image URL*
          <input
            value={form.image}
            onChange={(event) => handleChange("image", event.target.value)}
            className={getInputClass("image")}
            placeholder="https://example.com/image.jpg"
          />
          {renderError("image")}
        </label>

        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Category*
          <select
            value={form.category}
            onChange={(event) =>
              handleChange("category", event.target.value as CategoryOption)
            }
            className={getInputClass("category")}
          >
            {categoryOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          {renderError("category")}
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Rarity*
          <select
            value={form.rarity}
            onChange={(event) =>
              handleChange("rarity", event.target.value as RarityOption)
            }
            className={getInputClass("rarity")}
          >
            {rarityOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          {renderError("rarity")}
        </label>
        <label className="space-y-2 text-sm text-slate-300 md:col-span-2 dark:text-slate-300">
          Description*
          <textarea
            value={form.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            className={`${getInputClass("description")} min-h-24 resize-none`}
            placeholder="Enter card description"
          />
          {renderError("description")}
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Power {form.power}
          <input
            type="range"
            min={0}
            max={100}
            value={form.power}
            onChange={(event) =>
              handleChange("power", Number(event.target.value))
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-100  py-3 text-slate-950 outline-none transition focus:border-sky-400 dark:border-slate-600 dark:bg-slate-800"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Defense {form.defense}
          <input
            type="range"
            min={0}
            max={100}
            value={form.defense}
            onChange={(event) =>
              handleChange("defense", Number(event.target.value))
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-100  py-3 text-slate-950 outline-none transition focus:border-sky-400 dark:border-slate-600 dark:bg-slate-800"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Speed {form.speed}
          <input
            type="range"
            min={0}
            max={100}
            value={form.speed}
            onChange={(event) =>
              handleChange("speed", Number(event.target.value))
            }
            className="w-full h-2 rounded-2xl border border-slate-300 bg-slate-100  py-3 text-slate-950 outline-none transition focus:border-sky-400 dark:border-slate-600 dark:bg-slate-800"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full mt-6 inline-flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] bg-gradient-to-r from-[#155dfc] to-[#9810fa] rounded-[10px] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
      >
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;
