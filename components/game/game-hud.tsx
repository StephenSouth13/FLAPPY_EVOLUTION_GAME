"use client"

import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"
import { WORLDS } from "@/lib/constants/worlds"
import { Shield, Zap, Clock, Bomb } from "lucide-react"

export function GameHUD() {
  const { score, lives, currentWorld, powerUps, language, darkMode } = useGameStore()

  const world = WORLDS[currentWorld - 1]

  const texts = {
    en: {
      score: "Score",
      lives: "Lives",
      world: "World",
    },
    vi: {
      score: "Điểm",
      lives: "Mạng",
      world: "Thế Giới",
    },
  }

  const t = texts[language]

  const getPowerUpIcon = (type: string) => {
    switch (type) {
      case "shield":
        return <Shield size={16} />
      case "autoFire":
        return <Zap size={16} />
      case "slowMotion":
        return <Clock size={16} />
      case "bomb":
        return <Bomb size={16} />
      default:
        return null
    }
  }

  return (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      {/* Score */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white"
      >
        <div className="text-sm opacity-80">{t.score}</div>
        <div className="text-2xl font-bold text-yellow-400">{score}</div>
      </motion.div>

      {/* Lives */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white"
      >
        <div className="text-sm opacity-80">{t.lives}</div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < lives ? "bg-red-500" : "bg-gray-600"}`} />
          ))}
        </div>
      </motion.div>

      {/* Current World */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white"
      >
        <div className="text-sm opacity-80">
          {t.world} {currentWorld}
        </div>
        <div className="text-sm font-semibold">{world?.name[language]}</div>
      </motion.div>

      {/* Active Power-ups */}
      {powerUps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white space-y-1"
        >
          {powerUps.map((powerUp, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {getPowerUpIcon(powerUp.type)}
              <span>{Math.ceil(powerUp.duration / 1000)}s</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
