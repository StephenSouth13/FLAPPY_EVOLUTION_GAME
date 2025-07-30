"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"
import { GAME_QUOTES, AI_ENCOURAGEMENT } from "@/lib/constants/quotes"

export function QuoteDisplay() {
  const { language, gameState, lives, score } = useGameStore()
  const [currentQuote, setCurrentQuote] = useState<(typeof GAME_QUOTES)[0] | null>(null)
  const [showQuote, setShowQuote] = useState(false)
  const [deathCount, setDeathCount] = useState(0)
  const [lastScore, setLastScore] = useState(0)

  useEffect(() => {
    // Track deaths for AI encouragement
    if (gameState === "gameOver") {
      setDeathCount((prev) => prev + 1)
    }
  }, [gameState])

  useEffect(() => {
    // Show quotes periodically during gameplay
    if (gameState === "playing") {
      const quoteInterval = setInterval(() => {
        // Determine quote type based on game state
        let selectedQuote

        if (deathCount >= 5 && Math.random() < 0.7) {
          // Show encouragement for struggling players
          const encouragement = AI_ENCOURAGEMENT.find((e) => e.trigger === "multiple_deaths")
          if (encouragement) {
            const message = encouragement.messages[Math.floor(Math.random() * encouragement.messages.length)]
            selectedQuote = {
              text: message,
              author: "AI Companion",
              duration: 4000,
            }
          }
        } else if (score > lastScore + 50 && Math.random() < 0.5) {
          // Show victory encouragement for good performance
          const encouragement = AI_ENCOURAGEMENT.find((e) => e.trigger === "near_victory")
          if (encouragement) {
            const message = encouragement.messages[Math.floor(Math.random() * encouragement.messages.length)]
            selectedQuote = {
              text: message,
              author: "AI Companion",
              duration: 4000,
            }
          }
        } else {
          // Show random inspirational quote
          selectedQuote = GAME_QUOTES[Math.floor(Math.random() * GAME_QUOTES.length)]
        }

        if (selectedQuote) {
          setCurrentQuote(selectedQuote)
          setShowQuote(true)
          setLastScore(score)

          setTimeout(() => {
            setShowQuote(false)
          }, selectedQuote.duration)
        }
      }, 15000) // Show quote every 15 seconds

      return () => clearInterval(quoteInterval)
    }
  }, [gameState, deathCount, score, lastScore])

  return (
    <AnimatePresence>
      {showQuote && currentQuote && gameState === "playing" && (
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30 max-w-md"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-white text-lg font-medium mb-3 leading-relaxed">"{currentQuote.text[language]}"</div>
              <div className="text-cyan-300 text-sm font-semibold">— {currentQuote.author}</div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60" />
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full opacity-60" />

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-yellow-400 to-pink-400 opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
