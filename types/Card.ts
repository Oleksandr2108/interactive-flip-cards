export type Card = {
  id: string;
  title: string;
  image: string;
  description: string;
  stats: {
    power: number;
    defense: number;
    speed: number;
    rarity: "Common" | "Rare" | "Epic" | "Legendary";
  };
  category: "fire" | "water" | "earth" | "air";
  isFavorite: boolean;
};

export const CATEGORY_MAP: Record<
  Card["category"],
  { label: string; icon: string }
> = {
  fire: { label: "Fire", icon: "🔥" },
  water: { label: "Water", icon: "💧" },
  earth: { label: "Earth", icon: "🌍" },
  air: { label: "Air", icon: "💨" },
};
