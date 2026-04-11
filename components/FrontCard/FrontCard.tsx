import Image from "next/image";
import EmptyStar from "@/assets/icon/EmptyStar.svg";
import Star from "@/assets/icon/Star.svg";

interface FrontCardProps {
  title: string;
  image: string;
  category: "fire" | "water" | "earth" | "air";
  isFavorite: boolean;
}

const FrontCard = (props: FrontCardProps) => {
  return (
    <div className="relative">
      <div className="bg-white flex items-center justify-center absolute rounded-full w-10 h-10 top-3 right-3 z-10 dark:bg-[#1f2937]">
        {props.isFavorite ? (
          <Image
            src={Star}
            alt="Favorite"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={EmptyStar}
            alt="Not Favorite"
            width={24}
            height={24}
          />
        )}
      </div>
      <div className="w-full h-50 overflow-hidden rounded-t-lg">
        <Image
          width={480}
          height={200}
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-20 bg-white rounded-b-lg p-4 dark:bg-[#1f2937]">
        <div>
          {props.category === "fire" && (
            <div className="flex items-center ">
              <span className="text-red-500 text-sm font-bold mr-2">🔥</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3 dark:bg-[#374151] dark:text-slate-100">
                {" "}
                Fire
              </div>
            </div>
          )}
          {props.category === "water" && (
            <div className="flex items-center ">
              <span className="text-blue-500 text-sm font-bold mr-2">💧</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3 dark:bg-[#374151] dark:text-slate-100">
                {" "}
                Water
              </div>
            </div>
          )}
          {props.category === "earth" && (
            <div className="flex items-center ">
              <span className="text-green-500 text-sm font-bold mr-2">🌍</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3 dark:bg-[#374151] dark:text-slate-100">
                {" "}
                Earth
              </div>
            </div>
          )}
          {props.category === "air" && (
            <div className="flex items-center ">
              <span className="text-gray-500 text-sm font-bold mr-2">💨</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3 dark:bg-slate-700 dark:text-slate-100">
                {" "}
                Air
              </div>
            </div>
          )}
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
