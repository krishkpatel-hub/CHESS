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
          className="relative mt-5 w-full max-w-3xl overflow-hidden rounded-lg border border-[#9d4d3f]/60 bg-[#261815]/92 px-5 py-3 text-left shadow-[0_16px_42px_rgba(0,0,0,0.24)] backdrop-blur-md"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[#d88978]/60" />
          <div className="relative flex items-center justify-center gap-3 text-[#f0d4c9]">
            <AlertTriangle className="h-5 w-5 text-[#d88978]" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              {turn} king under attack
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default CheckWarning;
