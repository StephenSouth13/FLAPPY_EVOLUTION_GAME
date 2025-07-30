"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type GameState = "menu" | "playing" | "paused" | "gameOver" | "bossMode"
export type Language = "en" | "vi"

export interface PowerUp {
  type: "shield" | "autoFire" | "slowMotion" | "bomb"
  duration: number
  startTime: number
}

export interface ActiveItem {
  id: string
  startTime: number
  duration: number
}

export interface GameStore {
  // Game State
  gameState: GameState
  score: number
  highScore: number
  totalPoints: number
  lives: number
  currentWorld: number
  unlockedWorlds: number
  powerUps: PowerUp[]
  activeItems: ActiveItem[]
  selectedItems: string[]
  currentLoop: number
  aiDifficulty: number

  // Settings
  darkMode: boolean
  language: Language
  soundEnabled: boolean

  // Skins and Customization
  selectedSkin: string
  unlockedSkins: string[]
  selectedTrail: string
  selectedBackground: string
  unlockedTrails: string[]
  unlockedBackgrounds: string[]

  // Boss Battle
  currentBoss: string | null
  bossHealth: number
  bossPhase: number

  // AI Learning System
  playerPatterns: {
    averageHeight: number
    movementFrequency: number
    shootingAccuracy: number
    survivalTime: number
  }

  // Actions
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  resetGame: () => void
  gameOver: () => void
  addScore: (points: number) => void
  loseLife: () => void
  addPowerUp: (powerUp: PowerUp) => void
  removePowerUp: (type: string) => void
  updatePowerUps: () => void
  setCurrentWorld: (world: number) => void
  selectTrail: (trailId: string) => void
  selectBackground: (backgroundId: string) => void
  unlockTrail: (trailId: string, cost: number) => void
  unlockBackground: (backgroundId: string, cost: number) => void

  // Item System
  useItem: (itemId: string) => void
  addActiveItem: (item: ActiveItem) => void
  removeActiveItem: (itemId: string) => void
  updateActiveItems: () => void
  setSelectedItems: (items: string[]) => void

  // Boss System
  startBossBattle: (bossId: string) => void
  endBossBattle: () => void
  damageBoss: (damage: number) => void
  setBossPhase: (phase: number) => void

  // AI Learning
  updatePlayerPattern: (pattern: Partial<GameStore["playerPatterns"]>) => void
  increaseAIDifficulty: () => void
  resetAILearning: () => void

  // Settings Actions
  toggleDarkMode: () => void
  toggleLanguage: () => void
  toggleSound: () => void

  // Skin Actions
  selectSkin: (skinId: string) => void
  unlockSkin: (skinId: string, cost: number) => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial State
      gameState: "menu",
      score: 0,
      highScore: 0,
      totalPoints: 500, // Starting points for testing new features
      lives: 3,
      currentWorld: 1,
      unlockedWorlds: 1,
      powerUps: [],
      activeItems: [],
      selectedItems: ["super_laser", "energy_shield"],
      currentLoop: 1,
      aiDifficulty: 1,
      selectedTrail: "default",
      selectedBackground: "default",
      unlockedTrails: ["default"],
      unlockedBackgrounds: ["default"],
      currentBoss: null,
      bossHealth: 0,
      bossPhase: 0,

      // AI Learning
      playerPatterns: {
        averageHeight: 0.5,
        movementFrequency: 0,
        shootingAccuracy: 0,
        survivalTime: 0,
      },

      // Settings
      darkMode: false,
      language: "en",
      soundEnabled: true,

      // Skins
      selectedSkin: "default",
      unlockedSkins: ["default"],

      // Game Actions
      startGame: () => set({ gameState: "playing" }),

      pauseGame: () => set({ gameState: "paused" }),

      resumeGame: () => set({ gameState: "playing" }),

      resetGame: () =>
        set({
          gameState: "playing",
          score: 0,
          lives: 3,
          currentWorld: 1,
          powerUps: [],
          activeItems: [],
          currentBoss: null,
          bossHealth: 0,
          bossPhase: 0,
        }),

      gameOver: () => {
        const { score, highScore, totalPoints, currentLoop } = get()
        const newHighScore = Math.max(score, highScore)
        const pointsEarned = Math.floor(score * (1 + currentLoop * 0.1))
        const newTotalPoints = totalPoints + pointsEarned

        // Check if player completed all 10 worlds
        if (score >= 250) {
          set({ currentLoop: currentLoop + 1 })
          get().increaseAIDifficulty()
        }

        set({
          gameState: "gameOver",
          highScore: newHighScore,
          totalPoints: newTotalPoints,
        })
      },

      addScore: (points: number) => {
        const { score, currentWorld, currentLoop } = get()
        const multipliedPoints = points * currentLoop
        const newScore = score + multipliedPoints
        const newWorld = Math.min(Math.floor(newScore / 25) + 1, 10)

        // Check for boss battles at worlds 5 and 10
        if ((newWorld === 5 || newWorld === 10) && newWorld !== currentWorld) {
          const bossId = newWorld === 5 ? "ice_fire_dragon" : "supreme_ai"
          get().startBossBattle(bossId)
        }

        set({
          score: newScore,
          currentWorld: newWorld,
          unlockedWorlds: Math.max(get().unlockedWorlds, newWorld),
        })
      },

      loseLife: () => {
        const { lives } = get()
        const newLives = lives - 1

        if (newLives <= 0) {
          get().gameOver()
        } else {
          set({ lives: newLives })
        }
      },

      addPowerUp: (powerUp: PowerUp) => {
        set((state) => ({
          powerUps: [...state.powerUps.filter((p) => p.type !== powerUp.type), powerUp],
        }))
      },

      removePowerUp: (type: string) => {
        set((state) => ({
          powerUps: state.powerUps.filter((p) => p.type !== type),
        }))
      },

      updatePowerUps: () => {
        const now = Date.now()
        set((state) => ({
          powerUps: state.powerUps.filter((p) => now - p.startTime < p.duration),
        }))
      },

      setCurrentWorld: (world: number) => set({ currentWorld: world }),

      selectTrail: (trailId: string) => set({ selectedTrail: trailId }),

      selectBackground: (backgroundId: string) => set({ selectedBackground: backgroundId }),

      unlockTrail: (trailId: string, cost: number) => {
        const { totalPoints, unlockedTrails } = get()
        if (totalPoints >= cost && !unlockedTrails.includes(trailId)) {
          set({
            totalPoints: totalPoints - cost,
            unlockedTrails: [...unlockedTrails, trailId],
          })
        }
      },

      unlockBackground: (backgroundId: string, cost: number) => {
        const { totalPoints, unlockedBackgrounds } = get()
        if (totalPoints >= cost && !unlockedBackgrounds.includes(backgroundId)) {
          set({
            totalPoints: totalPoints - cost,
            unlockedBackgrounds: [...unlockedBackgrounds, backgroundId],
          })
        }
      },

      // Item System
      useItem: (itemId: string) => {
        const now = Date.now()
        get().addActiveItem({ id: itemId, startTime: now, duration: 10000 })
      },

      addActiveItem: (item: ActiveItem) => {
        set((state) => ({
          activeItems: [...state.activeItems.filter((i) => i.id !== item.id), item],
        }))
      },

      removeActiveItem: (itemId: string) => {
        set((state) => ({
          activeItems: state.activeItems.filter((i) => i.id !== itemId),
        }))
      },

      updateActiveItems: () => {
        const now = Date.now()
        set((state) => ({
          activeItems: state.activeItems.filter((i) => now - i.startTime < i.duration),
        }))
      },

      setSelectedItems: (items: string[]) => set({ selectedItems: items }),

      // Boss System
      startBossBattle: (bossId: string) => {
        set({
          gameState: "bossMode",
          currentBoss: bossId,
          bossHealth: bossId === "ice_fire_dragon" ? 300 : 500,
          bossPhase: 0,
        })
      },

      endBossBattle: () => {
        set({
          gameState: "playing",
          currentBoss: null,
          bossHealth: 0,
          bossPhase: 0,
        })
      },

      damageBoss: (damage: number) => {
        const { bossHealth } = get()
        const newHealth = Math.max(0, bossHealth - damage)
        set({ bossHealth: newHealth })

        if (newHealth <= 0) {
          // Boss defeated - award bonus points
          get().addScore(100)
          get().endBossBattle()
        }
      },

      setBossPhase: (phase: number) => set({ bossPhase: phase }),

      // AI Learning System
      updatePlayerPattern: (pattern) => {
        set((state) => ({
          playerPatterns: { ...state.playerPatterns, ...pattern },
        }))
      },

      increaseAIDifficulty: () => {
        set((state) => ({
          aiDifficulty: Math.min(state.aiDifficulty + 0.2, 3.0),
        }))
      },

      resetAILearning: () => {
        set({
          aiDifficulty: 1,
          playerPatterns: {
            averageHeight: 0.5,
            movementFrequency: 0,
            shootingAccuracy: 0,
            survivalTime: 0,
          },
        })
      },

      // Settings Actions
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "vi" : "en",
        })),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      // Skin Actions
      selectSkin: (skinId: string) => set({ selectedSkin: skinId }),

      unlockSkin: (skinId: string, cost: number) => {
        const { totalPoints, unlockedSkins } = get()
        if (totalPoints >= cost && !unlockedSkins.includes(skinId)) {
          set({
            totalPoints: totalPoints - cost,
            unlockedSkins: [...unlockedSkins, skinId],
          })
        }
      },
    }),
    {
      name: "flappy-evolution-game",
      partialize: (state) => ({
        highScore: state.highScore,
        totalPoints: state.totalPoints,
        unlockedWorlds: state.unlockedWorlds,
        darkMode: state.darkMode,
        language: state.language,
        soundEnabled: state.soundEnabled,
        selectedSkin: state.selectedSkin,
        unlockedSkins: state.unlockedSkins,
        selectedTrail: state.selectedTrail,
        selectedBackground: state.selectedBackground,
        unlockedTrails: state.unlockedTrails,
        unlockedBackgrounds: state.unlockedBackgrounds,
        selectedItems: state.selectedItems,
        currentLoop: state.currentLoop,
        aiDifficulty: state.aiDifficulty,
        playerPatterns: state.playerPatterns,
      }),
    },
  ),
)
