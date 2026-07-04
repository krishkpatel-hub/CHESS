import { motion } from "framer-motion";
import ChessPiece from "./ChessPiece.jsx";

function ChessSquare({ file, rank, isLight, piece }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.035,
        boxShadow: "inset 0 0 24px rgba(34, 211, 238, 0.34)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={[
        "relative flex aspect-square items-center justify-center overflow-hidden",
        "border border-white/5 transition-colors duration-200",
        isLight
          ? "bg-cyan-100/16 hover:bg-cyan-100/24"
          : "bg-indigo-950/68 hover:bg-fuchsia-900/54",
      ].join(" ")}
      aria-label={`${file}${rank}${piece ? ` ${piece.color} ${piece.name}` : ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_30%)] opacity-70" />
      <ChessPiece piece={piece} />
    </motion.div>
  );
}

export default ChessSquare;
