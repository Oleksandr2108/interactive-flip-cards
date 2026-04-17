import { Card } from "@/types/Card";

export type CategoryOption = Card["category"] | "";
export type RarityOption = Card["stats"]["rarity"] | "";

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
