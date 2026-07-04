import { motion } from "framer-motion";

function ChessPiece({ piece }) {
  if (!piece) {
    return null;
  }

  const isWhite = piece.color === "white";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.72, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      whileHover={{ scale: 1.12, y: -3 }}
      className={[
        "select-none text-[clamp(1.55rem,7vw,4.35rem)] leading-none",
        "drop-shadow-[0_0_18px_rgba(125,211,252,0.42)]",
        isWhite
          ? "text-slate-50 [text-shadow:0_0_16px_rgba(255,255,255,0.3)]"
          : "text-slate-950 [text-shadow:0_0_18px_rgba(168,85,247,0.64)]",
      ].join(" ")}
      aria-label={`${piece.color} ${piece.name}`}
    >
      {piece.symbol}
    </motion.span>
  );
}

export default ChessPiece;
