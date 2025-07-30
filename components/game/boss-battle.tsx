"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"
import { BOSSES } from "@/lib/constants/worlds"

interface BossBattleProps {
  bossId: string
  onDefeat: () => void
  onPlayerDefeat: () => void
}

export function BossBattle({ bossId, onDefeat, onPlayerDefeat }: BossBattleProps) {
  const { language } = useGameStore()
  const boss = BOSSES.find((b) => b.id === bossId)

  const [currentPhase, setCurrentPhase] = useState(0)
  const [bossHealth, setBossHealth] = useState(boss?.health || 300)
  const [showDialogue, setShowDialogue] = useState(true)
  const [currentDialogue, setCurrentDialogue] = useState("")
  const [bossPosition, setBossPosition] = useState({ x: 400, y: 200 })
  const [attackPattern, setAttackPattern] = useState("idle")

  useEffect(() => {
    if (!boss) return

    // Show initial dialogue
    const phase = boss.phases[currentPhase]
    setCurrentDialogue(phase.dialogue[language])

    // Hide dialogue after 3 seconds
    const timer = setTimeout(() => {
      setShowDialogue(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [boss, currentPhase, language])

  useEffect(() => {
    if (!boss) return

    // Boss AI behavior
    const behaviorInterval = setInterval(() => {
      const phase = boss.phases[currentPhase]

      // Update boss position based on pattern
      switch (phase.pattern) {
        case "circle_strafe":
          setBossPosition((prev) => ({
            x: 400 + Math.cos(Date.now() * 0.002) * 150,
            y: 200 + Math.sin(Date.now() * 0.002) * 100,
          }))
          break
        case "dive_bomb":
          setBossPosition((prev) => ({
            x: Math.random() * 600 + 100,
            y: Math.random() * 400 + 100,
          }))
          break
        case "teleport_strike":
          if (Math.random() < 0.3) {
            setBossPosition({
              x: Math.random() * 600 + 100,
              y: Math.random() * 400 + 100,
            })
          }
          break
      }

      // Trigger attacks
      setAttackPattern(phase.attacks[Math.floor(Math.random() * phase.attacks.length)])
    }, 2000)

    return () => clearInterval(behaviorInterval)
  }, [boss, currentPhase])

  const handleBossDamage = (damage: number) => {
    const newHealth = Math.max(0, bossHealth - damage)
    setBossHealth(newHealth)

    if (newHealth <= 0) {
      // Boss defeated
      setCurrentDialogue(boss?.defeatDialogue[language] || "")
      setShowDialogue(true)
      setTimeout(() => {
        onDefeat()
      }, 2000)
    } else if (boss && newHealth <= (boss.health * (2 - currentPhase)) / 3 && currentPhase < boss.phases.length - 1) {
      // Phase transition
      const nextPhase = currentPhase + 1
      setCurrentPhase(nextPhase)
      setCurrentDialogue(boss.phases[nextPhase].dialogue[language])
      setShowDialogue(true)
      setTimeout(() => setShowDialogue(false), 3000)
    }
  }

  if (!boss) return null

  const currentPhaseData = boss.phases[currentPhase]
  const healthPercentage = (bossHealth / boss.health) * 100

  return (
    <div className="absolute inset-0 z-30">
      {/* Boss Health Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-96 z-40">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-red-500/50">
          <div className="text-center text-white font-bold mb-2">
            {boss.name[language]} - Phase {currentPhase + 1}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-400"
              initial={{ width: "100%" }}
              animate={{ width: `${healthPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-center text-sm text-gray-300 mt-1">
            {bossHealth} / {boss.health} HP
          </div>
        </div>
      </div>

      {/* Boss Entity */}
      <motion.div
        className="absolute w-24 h-24 flex items-center justify-center text-6xl z-35"
        animate={{
          x: bossPosition.x,
          y: bossPosition.y,
          scale: currentPhase === 2 ? [1, 1.2, 1] : 1,
          rotate: attackPattern === "ice_fire_spiral" ? 360 : 0,
        }}
        transition={{
          duration: 1,
          repeat: attackPattern === "ice_fire_spiral" ? Number.POSITIVE_INFINITY : 0,
        }}
        style={{
          filter: `drop-shadow(0 0 20px ${boss.color})`,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {boss.emoji}
        </motion.div>

        {/* Boss Attacks Visual Effects */}
        <AnimatePresence>
          {attackPattern === "ice_breath" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 2 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-50" />
            </motion.div>
          )}
          {attackPattern === "fire_breath" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 2 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dialogue Box */}
      <AnimatePresence>
        {showDialogue && currentDialogue && (
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-6 border border-white/20 max-w-md">
              <div className="text-white text-lg font-semibold text-center">{currentDialogue}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase Indicator */}
      <div className="absolute top-20 right-4 z-40">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-purple-500/50">
          <div className="text-purple-300 font-bold text-sm">PHASE</div>
          <div className="text-white text-2xl font-bold text-center">
            {currentPhase + 1}/{boss.phases.length}
          </div>
        </div>
      </div>

      {/* Attack Warning */}
      <AnimatePresence>
        {attackPattern !== "idle" && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-red-300 font-bold text-center">
                ⚠️ {attackPattern.toUpperCase().replace("_", " ")} ⚠️
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
