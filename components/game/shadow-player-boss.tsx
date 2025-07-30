"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"
import { BOSS_DIALOGUES } from "@/lib/constants/story"

interface ShadowPlayerBossProps {
  onDefeat: () => void
  onPlayerDefeat: () => void
}

export function ShadowPlayerBoss({ onDefeat, onPlayerDefeat }: ShadowPlayerBossProps) {
  const { language, playerPatterns, selectedSkin } = useGameStore()
  const [shadowHealth, setShadowHealth] = useState(200)
  const [shadowPosition, setShadowPosition] = useState({ x: 600, y: 300 })
  const [isAttacking, setIsAttacking] = useState(false)
  const [currentDialogue, setCurrentDialogue] = useState("")
  const [showDialogue, setShowDialogue] = useState(true)

  useEffect(() => {
    // Show intro dialogue
    setCurrentDialogue(BOSS_DIALOGUES.shadow_player.intro[language])

    const timer = setTimeout(() => {
      setShowDialogue(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [language])

  useEffect(() => {
    // Shadow AI behavior based on learned player patterns
    const behaviorInterval = setInterval(() => {
      // Mimic player's average height preference
      const targetY = window.innerHeight * playerPatterns.averageHeight + (Math.random() - 0.5) * 100

      // Mimic player's movement frequency
      const shouldMove = Math.random() < playerPatterns.movementFrequency / 100

      if (shouldMove) {
        setShadowPosition((prev) => ({
          x: Math.max(400, Math.min(800, prev.x + (Math.random() - 0.5) * 200)),
          y: Math.max(50, Math.min(window.innerHeight - 50, targetY)),
        }))
      }

      // Shadow attacks based on player's shooting accuracy
      if (Math.random() < playerPatterns.shootingAccuracy / 100) {
        setIsAttacking(true)
        setTimeout(() => setIsAttacking(false), 500)
      }

      // Taunt occasionally
      if (Math.random() < 0.1) {
        setCurrentDialogue(BOSS_DIALOGUES.shadow_player.taunt[language])
        setShowDialogue(true)
        setTimeout(() => setShowDialogue(false), 2000)
      }
    }, 1000)

    return () => clearInterval(behaviorInterval)
  }, [playerPatterns, language])

  const handleDamage = (damage: number) => {
    const newHealth = Math.max(0, shadowHealth - damage)
    setShadowHealth(newHealth)

    if (newHealth <= 0) {
      setCurrentDialogue(BOSS_DIALOGUES.shadow_player.defeat[language])
      setShowDialogue(true)
      setTimeout(() => {
        onDefeat()
      }, 2000)
    }
  }

  const healthPercentage = (shadowHealth / 200) * 100

  return (
    <div className="absolute inset-0 z-30">
      {/* Shadow Health Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-96 z-40">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-500/50">
          <div className="text-center text-white font-bold mb-2">Shadow Self - Mirror of Your Soul</div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-600 to-gray-400"
              initial={{ width: "100%" }}
              animate={{ width: `${healthPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-center text-sm text-gray-300 mt-1">{shadowHealth} / 200 HP</div>
        </div>
      </div>

      {/* Shadow Player Entity */}
      <motion.div
        className="absolute w-16 h-16 flex items-center justify-center text-4xl z-35"
        animate={{
          x: shadowPosition.x,
          y: shadowPosition.y,
          scale: isAttacking ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          filter: `drop-shadow(0 0 20px #666666) invert(1) sepia(1) saturate(0)`,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          🚀
        </motion.div>

        {/* Shadow Attack Effects */}
        {isAttacking && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-gray-500 to-gray-300 rounded-full opacity-50" />
          </motion.div>
        )}

        {/* Mirror Effect Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Dialogue Box */}
      {showDialogue && currentDialogue && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-6 border border-gray-500/30 max-w-md">
            <div className="text-gray-300 text-lg font-semibold text-center">{currentDialogue}</div>
          </div>
        </motion.div>
      )}

      {/* Player Pattern Display */}
      <div className="absolute top-20 right-4 z-40">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-gray-500/50">
          <div className="text-gray-300 font-bold text-sm mb-2">LEARNED PATTERNS</div>
          <div className="text-xs text-gray-400 space-y-1">
            <div>Height: {Math.round(playerPatterns.averageHeight * 100)}%</div>
            <div>Movement: {Math.round(playerPatterns.movementFrequency)}%</div>
            <div>Accuracy: {Math.round(playerPatterns.shootingAccuracy)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
