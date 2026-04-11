import { Card } from "@/types/Card";

interface BackCardProps {
  props: Card;
  handleRemove: (id: string) => void;
}

const BackCard = ({ props, handleRemove }: BackCardProps) => {
  return (
    <div className="back-card p-6">
      <div className="flex items-center justify-between">
        <h3 className={`font-bold text-xl  text-[#101828] text-center`}>
          {props.title}
        </h3>
        {props.isFavorite ? (
          <span className="text-amber-500 text-lg ml-2">⭐</span>
        ) : (
          <span className="text-amber-500 text-lg ml-2">☆</span>
        )}
        <div className="rounded-full px-3 py-1 bg-[#2b7fff] flex items-center">
          <span className="text-xs text-white">{props.stats.rarity}</span>
        </div>
      </div>
      <p className="text-center text-[#364153] text-sm mt-4">
        {props.description}
      </p>
      <div>
        <p className="mt-3 flex justify-between text-sm font-bold text-[#364153]">
          <span>Power :</span>
          <span className="text-[#fb2c36]">{props.stats.power}</span>
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden ">
          <div
            className="h-full bg-[#fb2c36] rounded-full"
            style={{ width: `${props.stats.power}%` }}
          />
        </div>
        <p className="mt-3 flex justify-between text-sm font-bold text-[#364153]">
          <span>Defense :</span>
          <span className="text-[#2b7fff]">{props.stats.defense}</span>
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2b7fff] rounded-full"
            style={{ width: `${props.stats.defense}%` }}
          />
        </div>
        <p className="mt-3 flex justify-between text-sm font-bold text-[#364153]">
          <span>Speed :</span>
          <span className="text-[#00c950]">{props.stats.speed}</span>
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00c950] rounded-full"
            style={{ width: `${props.stats.speed}%` }}
          />
        </div>

        <div>
          <button
            onClick={() => handleRemove(props.id)}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
          >
            Remove Card
          </button>
        </div>

        {/* <p className="h-10 text-lg font-bold text-[#101828]">
          Power 🌍 : {props.stats.power}
        </p>
        <p>Defense🌍: {props.stats.defense}</p>
        <p>Speed:🌍 {props.stats.speed}</p>
        <p>Rarity:🌍 {props.stats.rarity}</p> */}
      </div>
    </div>
  );
};

export default BackCard;
