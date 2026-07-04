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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 px-6 py-10 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-cyan-200/35 bg-white/10 p-7 text-center shadow-[0_0_54px_rgba(34,211,238,0.28)] backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.28),transparent_42%),linear-gradient(135deg,rgba(168,85,247,0.18),transparent_46%)]" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-cyan-200/40 bg-cyan-300/10 text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,0.32)]">
                <Trophy className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.34em] text-cyan-100/80">
                Game Over
              </p>
              <h2 className="mt-3 text-5xl font-black capitalize leading-none text-white">
                {title}
              </h2>
              <p className="mt-4 text-lg font-semibold capitalize text-slate-200">
                {subtitle}
              </p>
              <motion.button
                type="button"
                onClick={onReset}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-cyan-200/50 bg-cyan-300 px-6 text-sm font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.28)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950"
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
