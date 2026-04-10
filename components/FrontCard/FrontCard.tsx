import Image from "next/image";

interface FrontCardProps {
  title: string;
  image: string;
  category: "fire" | "water" | "earth" | "air";
  isFavorite: boolean;
}

const FrontCard = (props: FrontCardProps) => {
  return (
    <div className="">
      <div className="w-[480px] h-[200px] overflow-hidden rounded-t-lg">
        <Image
          width={480}
          height={200}
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-20 bg-white rounded-b-lg p-4 ">
        <div>
          {props.category === "fire" && (
            <div className="flex items-center ">
              <span className="text-red-500 text-sm font-bold mr-2">🔥</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3"> Fire</div>
            </div>
          )}
          {props.category === "water" && (
            <div className="flex items-center ">
              <span className="text-blue-500 text-sm font-bold mr-2">💧</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3"> Water</div>
            </div>
          )}
          {props.category === "earth" && (
            <div className="flex items-center ">
              <span className="text-green-500 text-sm font-bold mr-2">🌍</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3"> Earth</div>
            </div>
          )}
          {props.category === "air" && (
            <div className="flex items-center ">
              <span className="text-gray-500 text-sm font-bold mr-2">💨</span>
              <div className="bg-[#e5e7eb] rounded-full py-1 px-3"> Air</div>
            </div>
          )}
        </div>
        <div>
          <h3 className={`font-bold text-xl  text-[#101828] text-center`}>
            {props.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FrontCard;
