"use client";

import { useState } from "react";
import { Card } from "@/types/Card";
import { FormState } from "./useAddCardForm.model";
import { defaultFormState } from "./useAddCardForm.constants";

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
    renderError,
    handleSubmit,
  };
};
