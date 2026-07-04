import { motion } from "framer-motion";
import ChessPiece from "./ChessPiece.jsx";

function ChessSquare({
  file,
  rank,
  isLegalDestination,
  isLight,
  isSelected,
  onSelect,
  piece,
  squareName,
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      whileHover={{
        scale: 1.035,
        boxShadow: "inset 0 0 24px rgba(34, 211, 238, 0.34)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={[
        "relative flex aspect-square items-center justify-center overflow-hidden",
        "cursor-pointer border border-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-inset",
        isLight
          ? "bg-cyan-100/16 hover:bg-cyan-100/24"
          : "bg-indigo-950/68 hover:bg-fuchsia-900/54",
        isLegalDestination ? "ring-2 ring-fuchsia-300/90" : "",
        isSelected ? "ring-2 ring-cyan-200 shadow-[inset_0_0_34px_rgba(34,211,238,0.5)]" : "",
      ].join(" ")}
      data-legal-move={isLegalDestination ? "true" : "false"}
      data-square={squareName ?? `${file}${rank}`}
      aria-label={`${squareName ?? `${file}${rank}`}${piece ? ` ${piece.color} ${piece.name}` : ""}`}
      aria-pressed={isSelected}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_30%)] opacity-70" />
      {isLegalDestination ? (
        <div className="absolute h-4 w-4 rounded-full bg-fuchsia-200/85 shadow-[0_0_20px_rgba(217,70,239,0.9)] sm:h-5 sm:w-5" />
      ) : null}
      <ChessPiece piece={piece} />
    </motion.div>
  );
}

export default ChessSquare;
