import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";

function GameOverOverlay({ status, onReset }) {
  const title = status.checkmate ? "Checkmate" : "Stalemate";
  const subtitle = status.checkmate
    ? `${status.winner} player wins`
    : "No legal moves remain";

  return (
    <AnimatePresence>
      {status.gameOver ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0c0a]/78 px-6 py-10 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[#4b473b] bg-[#181815]/95 p-7 text-center shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[#d8bf7a]/60" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg border border-[#5a5038] bg-[#242117] text-[#d8bf7a]">
                <Trophy className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#bda66e]">
                Game Over
              </p>
              <h2 className="mt-3 text-5xl font-semibold capitalize leading-none text-[#f4efe4]">
                {title}
              </h2>
              <p className="mt-4 text-lg font-medium capitalize text-[#d7d0c2]">
                {subtitle}
              </p>
              <motion.button
                type="button"
                onClick={onReset}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#cdb77a]/70 bg-[#d8bf7a] px-6 text-sm font-semibold text-[#15130e] shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition hover:bg-[#ead9a5] focus:outline-none focus:ring-2 focus:ring-[#ead9a5] focus:ring-offset-2 focus:ring-offset-[#11110f]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Rematch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default GameOverOverlay;
