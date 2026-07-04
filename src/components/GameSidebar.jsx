import { AnimatePresence, motion } from "framer-motion";
import { Crown, History, RotateCcw, Shield, Swords, Trophy } from "lucide-react";
import ChessPiece from "./ChessPiece.jsx";

function SidebarCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={[
        "relative overflow-hidden rounded-lg border border-[#3a3932] bg-[#181815]/88 p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-md",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[#d8bf7a]/45",
        className,
      ].join(" ")}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function CardTitle({ icon: Icon, title }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#4b473b] bg-[#222119] text-[#cdb77a]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7d0c2]">
        {title}
      </h2>
    </div>
  );
}

function PlayerLabel({ color, isActive }) {
  const isWhite = color === "white";

  return (
    <div
      className={[
        "flex items-center justify-between rounded-md border px-3 py-2 transition",
        isActive
          ? "border-[#bda66e]/70 bg-[#2a261b] shadow-[0_10px_26px_rgba(0,0,0,0.18)]"
          : "border-[#34332e] bg-[#11110f]",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#efe8db]">
          {isWhite ? "White Player" : "Black Player"}
        </span>
      </div>
      {isActive ? <Crown className="h-4 w-4 text-[#d8bf7a]" aria-hidden="true" /> : null}
    </div>
  );
}

function CapturedPieces({ title, pieces }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#918a7b]">
        {title}
      </p>
      <div className="min-h-11 rounded-md border border-[#34332e] bg-[#10100e] px-3 py-2">
        {pieces.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {pieces.map((piece, index) => (
              <motion.div
                key={`${piece.color}-${piece.name}-${index}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-8 w-8"
                aria-label={`captured ${piece.color} ${piece.name}`}
              >
                <ChessPiece piece={piece} size="captured" />
              </motion.div>
            ))}
          </div>
        ) : (
          <span className="text-sm text-[#6f6a5f]">None</span>
        )}
      </div>
    </div>
  );
}

function GameSidebar({ capturedPieces, moveHistory, onReset, turn }) {
  const capturedWhite = capturedPieces.filter((piece) => piece.color === "white");
  const capturedBlack = capturedPieces.filter((piece) => piece.color === "black");

  return (
    <aside className="grid w-full gap-4 sm:grid-cols-2 lg:w-[340px] lg:shrink-0 lg:grid-cols-1">
      <SidebarCard>
        <CardTitle icon={Swords} title="Match Control" />
        <div className="grid gap-2">
          <PlayerLabel color="white" isActive={turn === "white"} />
          <PlayerLabel color="black" isActive={turn === "black"} />
        </div>
      </SidebarCard>

      <SidebarCard className="border-[#5a5038]">
        <CardTitle icon={Trophy} title="Current Turn" />
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-4xl font-semibold capitalize leading-none text-[#f4efe4]">
              {turn}
            </p>
            <p className="mt-2 text-sm text-[#918a7b]">To move</p>
          </div>
          <div className="rounded-md border border-[#5a5038] bg-[#242117] p-3">
            <Crown className="h-7 w-7 text-[#d8bf7a]" aria-hidden="true" />
          </div>
        </div>
      </SidebarCard>

      <SidebarCard>
        <CardTitle icon={History} title="Move History" />
        <div className="max-h-48 overflow-y-auto pr-1">
          {moveHistory.length > 0 ? (
            <ol className="grid gap-2">
              <AnimatePresence initial={false}>
                {moveHistory.map((move, index) => (
                  <motion.li
                    key={`${move.from}-${move.to}-${index}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    className="flex items-center justify-between rounded-md border border-[#34332e] bg-[#10100e] px-3 py-2 text-sm"
                  >
                    <span className="text-[#777164]">{index + 1}.</span>
                    <span className="font-medium capitalize text-[#efe8db]">{move.color}</span>
                    <span className="text-[#cdb77a]">{move.notation}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          ) : (
            <p className="rounded-md border border-[#34332e] bg-[#10100e] px-3 py-4 text-sm text-[#6f6a5f]">
              No moves yet
            </p>
          )}
        </div>
      </SidebarCard>

      <SidebarCard>
        <CardTitle icon={Shield} title="Captured" />
        <div className="grid gap-3">
          <CapturedPieces title="White Lost" pieces={capturedWhite} />
          <CapturedPieces title="Black Lost" pieces={capturedBlack} />
        </div>
      </SidebarCard>

      <motion.button
        type="button"
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#5a5038] bg-[#211f18] px-5 text-sm font-semibold text-[#efe8db] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:border-[#cdb77a] hover:bg-[#29251a] focus:outline-none focus:ring-2 focus:ring-[#cdb77a] focus:ring-offset-2 focus:ring-offset-[#11110f] sm:col-span-2 lg:col-span-1"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset Game
      </motion.button>
    </aside>
  );
}

export default GameSidebar;
