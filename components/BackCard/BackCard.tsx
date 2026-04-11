import { Card } from "@/types/Card";
import EmptyStar from "@/assets/icon/EmptyStar.svg";
import Star from "@/assets/icon/Star.svg";
import Basket from "@/assets/icon/basket.png";
import Image from "next/image";

interface BackCardProps {
  props: Card;
  handleRemove: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const BackCard = ({ props, handleRemove, onToggleFavorite }: BackCardProps) => {
  const handleToggleFavorite = () => {};

  return (
    <div className="back-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className={`font-bold text-xl  text-[#101828] text-center`}>
          {props.title}
        </h3>
        {props.isFavorite ? (
          <Image
            src={Star}
            alt="Favorite"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => onToggleFavorite(props.id)}
          />
        ) : (
          <Image
            src={EmptyStar}
            alt="Not Favorite"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => onToggleFavorite(props.id)}
          />
        )}
        <div className="rounded-full px-3 py-1 bg-[#2b7fff] flex items-center">
          <span className="text-xs text-white">{props.stats.rarity}</span>
        </div>
      </div>
      <p className="text-center text-[#364153] text-sm mt-4">
        {props.description}
      </p>
      <div className="flex-1">
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
      </div>

      <button
        onClick={() => handleRemove(props.id)}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 flex items-center justify-center mt-4 cursor-pointer"
      >
        <Image
          src={Basket}
          alt="Remove"
          width={20}
          height={28}
          className="inline-block mr-2"
        />
        Delete
      </button>
    </div>
  );
};

export default BackCard;
