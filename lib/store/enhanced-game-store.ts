"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type GameState = "menu" | "playing" | "paused" | "gameOver" | "bossMode" | "storyMode" | "glitchMode"
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
  tier: number
}

export interface MemoryFragment {
  id: string
  unlocked: boolean
  viewedAt?: number
}

export interface Achievement {
  id: string
  name: { en: string; vi: string }
  description: { en: string; vi: string }
  unlocked: boolean
  progress: number
  maxProgress: number
  reward: number
}

export interface EnhancedGameStore {
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
  glitchModeUnlocked: boolean

  // Story & Memory System
  memoryFragments: MemoryFragment[]
  storyProgress: number
  currentStoryPhase: number
  shadowPlayerDefeated: boolean

  // Settings
  darkMode: boolean
  language: Language
  soundEnabled: boolean
  musicVolume: number
  sfxVolume: number

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
  bossesDefeated: string[]

  // Enhanced AI Learning System
  playerPatterns: {
    averageHeight: number
    movementFrequency: number
    shootingAccuracy: number
    survivalTime: number
    preferredItems: string[]
    deathLocations: Array<{ x: number; y: number; world: number }>
    playStyle: "aggressive" | "defensive" | "balanced"
  }

  // Achievement System
  achievements: Achievement[]
  totalAchievementPoints: number

  // Statistics
  stats: {
    totalPlayTime: number
    totalDeaths: number
    totalEnemiesKilled: number
    totalItemsUsed: number
    totalBossesDefeated: number
    longestSurvival: number
    perfectRuns: number
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

  // Enhanced Item System
  useItem: (itemId: string) => void
  addActiveItem: (item: ActiveItem) => void
  removeActiveItem: (itemId: string) => void
  updateActiveItems: () => void
  setSelectedItems: (items: string[]) => void
  upgradeItem: (itemId: string) => void

  // Boss System
  startBossBattle: (bossId: string) => void
  endBossBattle: () => void
  damageBoss: (damage: number) => void
  setBossPhase: (phase: number) => void
  defeatBoss: (bossId: string) => void

  // Story & Memory System
  unlockMemoryFragment: (fragmentId: string) => void
  viewMemoryFragment: (fragmentId: string) => void
  advanceStoryPhase: () => void
  unlockGlitchMode: () => void
  defeatShadowPlayer: () => void

  // Enhanced AI Learning
  updatePlayerPattern: (pattern: Partial<EnhancedGameStore["playerPatterns"]>) => void
  recordDeath: (x: number, y: number, world: number) => void
  analyzePlayStyle: () => void
  increaseAIDifficulty: () => void
  resetAILearning: () => void

  // Achievement System
  checkAchievements: () => void
  unlockAchievement: (achievementId: string) => void
  getAchievementProgress: (achievementId: string) => number

  // Statistics
  updateStats: (statUpdate: Partial<EnhancedGameStore["stats"]>) => void
  recordPlayTime: (time: number) => void

  // Settings Actions
  toggleDarkMode: () => void
  toggleLanguage: () => void
  toggleSound: () => void
  setMusicVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void

  // Skin Actions
  selectSkin: (skinId: string) => void
  unlockSkin: (skinId: string, cost: number) => void
}

const initialAchievements: Achievement[] = [
  {
    id: "first_flight",
    name: { en: "First Flight", vi: "Chuyến Bay Đầu Tiên" },
    description: { en: "Complete your first game", vi: "Hoàn thành game đầu tiên" },
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: 50,
  },
  {
    id: "world_explorer",
    name: { en: "World Explorer", vi: "Nhà Thám Hiểm Thế Giới" },
    description: { en: "Unlock all 10 worlds", vi: "Mở khóa tất cả 10 thế giới" },
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    reward: 500,
  },
  {
    id: "boss_slayer",
    name: { en: "Boss Slayer", vi: "Kẻ Giết Boss" },
    description: { en: "Defeat all bosses", vi: "Đánh bại tất cả boss" },
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    reward: 1000,
  },
  {
    id: "memory_collector",
    name: { en: "Memory Collector", vi: "Người Thu Thập Ký Ức" },
    description: { en: "Unlock all memory fragments", vi: "Mở khóa tất cả mảnh ký ức" },
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    reward: 750,
  },
  {
    id: "loop_master",
    name: { en: "Loop Master", vi: "Chủ Nhân Vòng Lặp" },
    description: { en: "Complete 10 evolution loops", vi: "Hoàn thành 10 vòng tiến hóa" },
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    reward: 2000,
  },
]

export const useEnhancedGameStore = create<EnhancedGameStore>()(
  persist(
    (set, get) => ({
      // Initial State
      gameState: "menu",
      score: 0,
      highScore: 0,
      totalPoints: 1000, // Starting points for testing
      lives: 3,
      currentWorld: 1,
      unlockedWorlds: 1,
      powerUps: [],
      activeItems: [],
      selectedItems: ["triple_laser", "ultimate_shield"],
      currentLoop: 1,
      aiDifficulty: 1,
      glitchModeUnlocked: false,

      // Story & Memory
      memoryFragments: [],
      storyProgress: 0,
      currentStoryPhase: 1,
      shadowPlayerDefeated: false,

      // Settings
      darkMode: false,
      language: "en",
      soundEnabled: true,
      musicVolume: 0.7,
      sfxVolume: 0.8,

      // Skins
      selectedSkin: "default",
      unlockedSkins: ["default"],
      selectedTrail: "default",
      selectedBackground: "default",
      unlockedTrails: ["default"],
      unlockedBackgrounds: ["default"],

      // Boss
      currentBoss: null,
      bossHealth: 0,
      bossPhase: 0,
      bossesDefeated: [],

      // Enhanced AI Learning
      playerPatterns: {
        averageHeight: 0.5,
        movementFrequency: 0,
        shootingAccuracy: 0,
        survivalTime: 0,
        preferredItems: [],
        deathLocations: [],
        playStyle: "balanced",
      },

      // Achievements
      achievements: initialAchievements,
      totalAchievementPoints: 0,

      // Statistics
      stats: {
        totalPlayTime: 0,
        totalDeaths: 0,
        totalEnemiesKilled: 0,
        totalItemsUsed: 0,
        totalBossesDefeated: 0,
        longestSurvival: 0,
        perfectRuns: 0,
      },

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
        const { score, highScore, totalPoints, currentLoop, stats } = get()
        const newHighScore = Math.max(score, highScore)
        const pointsEarned = Math.floor(score * (1 + currentLoop * 0.1))
        const newTotalPoints = totalPoints + pointsEarned

        // Update stats
        get().updateStats({
          totalDeaths: stats.totalDeaths + 1,
          longestSurvival: Math.max(stats.longestSurvival, score * 1000),
        })

        // Check for loop completion
        if (score >= 250) {
          set({ currentLoop: currentLoop + 1 })
          get().increaseAIDifficulty()

          // Unlock glitch mode after 10 loops
          if (currentLoop >= 10) {
            get().unlockGlitchMode()
          }
        }

        get().checkAchievements()

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

        // Check for boss battles
        if ((newWorld === 5 || newWorld === 10) && newWorld !== currentWorld) {
          const bossId = newWorld === 5 ? "ice_fire_dragon" : "supreme_ai"
          get().startBossBattle(bossId)
        }

        // Check for memory fragment unlocks
        if (newWorld > currentWorld) {
          const fragment = get().memoryFragments.find((f) => f.id === `fragment_${newWorld}`)
          if (fragment && !fragment.unlocked) {
            get().unlockMemoryFragment(`fragment_${newWorld}`)
          }
        }

        set({
          score: newScore,
          currentWorld: newWorld,
          unlockedWorlds: Math.max(get().unlockedWorlds, newWorld),
        })

        get().checkAchievements()
      },

      loseLife: () => {
        const { lives, currentWorld } = get()
        const newLives = lives - 1

        // Record death location for AI learning
        get().recordDeath(100, 300, currentWorld)

        if (newLives <= 0) {
          get().gameOver()
        } else {
          set({ lives: newLives })
        }
      },

      // Memory & Story System
      unlockMemoryFragment: (fragmentId: string) => {
        set((state) => ({
          memoryFragments: [
            ...state.memoryFragments.filter((f) => f.id !== fragmentId),
            { id: fragmentId, unlocked: true },
          ],
        }))
        get().checkAchievements()
      },

      viewMemoryFragment: (fragmentId: string) => {
        set((state) => ({
          memoryFragments: state.memoryFragments.map((f) => (f.id === fragmentId ? { ...f, viewedAt: Date.now() } : f)),
        }))
      },

      advanceStoryPhase: () => {
        set((state) => ({
          currentStoryPhase: state.currentStoryPhase + 1,
          storyProgress: Math.min(state.storyProgress + 20, 100),
        }))
      },

      unlockGlitchMode: () => {
        set({ glitchModeUnlocked: true })
        get().unlockAchievement("glitch_master")
      },

      defeatShadowPlayer: () => {
        set({ shadowPlayerDefeated: true })
        get().unlockAchievement("shadow_conqueror")
      },

      // Enhanced AI Learning
      updatePlayerPattern: (pattern) => {
        set((state) => ({
          playerPatterns: { ...state.playerPatterns, ...pattern },
        }))
        get().analyzePlayStyle()
      },

      recordDeath: (x: number, y: number, world: number) => {
        set((state) => ({
          playerPatterns: {
            ...state.playerPatterns,
            deathLocations: [
              ...state.playerPatterns.deathLocations.slice(-19), // Keep last 20
              { x, y, world },
            ],
          },
        }))
      },

      analyzePlayStyle: () => {
        const { playerPatterns } = get()
        let playStyle: "aggressive" | "defensive" | "balanced" = "balanced"

        if (playerPatterns.shootingAccuracy > 70 && playerPatterns.movementFrequency > 60) {
          playStyle = "aggressive"
        } else if (playerPatterns.averageHeight > 0.7 && playerPatterns.movementFrequency < 40) {
          playStyle = "defensive"
        }

        set((state) => ({
          playerPatterns: { ...state.playerPatterns, playStyle },
        }))
      },

      increaseAIDifficulty: () => {
        set((state) => ({
          aiDifficulty: Math.min(state.aiDifficulty + 0.3, 5.0),
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
            preferredItems: [],
            deathLocations: [],
            playStyle: "balanced",
          },
        })
      },

      // Achievement System
      checkAchievements: () => {
        const state = get()

        // Check each achievement
        state.achievements.forEach((achievement) => {
          if (achievement.unlocked) return

          let newProgress = achievement.progress

          switch (achievement.id) {
            case "first_flight":
              if (state.stats.totalDeaths > 0) newProgress = 1
              break
            case "world_explorer":
              newProgress = state.unlockedWorlds
              break
            case "boss_slayer":
              newProgress = state.bossesDefeated.length
              break
            case "memory_collector":
              newProgress = state.memoryFragments.filter((f) => f.unlocked).length
              break
            case "loop_master":
              newProgress = state.currentLoop - 1
              break
          }

          if (newProgress >= achievement.maxProgress && !achievement.unlocked) {
            get().unlockAchievement(achievement.id)
          } else if (newProgress !== achievement.progress) {
            set((state) => ({
              achievements: state.achievements.map((a) =>
                a.id === achievement.id ? { ...a, progress: newProgress } : a,
              ),
            }))
          }
        })
      },

      unlockAchievement: (achievementId: string) => {
        const achievement = get().achievements.find((a) => a.id === achievementId)
        if (!achievement || achievement.unlocked) return

        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId ? { ...a, unlocked: true, progress: a.maxProgress } : a,
          ),
          totalPoints: state.totalPoints + achievement.reward,
          totalAchievementPoints: state.totalAchievementPoints + achievement.reward,
        }))
      },

      getAchievementProgress: (achievementId: string) => {
        const achievement = get().achievements.find((a) => a.id === achievementId)
        return achievement ? (achievement.progress / achievement.maxProgress) * 100 : 0
      },

      // Statistics
      updateStats: (statUpdate) => {
        set((state) => ({
          stats: { ...state.stats, ...statUpdate },
        }))
      },

      recordPlayTime: (time: number) => {
        set((state) => ({
          stats: { ...state.stats, totalPlayTime: state.stats.totalPlayTime + time },
        }))
      },

      // Boss System
      startBossBattle: (bossId: string) => {
        set({
          gameState: "bossMode",
          currentBoss: bossId,
          bossHealth: bossId === "ice_fire_dragon" ? 300 : bossId === "supreme_ai" ? 500 : 200,
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
        const { bossHealth, currentBoss } = get()
        const newHealth = Math.max(0, bossHealth - damage)
        set({ bossHealth: newHealth })

        if (newHealth <= 0 && currentBoss) {
          get().defeatBoss(currentBoss)
        }
      },

      setBossPhase: (phase: number) => set({ bossPhase: phase }),

      defeatBoss: (bossId: string) => {
        set((state) => ({
          bossesDefeated: [...state.bossesDefeated, bossId],
          stats: { ...state.stats, totalBossesDefeated: state.stats.totalBossesDefeated + 1 },
        }))

        // Award bonus points
        get().addScore(100)
        get().endBossBattle()
        get().checkAchievements()
      },

      // Item System
      useItem: (itemId: string) => {
        const now = Date.now()
        get().addActiveItem({ id: itemId, startTime: now, duration: 10000, tier: 1 })

        set((state) => ({
          stats: { ...state.stats, totalItemsUsed: state.stats.totalItemsUsed + 1 },
        }))
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

      upgradeItem: (itemId: string) => {
        // Implementation for item upgrades
        console.log(`Upgrading item: ${itemId}`)
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

      // Settings Actions
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "vi" : "en",
        })),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      setMusicVolume: (volume: number) => set({ musicVolume: volume }),

      setSfxVolume: (volume: number) => set({ sfxVolume: volume }),

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
      name: "flappy-evolution-enhanced",
      partialize: (state) => ({
        highScore: state.highScore,
        totalPoints: state.totalPoints,
        unlockedWorlds: state.unlockedWorlds,
        darkMode: state.darkMode,
        language: state.language,
        soundEnabled: state.soundEnabled,
        musicVolume: state.musicVolume,
        sfxVolume: state.sfxVolume,
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
        memoryFragments: state.memoryFragments,
        storyProgress: state.storyProgress,
        currentStoryPhase: state.currentStoryPhase,
        shadowPlayerDefeated: state.shadowPlayerDefeated,
        glitchModeUnlocked: state.glitchModeUnlocked,
        achievements: state.achievements,
        totalAchievementPoints: state.totalAchievementPoints,
        stats: state.stats,
        bossesDefeated: state.bossesDefeated,
      }),
    },
  ),
)
