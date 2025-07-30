"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { GameCanvas } from "@/components/game/game-canvas"
import { GameHUD } from "@/components/game/game-hud"
import { GameOverModal } from "@/components/game/game-over-modal"
import { PauseModal } from "@/components/game/pause-modal"
import { WorldTransition } from "@/components/game/world-transition"
import { useGameStore } from "@/lib/store/game-store"
import { Button } from "@/components/ui/button"
import { Pause, Home } from "lucide-react"

export default function GamePage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showTransition, setShowTransition] = useState(false)
  const [transitionWorld, setTransitionWorld] = useState(1)

  const { gameState, score, currentWorld, lives, powerUps, pauseGame, resumeGame, resetGame, darkMode, language } =
    useGameStore()

  useEffect(() => {
    // Initialize game when component mounts
    resetGame()
  }, [resetGame])

  useEffect(() => {
    // Handle world transitions
    if (score > 0 && score % 25 === 0 && score !== transitionWorld * 25) {
      const newWorld = Math.floor(score / 25) + 1
      if (newWorld <= 10 && newWorld !== currentWorld) {
        setTransitionWorld(newWorld)
        setShowTransition(true)
        setTimeout(() => {
          setShowTransition(false)
        }, 3000)
      }
    }
  }, [score, currentWorld, transitionWorld])

  const handlePause = () => {
    if (gameState === "playing") {
      pauseGame()
    } else if (gameState === "paused") {
      resumeGame()
    }
  }

  const handleHome = () => {
    router.push("/")
  }

  const texts = {
    en: {
      pause: "Pause",
      home: "Home",
    },
    vi: {
      pause: "Tạm Dừng",
      home: "Trang Chủ",
    },
  }

  const t = texts[language]

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? "bg-gray-900" : "bg-blue-900"}`}>
      {/* Game Controls */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <Button variant="ghost" size="icon" onClick={handlePause} className="text-white hover:bg-white/20">
          <Pause size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleHome} className="text-white hover:bg-white/20">
          <Home size={20} />
        </Button>
      </div>

      {/* Game HUD */}
      <GameHUD />

      {/* Game Canvas */}
      <GameCanvas ref={canvasRef} />

      {/* Modals */}
      {gameState === "gameOver" && <GameOverModal />}
      {gameState === "paused" && <PauseModal />}
      {showTransition && <WorldTransition world={transitionWorld} />}

      {/* Mobile Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 md:hidden">
        <div className="flex gap-4">
          <Button
            className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl"
            onTouchStart={(e) => {
              e.preventDefault()
              // Trigger fly action
              window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }))
            }}
          >
            ↑
          </Button>
          <Button
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xl"
            onTouchStart={(e) => {
              e.preventDefault()
              // Trigger shoot action
              window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyE" }))
            }}
          >
            🔫
          </Button>
        </div>
      </div>
    </div>
  )
}
