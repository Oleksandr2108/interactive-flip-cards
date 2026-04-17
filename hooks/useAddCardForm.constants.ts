import {
  CategoryOption,
  FormState,
  RarityOption,
} from "./useAddCardForm.model";

export const defaultFormState: FormState = {
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
