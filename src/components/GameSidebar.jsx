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
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/10 p-4 text-left shadow-[0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-xl",
        "before:absolute before:inset-0 before:rounded-xl before:bg-[linear-gradient(135deg,rgba(34,211,238,0.2),rgba(168,85,247,0.18),transparent_60%)] before:opacity-80",
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
      <span className="flex h-8 w-8 items-center justify-center rounded border border-cyan-200/30 bg-cyan-300/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.28)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-100">
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
        "flex items-center justify-between rounded border px-3 py-2 transition",
        isActive
          ? "border-cyan-200/70 bg-cyan-300/15 shadow-[0_0_22px_rgba(34,211,238,0.18)]"
          : "border-white/10 bg-slate-950/35",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <span
          className={[
            "h-3 w-3 rounded-full border",
            isWhite ? "border-white bg-slate-50" : "border-fuchsia-200 bg-slate-950",
          ].join(" ")}
        />
        <span className="text-sm font-semibold text-white">
          {isWhite ? "White Player" : "Black Player"}
        </span>
      </div>
      {isActive ? <Crown className="h-4 w-4 text-cyan-100" aria-hidden="true" /> : null}
    </div>
  );
}

function CapturedPieces({ title, pieces }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>
      <div className="min-h-11 rounded border border-white/10 bg-slate-950/35 px-3 py-2">
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
          <span className="text-sm text-slate-500">None</span>
        )}
      </div>
    </div>
  );
}

function GameSidebar({ capturedPieces, moveHistory, onReset, turn }) {
  const capturedWhite = capturedPieces.filter((piece) => piece.color === "white");
  const capturedBlack = capturedPieces.filter((piece) => piece.color === "black");

  return (
    <aside className="grid w-full gap-4 lg:w-[330px] lg:shrink-0">
      <SidebarCard>
        <CardTitle icon={Swords} title="Match Control" />
        <div className="grid gap-2">
          <PlayerLabel color="white" isActive={turn === "white"} />
          <PlayerLabel color="black" isActive={turn === "black"} />
        </div>
      </SidebarCard>

      <SidebarCard className="border-cyan-200/25">
        <CardTitle icon={Trophy} title="Current Turn" />
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-4xl font-black capitalize leading-none text-white">
              {turn}
            </p>
            <p className="mt-2 text-sm text-cyan-100/80">Awaiting command</p>
          </div>
          <div className="rounded border border-cyan-200/30 bg-cyan-300/10 p-3 shadow-[0_0_22px_rgba(34,211,238,0.25)]">
            <Crown className="h-7 w-7 text-cyan-100" aria-hidden="true" />
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
                    className="flex items-center justify-between rounded border border-white/10 bg-slate-950/35 px-3 py-2 text-sm"
                  >
                    <span className="text-slate-400">{index + 1}.</span>
                    <span className="font-semibold capitalize text-white">{move.color}</span>
                    <span className="text-cyan-100">{move.notation}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          ) : (
            <p className="rounded border border-white/10 bg-slate-950/35 px-3 py-4 text-sm text-slate-500">
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
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-fuchsia-300/40 bg-fuchsia-300/12 px-5 text-sm font-bold text-fuchsia-100 shadow-[0_0_24px_rgba(217,70,239,0.2)] transition hover:border-cyan-200/70 hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#07080f]"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset Game
      </motion.button>
    </aside>
  );
}

export default GameSidebar;
