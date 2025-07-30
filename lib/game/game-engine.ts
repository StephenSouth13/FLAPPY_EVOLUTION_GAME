"use client"

import { useGameStore } from "@/lib/store/game-store"
import { WORLDS } from "@/lib/constants/worlds"
import { SKINS } from "@/lib/constants/skins"

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  vx?: number
  vy?: number
}

interface Player extends GameObject {
  vy: number
  rotation: number
}

interface Enemy extends GameObject {
  vx: number
  type: "ufo" | "bird" | "troll"
}

interface Bullet extends GameObject {
  vx: number
}

interface PowerUpItem extends GameObject {
  type: "shield" | "autoFire" | "slowMotion" | "bomb"
  vx: number
}

interface Obstacle extends GameObject {
  vx: number
}

export class GameEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private player: Player
  private enemies: Enemy[] = []
  private bullets: Bullet[] = []
  private powerUpItems: PowerUpItem[] = []
  private obstacles: Obstacle[] = []
  private keys: Set<string> = new Set()
  private lastTime = 0
  private enemySpawnTimer = 0
  private powerUpSpawnTimer = 0
  private obstacleSpawnTimer = 0
  private autoFireTimer = 0

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx

    // Initialize player
    this.player = {
      x: 100,
      y: canvas.height / 2,
      width: 40,
      height: 40,
      vy: 0,
      rotation: 0,
    }

    this.setupEventListeners()
  }

  private setupEventListeners() {
    // Keyboard events
    window.addEventListener("keydown", (e) => {
      this.keys.add(e.code)
      if (e.code === "Space") {
        e.preventDefault()
        this.jump()
      }
      if (e.code === "KeyE") {
        e.preventDefault()
        this.shoot()
      }
    })

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.code)
    })

    // Mouse/touch events
    this.canvas.addEventListener("click", (e) => {
      e.preventDefault()
      this.jump()
    })

    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault()
      this.jump()
    })
  }

  private jump() {
    const gameState = useGameStore.getState().gameState
    if (gameState !== "playing") return

    this.player.vy = -12
    this.player.rotation = -0.3
  }

  private shoot() {
    const gameState = useGameStore.getState().gameState
    if (gameState !== "playing") return

    this.bullets.push({
      x: this.player.x + this.player.width,
      y: this.player.y + this.player.height / 2,
      width: 10,
      height: 4,
      vx: 8,
    })
  }

  update() {
    const currentTime = Date.now()
    const deltaTime = currentTime - this.lastTime
    this.lastTime = currentTime

    const gameStore = useGameStore.getState()
    const world = WORLDS[gameStore.currentWorld - 1]
    const speedMultiplier = world?.speed || 1

    // Update power-ups
    gameStore.updatePowerUps()
    const activePowerUps = gameStore.powerUps
    const hasSlowMotion = activePowerUps.some((p) => p.type === "slowMotion")
    const hasAutoFire = activePowerUps.some((p) => p.type === "autoFire")
    const timeMultiplier = hasSlowMotion ? 0.5 : 1

    // Update player
    this.player.vy += 0.8 * timeMultiplier // gravity
    this.player.y += this.player.vy * timeMultiplier
    this.player.rotation = Math.min(this.player.rotation + 0.05, 0.5)

    // Keep player in bounds
    if (this.player.y < 0) {
      this.player.y = 0
      this.player.vy = 0
    }
    if (this.player.y + this.player.height > this.canvas.height) {
      gameStore.loseLife()
      this.resetPlayerPosition()
    }

    // Auto fire
    if (hasAutoFire) {
      this.autoFireTimer += deltaTime
      if (this.autoFireTimer > 200) {
        this.shoot()
        this.autoFireTimer = 0
      }
    }

    // Spawn enemies
    this.enemySpawnTimer += deltaTime * timeMultiplier
    if (this.enemySpawnTimer > 2000 / speedMultiplier) {
      this.spawnEnemy()
      this.enemySpawnTimer = 0
    }

    // Spawn power-ups
    this.powerUpSpawnTimer += deltaTime * timeMultiplier
    if (this.powerUpSpawnTimer > 8000) {
      this.spawnPowerUp()
      this.powerUpSpawnTimer = 0
    }

    // Spawn obstacles
    this.obstacleSpawnTimer += deltaTime * timeMultiplier
    if (this.obstacleSpawnTimer > 3000 / speedMultiplier) {
      this.spawnObstacle()
      this.obstacleSpawnTimer = 0
    }

    // Update bullets
    this.bullets = this.bullets.filter((bullet) => {
      bullet.x += bullet.vx * timeMultiplier
      return bullet.x < this.canvas.width + 50
    })

    // Update enemies
    this.enemies = this.enemies.filter((enemy) => {
      enemy.x -= 3 * speedMultiplier * timeMultiplier
      return enemy.x > -enemy.width
    })

    // Update power-up items
    this.powerUpItems = this.powerUpItems.filter((item) => {
      item.x -= 2 * speedMultiplier * timeMultiplier
      return item.x > -item.width
    })

    // Update obstacles
    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.x -= 4 * speedMultiplier * timeMultiplier
      return obstacle.x > -obstacle.width
    })

    // Check collisions
    this.checkCollisions()
  }

  private spawnEnemy() {
    const types: Enemy["type"][] = ["ufo", "bird", "troll"]
    const type = types[Math.floor(Math.random() * types.length)]

    this.enemies.push({
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height - 100) + 50,
      width: 40,
      height: 40,
      vx: 3,
      type,
    })
  }

  private spawnPowerUp() {
    const types: PowerUpItem["type"][] = ["shield", "autoFire", "slowMotion", "bomb"]
    const type = types[Math.floor(Math.random() * types.length)]

    this.powerUpItems.push({
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height - 100) + 50,
      width: 30,
      height: 30,
      vx: 2,
      type,
    })
  }

  private spawnObstacle() {
    this.obstacles.push({
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height - 200) + 100,
      width: 20,
      height: 100,
      vx: 4,
    })
  }

  private checkCollisions() {
    const gameStore = useGameStore.getState()
    const hasShield = gameStore.powerUps.some((p) => p.type === "shield")

    // Bullet vs Enemy collisions
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i]
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j]
        if (this.isColliding(bullet, enemy)) {
          this.bullets.splice(i, 1)
          this.enemies.splice(j, 1)
          gameStore.addScore(10)
          break
        }
      }
    }

    // Player vs Enemy collisions
    if (!hasShield) {
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const enemy = this.enemies[i]
        if (this.isColliding(this.player, enemy)) {
          this.enemies.splice(i, 1)
          gameStore.loseLife()
          this.resetPlayerPosition()
          break
        }
      }
    }

    // Player vs Obstacle collisions
    if (!hasShield) {
      for (const obstacle of this.obstacles) {
        if (this.isColliding(this.player, obstacle)) {
          gameStore.loseLife()
          this.resetPlayerPosition()
          break
        }
      }
    }

    // Player vs PowerUp collisions
    for (let i = this.powerUpItems.length - 1; i >= 0; i--) {
      const powerUp = this.powerUpItems[i]
      if (this.isColliding(this.player, powerUp)) {
        this.powerUpItems.splice(i, 1)
        this.activatePowerUp(powerUp.type)
      }
    }
  }

  private activatePowerUp(type: PowerUpItem["type"]) {
    const gameStore = useGameStore.getState()
    const now = Date.now()

    switch (type) {
      case "shield":
        gameStore.addPowerUp({ type, duration: 5000, startTime: now })
        break
      case "autoFire":
        gameStore.addPowerUp({ type, duration: 10000, startTime: now })
        break
      case "slowMotion":
        gameStore.addPowerUp({ type, duration: 4000, startTime: now })
        break
      case "bomb":
        this.enemies = []
        gameStore.addScore(this.enemies.length * 5)
        break
    }
  }

  private isColliding(obj1: GameObject, obj2: GameObject): boolean {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }

  private resetPlayerPosition() {
    this.player.y = this.canvas.height / 2
    this.player.vy = 0
    this.player.rotation = 0
  }

  render() {
    const gameStore = useGameStore.getState()
    const world = WORLDS[gameStore.currentWorld - 1]
    const selectedSkin = SKINS.find((s) => s.id === gameStore.selectedSkin)

    // Clear canvas
    this.ctx.fillStyle = world?.backgroundColor || "#1e40af"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw stars background
    this.ctx.fillStyle = "white"
    for (let i = 0; i < 50; i++) {
      const x = (i * 137.5) % this.canvas.width
      const y = (i * 73.3) % this.canvas.height
      this.ctx.fillRect(x, y, 2, 2)
    }

    // Draw obstacles
    this.ctx.fillStyle = "#8b4513"
    this.ctx.strokeStyle = "#654321"
    this.ctx.lineWidth = 3
    for (const obstacle of this.obstacles) {
      // Draw obstacle with better graphics
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      this.ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)

      // Add texture lines
      this.ctx.strokeStyle = "#a0522d"
      this.ctx.lineWidth = 1
      for (let i = 0; i < obstacle.height; i += 10) {
        this.ctx.beginPath()
        this.ctx.moveTo(obstacle.x, obstacle.y + i)
        this.ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + i)
        this.ctx.stroke()
      }
    }

    // Draw enemies
    for (const enemy of this.enemies) {
      this.ctx.fillStyle = world?.enemyColor || "#dc2626"
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)

      // Draw enemy emoji
      this.ctx.font = "24px Arial"
      this.ctx.fillStyle = "white"
      const emoji = enemy.type === "ufo" ? "🛸" : enemy.type === "bird" ? "🐦" : "👹"
      this.ctx.fillText(emoji, enemy.x + 8, enemy.y + 28)
    }

    // Draw power-up items with bubble effects
    for (const powerUp of this.powerUpItems) {
      // Draw bubble background
      this.ctx.save()
      this.ctx.globalAlpha = 0.7

      // Outer bubble
      this.ctx.fillStyle = "#ffffff"
      this.ctx.beginPath()
      this.ctx.arc(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, powerUp.width / 2 + 8, 0, Math.PI * 2)
      this.ctx.fill()

      // Inner bubble with gradient
      const gradient = this.ctx.createRadialGradient(
        powerUp.x + powerUp.width / 2,
        powerUp.y + powerUp.height / 2,
        0,
        powerUp.x + powerUp.width / 2,
        powerUp.y + powerUp.height / 2,
        powerUp.width / 2 + 5,
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.7, "rgba(135, 206, 250, 0.6)")
      gradient.addColorStop(1, "rgba(0, 191, 255, 0.3)")

      this.ctx.fillStyle = gradient
      this.ctx.beginPath()
      this.ctx.arc(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, powerUp.width / 2 + 5, 0, Math.PI * 2)
      this.ctx.fill()

      // Bubble highlight
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      this.ctx.beginPath()
      this.ctx.arc(powerUp.x + powerUp.width / 2 - 8, powerUp.y + powerUp.height / 2 - 8, 6, 0, Math.PI * 2)
      this.ctx.fill()

      this.ctx.restore()

      // Draw power-up emoji
      this.ctx.font = "24px Arial"
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "middle"
      const emoji =
        powerUp.type === "shield"
          ? "🛡️"
          : powerUp.type === "autoFire"
            ? "🔫"
            : powerUp.type === "slowMotion"
              ? "🌀"
              : "💣"
      this.ctx.fillText(emoji, powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2)
    }

    // Draw bullets
    this.ctx.fillStyle = "#00ff00"
    for (const bullet of this.bullets) {
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    }

    // Draw player
    this.ctx.save()
    this.ctx.translate(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2)
    this.ctx.rotate(this.player.rotation)

    // Player background
    this.ctx.fillStyle = selectedSkin?.color || "#3b82f6"
    this.ctx.fillRect(-this.player.width / 2, -this.player.height / 2, this.player.width, this.player.height)

    // Player emoji
    this.ctx.font = "24px Arial"
    this.ctx.fillStyle = "white"
    this.ctx.fillText(selectedSkin?.emoji || "🚀", -12, 8)

    this.ctx.restore()

    // Draw shield effect if active
    const hasShield = gameStore.powerUps.some((p) => p.type === "shield")
    if (hasShield) {
      this.ctx.strokeStyle = "#00ffff"
      this.ctx.lineWidth = 3
      this.ctx.beginPath()
      this.ctx.arc(
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        this.player.width,
        0,
        Math.PI * 2,
      )
      this.ctx.stroke()
    }
  }
}
