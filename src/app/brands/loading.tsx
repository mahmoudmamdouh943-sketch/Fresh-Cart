"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        className="w-10 h-10 bg-emerald-800 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
    </div>
  );
}
