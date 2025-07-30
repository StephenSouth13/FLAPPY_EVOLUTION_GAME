"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Store,
  BookOpen,
  Trophy,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Globe,
  Star,
  Gamepad2,
  Zap,
  Clock,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { WORLDS } from "@/lib/constants/worlds"
import { ENHANCED_SKINS } from "@/lib/constants/enhanced-items"
import { MEMORY_FRAGMENTS } from "@/lib/constants/story"
import Link from "next/link"

export function EnhancedMenu() {
  const {
    highScore,
    unlockedWorlds,
    selectedSkin,
    darkMode,
    language,
    soundEnabled,
    toggleDarkMode,
    toggleLanguage,
    toggleSound,
    totalPoints,
    currentLoop,
    playerPatterns,
  } = useGameStore()

  const { user, isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState("main")
  const [hoveredWorld, setHoveredWorld] = useState<number | null>(null)
  const [unlockedFragments, setUnlockedFragments] = useState<string[]>([])

  useEffect(() => {
    // Calculate unlocked memory fragments
    const fragments = MEMORY_FRAGMENTS.filter((f) => f.worldUnlock <= unlockedWorlds).map((f) => f.id)
    setUnlockedFragments(fragments)
  }, [unlockedWorlds])

  const texts = {
    en: {
      title: "FLAPPY EVOLUTION",
      subtitle: "The Ultimate Space Odyssey",
      play: "START ADVENTURE",
      store: "COSMIC STORE",
      tutorial: "HOW TO PLAY",
      developer: "DEVELOPER",
      settings: "SETTINGS",
      profile: "PROFILE",
      memories: "MEMORY FRAGMENTS",
      worlds: "WORLD EXPLORER",
      stats: "STATISTICS",
      achievements: "ACHIEVEMENTS",
      highScore: "High Score",
      worldsUnlocked: "Worlds Unlocked",
      totalPoints: "Cosmic Points",
      currentLoop: "Current Loop",
      welcome: "Welcome back",
      guest: "Guest Player",
      memoryCount: "Memories Collected",
      aiLearning: "AI Learning Progress",
      playerAnalysis: "Player Analysis",
      survivalTime: "Best Survival",
      accuracy: "Shooting Accuracy",
      movement: "Movement Style",
      newFeatures: "🆕 Latest Updates",
      bossMode: "Epic Boss Battles",
      storyMode: "Mystery Story Mode",
      glitchWorld: "Glitch Dimension",
      shadowBoss: "Shadow Self Boss",
    },
    vi: {
      title: "FLAPPY EVOLUTION",
      subtitle: "Cuộc Phiêu Lưu Vũ Trụ Tối Thượng",
      play: "BẮT ĐẦU PHIÊU LƯU",
      store: "CỬA HÀNG VŨ TRỤ",
      tutorial: "HƯỚNG DẪN",
      developer: "NHÀ PHÁT TRIỂN",
      settings: "CÀI ĐẶT",
      profile: "HỒ SƠ",
      memories: "MẢNH KÝ ỨC",
      worlds: "KHÁM PHÁ THẾ GIỚI",
      stats: "THỐNG KÊ",
      achievements: "THÀNH TÍCH",
      highScore: "Điểm Cao Nhất",
      worldsUnlocked: "Thế Giới Đã Mở",
      totalPoints: "Điểm Vũ Trụ",
      currentLoop: "Vòng Hiện Tại",
      welcome: "Chào mừng trở lại",
      guest: "Khách",
      memoryCount: "Ký Ức Đã Thu",
      aiLearning: "Tiến Độ AI Học",
      playerAnalysis: "Phân Tích Người Chơi",
      survivalTime: "Thời Gian Sống Tốt Nhất",
      accuracy: "Độ Chính Xác Bắn",
      movement: "Phong Cách Di Chuyển",
      newFeatures: "🆕 Cập Nhật Mới",
      bossMode: "Trận Boss Hoành Tráng",
      storyMode: "Chế Độ Câu Chuyện Bí Ẩn",
      glitchWorld: "Chiều Không Gian Lỗi",
      shadowBoss: "Boss Bóng Tối",
    },
  }

  const t = texts[language]
  const selectedSkinData = ENHANCED_SKINS.find((s) => s.id === selectedSkin)

  const menuTabs = [
    { id: "main", name: "Main", icon: Gamepad2 },
    { id: "worlds", name: t.worlds, icon: Globe },
    { id: "memories", name: t.memories, icon: Star },
    { id: "stats", name: t.stats, icon: Award },
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white"
      }`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating World Portals */}
        {WORLDS.slice(0, 6).map((world, i) => (
          <motion.div
            key={world.id}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {world.emoji}
          </motion.div>
        ))}

        {/* Cosmic Particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: "#ffffff",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {[
          { icon: soundEnabled ? Volume2 : VolumeX, action: toggleSound },
          { icon: darkMode ? Sun : Moon, action: toggleDarkMode },
          { icon: Globe, action: toggleLanguage },
        ].map((control, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={control.action}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              <control.icon size={20} />
            </Button>
          </motion.div>
        ))}
      </div>

      {/* User Profile Card */}
      <div className="absolute top-4 left-4 z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              {selectedSkinData?.emoji || "🚀"}
            </motion.div>
            <div>
              <div className="text-sm opacity-80">{isAuthenticated ? t.welcome : t.guest}</div>
              <div className="font-semibold">{isAuthenticated ? user?.email?.split("@")[0] : "Anonymous"}</div>
              <div className="text-xs opacity-60">Loop {currentLoop}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            {t.title}
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl font-semibold mb-4 text-cyan-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {t.subtitle}
          </motion.h2>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex gap-2">
              {menuTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon size={18} />
                  <span className="hidden sm:inline">{tab.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: t.highScore, value: highScore, color: "text-yellow-400", icon: "🏆" },
                  { label: t.worldsUnlocked, value: unlockedWorlds, color: "text-green-400", icon: "🌍" },
                  { label: t.totalPoints, value: totalPoints, color: "text-purple-400", icon: "⭐" },
                  { label: t.memoryCount, value: unlockedFragments.length, color: "text-cyan-400", icon: "🧠" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Link href="/game">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button className="w-full h-20 text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg border-2 border-white/20">
                      <Play className="mr-3" size={28} />
                      {t.play}
                    </Button>
                  </motion.div>
                </Link>

                <Link href="/store">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button className="w-full h-20 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg border-2 border-white/20">
                      <Store className="mr-3" size={28} />
                      {t.store}
                    </Button>
                  </motion.div>
                </Link>
              </div>

              {/* Secondary Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { href: "/tutorial", icon: BookOpen, label: t.tutorial, gradient: "from-orange-500 to-red-500" },
                  { href: "/developer", icon: Trophy, label: t.developer, gradient: "from-cyan-500 to-teal-500" },
                ].map((btn, i) => (
                  <Link key={i} href={btn.href}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Button
                        className={`w-full h-16 text-lg font-bold bg-gradient-to-r ${btn.gradient} shadow-lg border-2 border-white/20`}
                      >
                        <btn.icon className="mr-2" size={24} />
                        {btn.label}
                      </Button>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* New Features Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8"
              >
                <h3 className="text-xl font-bold text-center mb-4">{t.newFeatures}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: "🐲", label: t.bossMode, color: "from-red-500/20 to-orange-500/20 border-red-500/30" },
                    { icon: "🧠", label: t.storyMode, color: "from-purple-500/20 to-blue-500/20 border-purple-500/30" },
                    { icon: "🌀", label: t.glitchWorld, color: "from-pink-500/20 to-purple-500/20 border-pink-500/30" },
                    { icon: "👤", label: t.shadowBoss, color: "from-gray-500/20 to-black/20 border-gray-500/30" },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`bg-gradient-to-r ${feature.color} rounded-lg p-4 text-center border`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <div className="text-sm font-semibold">{feature.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "worlds" && (
            <motion.div
              key="worlds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl"
            >
              <h3 className="text-2xl font-bold text-center mb-6">World Explorer</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {WORLDS.map((world) => (
                  <motion.div
                    key={world.id}
                    className={`relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center cursor-pointer ${
                      world.id <= unlockedWorlds ? "opacity-100" : "opacity-50"
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onHoverStart={() => setHoveredWorld(world.id)}
                    onHoverEnd={() => setHoveredWorld(null)}
                  >
                    <div className="text-4xl mb-2">{world.emoji}</div>
                    <div className="text-sm font-semibold mb-1">{world.name[language]}</div>
                    <div className="text-xs opacity-70">{world.description[language]}</div>

                    {world.id > unlockedWorlds && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <div className="text-2xl">🔒</div>
                      </div>
                    )}

                    {hoveredWorld === world.id && world.id <= unlockedWorlds && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-xl border-2 border-yellow-400/50"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "memories" && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl"
            >
              <h3 className="text-2xl font-bold text-center mb-6">Memory Fragments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MEMORY_FRAGMENTS.map((fragment) => {
                  const isUnlocked = fragment.worldUnlock <= unlockedWorlds
                  return (
                    <motion.div
                      key={fragment.id}
                      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 ${
                        isUnlocked ? "opacity-100" : "opacity-50"
                      }`}
                      whileHover={isUnlocked ? { scale: 1.02, y: -3 } : {}}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                            fragment.rarity === "common"
                              ? "bg-gray-400/20 text-gray-300"
                              : fragment.rarity === "rare"
                                ? "bg-blue-400/20 text-blue-300"
                                : fragment.rarity === "epic"
                                  ? "bg-purple-400/20 text-purple-300"
                                  : fragment.rarity === "legendary"
                                    ? "bg-yellow-400/20 text-yellow-300"
                                    : "bg-pink-400/20 text-pink-300"
                          }`}
                        >
                          {fragment.rarity}
                        </div>
                        <h4 className="font-bold">{fragment.title[language]}</h4>
                      </div>
                      <p className="text-sm opacity-80 mb-3">{fragment.description[language]}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-60">World {fragment.worldUnlock}</span>
                        {isUnlocked ? (
                          <div className="text-green-400">✓ Unlocked</div>
                        ) : (
                          <div className="text-gray-500">🔒 Locked</div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl"
            >
              <h3 className="text-2xl font-bold text-center mb-6">{t.playerAnalysis}</h3>

              {/* AI Learning Progress */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="text-2xl">🧠</div>
                  {t.aiLearning}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      {Math.round(playerPatterns.averageHeight * 100)}%
                    </div>
                    <div className="text-sm opacity-80">Flight Height Preference</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      {Math.round(playerPatterns.movementFrequency)}%
                    </div>
                    <div className="text-sm opacity-80">Movement Frequency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">
                      {Math.round(playerPatterns.shootingAccuracy)}%
                    </div>
                    <div className="text-sm opacity-80">{t.accuracy}</div>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock size={20} />
                    {t.survivalTime}
                  </h4>
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {Math.round(playerPatterns.survivalTime / 1000)}s
                  </div>
                  <div className="text-sm opacity-70">Best single run duration</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap size={20} />
                    Loop Progress
                  </h4>
                  <div className="text-2xl font-bold text-orange-400 mb-2">{currentLoop}</div>
                  <div className="text-sm opacity-70">Completed evolution cycles</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Controls Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-center text-sm opacity-70 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 max-w-2xl"
        >
          <p className="mb-2">🖱️ Click or SPACE to fly • 🔫 E to shoot • R & T for combat items</p>
          <p className="mb-2">🌍 Journey through 10+ evolving worlds • 🐲 Epic boss battles with dialogue</p>
          <p>🧠 AI learns your patterns • 🌀 Unlock glitch dimension • 👤 Face your shadow self</p>
        </motion.div>
      </div>
    </div>
  )
}
