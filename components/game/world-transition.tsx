"use client"

import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"
import { WORLDS } from "@/lib/constants/worlds"

interface WorldTransitionProps {
  world: number
}

export function WorldTransition({ world }: WorldTransitionProps) {
  const { language } = useGameStore()

  const worldData = WORLDS[world - 1]

  const texts = {
    en: {
      entering: "Entering",
      world: "World",
    },
    vi: {
      entering: "Đang Vào",
      world: "Thế Giới",
    },
  }

  const t = texts[language]

  if (!worldData) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white"
      >
        <motion.div initial={{ y: -50 }} animate={{ y: 0 }} transition={{ delay: 0.2 }} className="text-6xl mb-4">
          {worldData.emoji}
        </motion.div>

        <motion.h2
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold mb-2"
        >
          {t.entering} {t.world} {world}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-cyan-300"
        >
          {worldData.name[language]}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg opacity-80 mt-2"
        >
          {worldData.description[language]}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
