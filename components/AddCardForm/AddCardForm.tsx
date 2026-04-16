"use client";

import { Card } from "@/types/Card";
import {
  useAddCardForm,
  categoryOptions,
  rarityOptions,
  FormState,
} from "@/hooks/useAddCardForm";

interface AddCardFormProps {
  onAdd: (card: Card) => void;
}

type CategoryOption = FormState["category"];
type RarityOption = FormState["rarity"];

const AddCardForm = ({ onAdd }: AddCardFormProps) => {
  const { form, handleChange, getInputClass, renderError, handleSubmit } =
    useAddCardForm(onAdd);

  const renderErrorMessage = (field: keyof FormState) => {
    const error = renderError(field);
    return error ? <p className="text-red-500 text-xs">{error}</p> : null;
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
          {renderErrorMessage("title")}
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          Image URL*
          <input
            value={form.image}
            onChange={(event) => handleChange("image", event.target.value)}
            className={getInputClass("image")}
            placeholder="https://example.com/image.jpg"
          />
          {renderErrorMessage("image")}
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
          {renderErrorMessage("category")}
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
          {renderErrorMessage("rarity")}
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
          {renderErrorMessage("description")}
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
