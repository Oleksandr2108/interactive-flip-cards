import Image from "next/image";
import EmptyStar from "@/assets/icon/EmptyStar.svg";
import Star from "@/assets/icon/Star.svg";
import { Card, CATEGORY_MAP } from "@/types/Card";

interface FrontCardProps {
  title: string;
  image: string;
  category: Card["category"];
  isFavorite: boolean;
}

const FrontCard = (props: FrontCardProps) => {
  return (
    <div className="relative">
      <div className="bg-white flex items-center justify-center absolute rounded-full w-10 h-10 top-3 right-3 z-10 dark:bg-[#1f2937]">
        <Image
          src={props.isFavorite ? Star : EmptyStar}
          alt={props.isFavorite ? "Favorite" : "Not Favorite"}
          width={24}
          height={24}
        />
      </div>
      <div className="w-full h-50 overflow-hidden rounded-t-lg">
        <Image
          width={480}
          height={200}
          src={props.image}
          alt={props.title}
          unoptimized // Disable Next.js image optimization for external URLs
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-20 bg-white rounded-b-lg p-4 dark:bg-[#1f2937]">
        <div>
          <div className="flex items-center ">
            <span className="text-sm font-bold mr-2">
              {CATEGORY_MAP[props.category].icon}
            </span>
            <div className="bg-[#e5e7eb] rounded-full py-1 px-3 dark:bg-[#374151] dark:text-slate-100">
              {" "}
              {CATEGORY_MAP[props.category].label}
            </div>
          </div>
        </div>
        <div>
          <h3
            className={`font-bold text-xl text-[#101828] text-center dark:text-slate-100`}
          >
            {props.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FrontCard;
