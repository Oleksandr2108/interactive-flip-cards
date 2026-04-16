"use client";

import { useState } from "react";
import { Card } from "@/types/Card";

type CategoryOption = Card["category"] | "";
type RarityOption = Card["stats"]["rarity"] | "";

export type FormState = {
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

export const categoryOptions: Array<{ value: CategoryOption; label: string }> =
  [
    { value: "", label: "Select category" },
    { value: "fire", label: "Fire" },
    { value: "water", label: "Water" },
    { value: "earth", label: "Earth" },
    { value: "air", label: "Air" },
  ];

export const rarityOptions: Array<{ value: RarityOption; label: string }> = [
  { value: "", label: "Select rarity" },
  { value: "Common", label: "Common" },
  { value: "Rare", label: "Rare" },
  { value: "Epic", label: "Epic" },
  { value: "Legendary", label: "Legendary" },
];

export const useAddCardForm = (onAdd: (card: Card) => void) => {
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

  const renderError = (field: keyof FormState) => errors[field] || null;

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

  return {
    form,
    errors,
    handleChange,
    getInputClass,
    renderError,
    handleSubmit,
  };
};
