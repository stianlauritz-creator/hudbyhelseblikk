"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
  label?: string;
}

export default function BookingButton({
  className = "",
  label = "Bestill time",
}: Props) {
  return (
    <motion.a
      href="/kontakt"
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(201, 169, 110, 0.4)",
          "0 0 0 12px rgba(201, 169, 110, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-8 py-4 bg-[#c9a96e] text-white rounded-full text-sm tracking-wide hover:bg-[#b8955a] transition-colors duration-200 cursor-pointer ${className}`}
    >
      {label}
    </motion.a>
  );
}
