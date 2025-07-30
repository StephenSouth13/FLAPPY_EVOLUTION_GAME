"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import { useRouter } from "next/navigation"
import { RotateCcw, Home, Store } from "lucide-react"

export function GameOverModal() {
  const router = useRouter()
  const { score, highScore, resetGame, startGame, language, currentWorld } = useGameStore()

  const texts = {
    en: {
      gameOver: "GAME OVER",
      score: "Score",
      highScore: "High Score",
      newRecord: "NEW RECORD!",
      playAgain: "Play Again",
      home: "Home",
      store: "Store",
      worldReached: "World Reached",
    },
    vi: {
      gameOver: "GAME OVER",
      score: "Điểm",
      highScore: "Điểm Cao Nhất",
      newRecord: "KỶ LỤC MỚI!",
      playAgain: "Chơi Lại",
      home: "Trang Chủ",
      store: "Cửa Hàng",
      worldReached: "Thế Giới Đạt Được",
    },
  }

  const t = texts[language]
  const isNewRecord = score > highScore

  const handlePlayAgain = () => {
    resetGame()
    startGame()
  }

  const handleHome = () => {
    router.push("/")
  }

  const handleStore = () => {
    router.push("/store")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white text-center max-w-md mx-4"
      >
        <h2 className="text-4xl font-bold mb-4 text-red-400">{t.gameOver}</h2>

        {isNewRecord && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-yellow-400 font-bold text-lg mb-4"
          >
            🎉 {t.newRecord} 🎉
          </motion.div>
        )}

        <div className="space-y-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm opacity-80">{t.score}</div>
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/10 rounded-lg p-4 flex-1">
              <div className="text-sm opacity-80">{t.highScore}</div>
              <div className="text-xl font-bold">{highScore}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 flex-1">
              <div className="text-sm opacity-80">{t.worldReached}</div>
              <div className="text-xl font-bold">{currentWorld}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handlePlayAgain}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3"
          >
            <RotateCcw className="mr-2" size={20} />
            {t.playAgain}
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={handleHome}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <Home className="mr-2" size={16} />
              {t.home}
            </Button>
            <Button
              onClick={handleStore}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <Store className="mr-2" size={16} />
              {t.store}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
