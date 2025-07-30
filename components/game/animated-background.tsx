"use client"

import { useEffect, useRef } from "react"
import { useGameStore } from "@/lib/store/game-store"
import { WORLDS } from "@/lib/constants/worlds"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentWorld, darkMode } = useGameStore()

  const world = WORLDS[currentWorld - 1]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particle system for background effects
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      type: string
    }> = []

    // Initialize particles based on world
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: world?.secondaryColor || "#ffffff",
        type: world?.specialEffects?.[0] || "default",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw world-specific background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, world?.backgroundColor || "#1e40af")
      gradient.addColorStop(1, world?.secondaryColor || "#3b82f6")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle based on type
        ctx.save()
        ctx.globalAlpha = 0.6
        ctx.fillStyle = particle.color

        switch (particle.type) {
          case "snow":
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case "volcano_ash":
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size * 2)
            break
          case "dust_storm":
            ctx.fillRect(particle.x, particle.y, particle.size * 3, particle.size)
            break
          case "neon_glow":
            ctx.shadowBlur = 10
            ctx.shadowColor = particle.color
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case "star_field":
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            // Add twinkling effect
            if (Math.random() < 0.1) {
              ctx.shadowBlur = 5
              ctx.shadowColor = "#ffffff"
              ctx.fill()
            }
            break
          default:
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentWorld, world])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}
