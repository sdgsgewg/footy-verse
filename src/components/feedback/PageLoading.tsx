"use client";

import { motion } from "framer-motion";
import { FaFutbol } from "react-icons/fa6";

interface PageLoadingProps {
  message?: string;
}

const TRACK_WIDTH = 288;
const BALL_SIZE = 28;
const TRACK_PADDING = 8;

export default function PageLoading({
  message = "Loading...",
}: PageLoadingProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Football Track */}
        <div className="relative h-10" style={{ width: TRACK_WIDTH }}>
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-border" />

          {/* Center line */}
          <div className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-border" />

          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background" />

          {/* Ball */}
          <motion.div
            className="absolute top-1/2 z-10 -translate-y-1/2"
            // animasi bergerak dari kiri ke kanan
            // animate={{
            //   x: [TRACK_PADDING, TRACK_WIDTH - BALL_SIZE - TRACK_PADDING],
            //   y: [0, -8],
            //   rotate: [0, 360],
            //   scale: [1, 1.05],
            // }}
            // transition={{
            //   duration: 2.2,
            //   repeat: Infinity,
            //   repeatType: "mirror",
            //   ease: "easeInOut",
            // }}

            // animasi berbentuk busur kecil (naik sekali lalu turun sekali)
            animate={{
              x: [
                TRACK_PADDING,
                TRACK_WIDTH / 2 - BALL_SIZE / 2,
                TRACK_WIDTH - BALL_SIZE - TRACK_PADDING,
              ],
              y: [0, -10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <FaFutbol className="size-7 text-primary drop-shadow-md" />
          </motion.div>
        </div>

        <motion.p
          className="text-sm font-medium text-muted-foreground"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
