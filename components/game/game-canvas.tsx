"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { useGameStore } from "@/lib/store/game-store"
import { GameEngine } from "@/lib/game/game-engine"

interface GameCanvasProps {
  className?: string
}

export const GameCanvas = forwardRef<HTMLCanvasElement, GameCanvasProps>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameEngineRef = useRef<GameEngine | null>(null)
  const animationFrameRef = useRef<number>()

  const { gameState, resetGame } = useGameStore()

  useImperativeHandle(ref, () => canvasRef.current!, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize game engine with enhanced features
    gameEngineRef.current = new GameEngine(canvas, ctx)

    // Enhanced game loop with sound effects
    const gameLoop = () => {
      if (gameEngineRef.current && gameState === "playing") {
        gameEngineRef.current.update()
        gameEngineRef.current.render()

        // Play background music based on current world
        if (typeof window !== "undefined" && "Audio" in window) {
          // Add ambient sound effects here
        }
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState])

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} style={{ touchAction: "none" }} />
})

GameCanvas.displayName = "GameCanvas"
