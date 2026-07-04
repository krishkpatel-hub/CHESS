import { motion } from "framer-motion";
import ChessBoard from "./components/ChessBoard.jsx";
import CheckWarning from "./components/CheckWarning.jsx";
import GameOverOverlay from "./components/GameOverOverlay.jsx";
import GameSidebar from "./components/GameSidebar.jsx";
import { useChessGame } from "./game/useChessGame.js";

function App() {
  const game = useChessGame();

  return (
    <main className="min-h-screen overflow-hidden bg-[#11110f] text-[#f4efe4]">
      <section className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(194,168,112,0.14),transparent_34%),linear-gradient(180deg,#181816_0%,#0c0d0b_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(244,239,228,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,228,0.18)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-7xl flex-col items-center text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#bda66e]">
            Strategy Table
          </p>

          <h1 className="max-w-full text-5xl font-semibold leading-none tracking-normal text-[#f4efe4] sm:text-6xl md:text-7xl">
            NeoChess
          </h1>

          <CheckWarning inCheck={game.gameStatus.inCheck} turn={game.turn} />

          <div className="mt-8 grid w-full items-start gap-5 lg:grid-cols-[minmax(0,640px)_340px] lg:justify-center xl:gap-8">
            <div className="flex justify-center">
              <ChessBoard
                board={game.board}
                checkedKingSquare={game.gameStatus.checkedKingSquare}
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
        </motion.div>
      </section>
      <GameOverOverlay status={game.gameStatus} onReset={game.resetBoard} />
    </main>
  );
}

export default App;
