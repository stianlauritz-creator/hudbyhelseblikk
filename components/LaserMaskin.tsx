"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Candelas eget produktbilde av GentleMAX Pro Plus (frilagt PNG), med en
 * rolig glød bak og en langsom svev. Brukes i heroen på /laser og i
 * teaseren. Ingen bevegelse når brukeren har bedt om redusert bevegelse.
 */
export default function LaserMaskin({
  sizes,
  preload = false,
  className = "",
}: {
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const rolig = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {/* Gløden: gull mot navy, holdt svak så maskinen er motivet */}
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full bg-[#c9a96e]/25 blur-3xl"
      />
      <motion.div
        className="relative h-full w-full"
        animate={rolig ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/laser/gentlemax-pro-plus.png"
          alt="Candela GentleMAX Pro Plus — laseren som kommer til Hud by Helseblikk"
          fill
          sizes={sizes}
          preload={preload}
          className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
        />
      </motion.div>
    </div>
  );
}
