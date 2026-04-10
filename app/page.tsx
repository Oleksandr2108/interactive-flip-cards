import BackCard from "@/components/BackCard/BackCard";
import FlipCard from "@/components/FlipCard/FlipCard";
import FrontCard from "@/components/FrontCard/FrontCard";
import { cards } from "@/data/cards";
export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className="w-120 relative  rounded-2xl"
        >
          <FlipCard
            key={card.id}
            front={<FrontCard {...card} />}
            back={<BackCard {...card} />}
          />
        </div>
      ))}
    </div>
  );
}
