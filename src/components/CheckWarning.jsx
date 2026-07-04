import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

function CheckWarning({ inCheck, turn }) {
  return (
    <AnimatePresence>
      {inCheck ? (
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.96 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative mt-6 w-full max-w-3xl overflow-hidden rounded-xl border border-red-300/45 bg-red-500/12 px-5 py-3 text-left shadow-[0_0_34px_rgba(248,113,113,0.28)] backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(248,113,113,0.22),transparent)]" />
          <div className="relative flex items-center justify-center gap-3 text-red-100">
            <AlertTriangle className="h-5 w-5 text-red-200 drop-shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
            <p className="text-sm font-black uppercase tracking-[0.24em]">
              {turn} king under attack
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default CheckWarning;
