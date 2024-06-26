"use client";

import { motion } from "framer-motion";

// this template mainly just handles the page transition with framer motion

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}