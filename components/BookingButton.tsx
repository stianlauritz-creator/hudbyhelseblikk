"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/site";

interface Props {
  className?: string;
  label?: string;
  href?: string;
}

export default function BookingButton({
  className = "",
  label = "Bestill time",
  href = BOOKING_URL,
}: Props) {
  return (
    <motion.a
      href={href}
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
      className={`inline-flex items-center gap-2 px-8 py-4 bg-[#8f6b28] text-white rounded-full text-sm tracking-wide hover:bg-[#7a5b20] transition-colors duration-200 cursor-pointer ${className}`}
    >
      {label}
    </motion.a>
  );
}
