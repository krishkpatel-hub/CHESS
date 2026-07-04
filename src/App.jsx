import { motion } from "framer-motion";
import { Sparkles, Swords } from "lucide-react";
import ChessBoard from "./components/ChessBoard.jsx";
import GameSidebar from "./components/GameSidebar.jsx";
import { useChessGame } from "./game/useChessGame.js";

function App() {
  const game = useChessGame();

  return (
    <main className="min-h-screen overflow-hidden bg-[#07080f] text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(58,134,255,0.22),transparent_32%),linear-gradient(135deg,rgba(20,184,166,0.13),transparent_28%),linear-gradient(315deg,rgba(244,63,94,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="mb-7 flex h-16 w-16 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_36px_rgba(34,211,238,0.28)]"
          >
            <Swords className="h-8 w-8 text-cyan-200" aria-hidden="true" />
          </motion.div>

          <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.34em] text-cyan-200/85">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Tactical Interface Online
          </div>

          <h1 className="max-w-full text-6xl font-black leading-none tracking-normal text-white sm:text-7xl md:text-8xl">
            NeoChess
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A futuristic chess arena is coming online. The original Java engine
            stays preserved while the next interface takes shape.
          </p>

          <div className="mt-10 grid w-full items-start gap-6 lg:grid-cols-[minmax(0,620px)_330px] lg:justify-center">
            <div className="flex justify-center">
              <ChessBoard
                board={game.board}
                legalMoves={game.legalMoves}
                selectedSquare={game.selectedSquare}
                selectSquare={game.selectSquare}
              />
            </div>
            <GameSidebar
              capturedPieces={game.capturedPieces}
              moveHistory={game.moveHistory}
              onReset={game.resetBoard}
              turn={game.turn}
            />
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex h-14 items-center gap-3 rounded border border-cyan-200/50 bg-cyan-300 px-7 text-base font-bold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.34)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#07080f]"
          >
            <Swords className="h-5 w-5" aria-hidden="true" />
            Start Game
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}

export default App;
