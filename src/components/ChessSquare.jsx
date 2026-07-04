import { motion } from "framer-motion";
import ChessPiece from "./ChessPiece.jsx";

function ChessSquare({
  file,
  rank,
  isCheckedKing,
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
        scale: 1.012,
        boxShadow: "inset 0 0 0 1px rgba(205, 183, 122, 0.35)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={[
        "relative flex aspect-square items-center justify-center overflow-hidden",
        "cursor-pointer border border-black/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#cdb77a] focus:ring-inset",
        isLight
          ? "bg-[#b9aa86] hover:bg-[#c4b693]"
          : "bg-[#1f3028] hover:bg-[#263b31]",
        isLegalDestination ? "ring-2 ring-[#cdb77a]" : "",
        isCheckedKing
          ? "ring-2 ring-[#c65a4a] shadow-[inset_0_0_26px_rgba(198,90,74,0.42)]"
          : "",
        isSelected ? "ring-2 ring-[#efe1b2] shadow-[inset_0_0_22px_rgba(239,225,178,0.32)]" : "",
      ].join(" ")}
      data-legal-move={isLegalDestination ? "true" : "false"}
      data-square={squareName ?? `${file}${rank}`}
      aria-label={`${squareName ?? `${file}${rank}`}${piece ? ` ${piece.color} ${piece.name}` : ""}`}
      aria-pressed={isSelected}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),transparent_36%,rgba(0,0,0,0.12))]" />
      {isLegalDestination ? (
        <div className="absolute h-3 w-3 rounded-full border border-[#f0ddb0] bg-[#cdb77a]/70 shadow-[0_2px_8px_rgba(0,0,0,0.28)] sm:h-4 sm:w-4" />
      ) : null}
      {isCheckedKing ? (
        <motion.div
          initial={{ opacity: 0.45, scale: 0.8 }}
          animate={{ opacity: [0.45, 0.95, 0.45], scale: [0.82, 1.08, 0.82] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-full border border-[#d88978]/80 bg-[#7c2d24]/20 shadow-[0_0_18px_rgba(198,90,74,0.38)]"
        />
      ) : null}
      <ChessPiece piece={piece} />
    </motion.div>
  );
}

export default ChessSquare;
