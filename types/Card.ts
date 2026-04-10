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
