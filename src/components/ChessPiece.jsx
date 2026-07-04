import { motion } from "framer-motion";

function PieceShape({ name }) {
  switch (name) {
    case "king":
      return (
        <>
          <span className="piece-crown" />
          <span className="piece-spire piece-spire-left" />
          <span className="piece-spire piece-spire-right" />
          <span className="piece-core" />
          <span className="piece-base" />
        </>
      );
    case "queen":
      return (
        <>
          <span className="piece-crystal piece-crystal-back" />
          <span className="piece-crystal piece-crystal-front" />
          <span className="piece-core" />
          <span className="piece-base" />
        </>
      );
    case "bishop":
      return (
        <>
          <span className="piece-blade" />
          <span className="piece-core" />
          <span className="piece-base" />
        </>
      );
    case "knight":
      return (
        <>
          <span className="piece-horse-head" />
          <span className="piece-horse-neck" />
          <span className="piece-core" />
          <span className="piece-base" />
        </>
      );
    case "rook":
      return (
        <>
          <span className="piece-battlement piece-battlement-left" />
          <span className="piece-battlement piece-battlement-center" />
          <span className="piece-battlement piece-battlement-right" />
          <span className="piece-core" />
          <span className="piece-base" />
        </>
      );
    default:
      return (
        <>
          <span className="piece-orb" />
          <span className="piece-core" />
          <span className="piece-base" />
        </>
      );
  }
}

function ChessPiece({ piece, size = "board" }) {
  if (!piece) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      whileHover={{ scale: 1.12, y: -3 }}
      className={[
        "piece-token",
        `piece-${piece.name}`,
        piece.color,
        size === "captured" ? "piece-token-captured" : "piece-token-board",
      ].join(" ")}
      aria-label={`${piece.color} ${piece.name}`}
    >
      <span className="sr-only">{`${piece.color} ${piece.name}`}</span>
      <PieceShape name={piece.name} />
    </motion.div>
  );
}

export default ChessPiece;
