"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"

export function GlitchWorldEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentWorld } = useGameStore()

  useEffect(() => {
    if (currentWorld !== 11) return // Only show in glitch world

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Glitch particles
    const glitchParticles: Array<{
      x: number
      y: number
      width: number
      height: number
      color: string
      vx: number
      vy: number
      life: number
    }> = []

    // Initialize glitch particles
    for (let i = 0; i < 50; i++) {
      glitchParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 20 + 5,
        height: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: Math.random() * 100 + 50,
      })
    }

    const animate = () => {
      // Clear with random glitch effect
      if (Math.random() < 0.1) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw glitch particles
      glitchParticles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Random glitch behavior
        if (Math.random() < 0.05) {
          particle.vx = (Math.random() - 0.5) * 20
          particle.vy = (Math.random() - 0.5) * 20
          particle.color = `hsl(${Math.random() * 360}, 100%, 50%)`
        }

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.fillRect(particle.x, particle.y, particle.width, particle.height)

        // Respawn if dead
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = Math.random() * 100 + 50
        }
      })

      // Random screen tears
      if (Math.random() < 0.02) {
        const tearY = Math.random() * canvas.height
        const tearHeight = Math.random() * 50 + 10
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`
        ctx.fillRect(0, tearY, canvas.width, tearHeight)
      }

      // Color inversion effect
      if (Math.random() < 0.01) {
        ctx.globalCompositeOperation = "difference"
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = "source-over"
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentWorld])

  if (currentWorld !== 11) return null

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Glitch Text Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        animate={{
          opacity: [0, 1, 0, 1, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <div className="text-6xl font-bold text-white mix-blend-difference">R̴̢̛̭̈E̵̺̿A̷̰̾L̶̰̈I̸̱̿T̶̰̾Y̵̱̿.̶̰̈E̵̺̿X̶̰̾E̵̺̿ ̶̰̈H̵̱̿A̷̰̾S̶̰̾ ̶̰̈S̶̰̾T̶̰̾O̵̺̿P̶̰̾P̶̰̾E̵̺̿D̶̰̾</div>
      </motion.div>

      {/* Reality Tears */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "2px",
            height: `${Math.random() * 200 + 100}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        />
      ))}
    </>
  )
}
