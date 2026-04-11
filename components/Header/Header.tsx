import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface HeaderProps {
  cardCount: number;
  totalCards: number;
}
const Header = ({ cardCount, totalCards }: HeaderProps) => {
  return (
    <header
      className="sticky top-0 z-40 border-b  border-[#e5e7eb] dark:border-b-[#364153] 
      bg-white dark:bg-[#101828]"
    >
      <div className="container flex items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <h1
            className="font-bold text-lg sm:text-2xl truncate"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Card Collection
          </h1>
          <p className="text-xs text-[#99A1AF] hidden sm:block">
            Hover or tap a card to flip it
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Card count badge */}
          <div
            className="flex items-center justify-center gap-1 sm:gap-1.5 h-10 sm:h-13 px-3 sm:px-4 rounded-full text-sm sm:text-[16px] font-semibold 
            bg-[#fefce8] dark:bg-[#733E0A]/30
            border border-[#fde68a] dark:border-[#d08700]
            text-[#92400e] dark:text-[#fbbf24]"
          >
            <span>⭐</span>
            <span>
              {cardCount} / {totalCards}
            </span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
