"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Store, Volume2, VolumeX, Moon, Sun, Globe, BookOpen, User, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { LoginModal } from "@/components/auth/login-modal"
import { MemoryFragmentModal } from "@/components/game/memory-fragment-modal"
import { EnhancedMenu } from "@/components/ui/enhanced-menu"
import { WORLDS } from "@/lib/constants/worlds"
import { ENHANCED_SKINS } from "@/lib/constants/items"
import { GAME_QUOTES } from "@/lib/constants/quotes"
import Link from "next/link"

export default function HomePage() {
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
  } = useGameStore()

  const { user, isAuthenticated } = useAuthStore()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showMemoryModal, setShowMemoryModal] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [floatingEnemies, setFloatingEnemies] = useState<
    Array<{
      id: number
      emoji: string
      x: number
      y: number
      vx: number
      vy: number
    }>
  >([])

  useEffect(() => {
    setMounted(true)

    // Initialize floating enemies
    const enemies = []
    const enemyEmojis = ["🛸", "🦖", "🤠", "🤖", "👽", "🔥", "🧠", "🍄", "😈", "🌠"]

    for (let i = 0; i < 15; i++) {
      enemies.push({
        id: i,
        emoji: enemyEmojis[Math.floor(Math.random() * enemyEmojis.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      })
    }
    setFloatingEnemies(enemies)

    // Animate floating enemies
    const animateEnemies = () => {
      setFloatingEnemies((prev) =>
        prev.map((enemy) => ({
          ...enemy,
          x: (enemy.x + enemy.vx + window.innerWidth) % window.innerWidth,
          y: (enemy.y + enemy.vy + window.innerHeight) % window.innerHeight,
        })),
      )
    }

    const enemyInterval = setInterval(animateEnemies, 50)

    // Rotate quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % GAME_QUOTES.length)
    }, 8000)

    return () => {
      clearInterval(enemyInterval)
      clearInterval(quoteInterval)
    }
  }, [])

  if (!mounted) return null

  const texts = {
    en: {
      title: "FLAPPY EVOLUTION",
      subtitle: "Space Shooter",
      tagline: "Journey through 10 evolving worlds of epic adventures!",
      play: "START ADVENTURE",
      store: "COSMIC STORE",
      tutorial: "HOW TO PLAY",
      developer: "DEVELOPER",
      login: "LOGIN",
      profile: "PROFILE",
      highScore: "High Score",
      worldsUnlocked: "Worlds Unlocked",
      totalPoints: "Cosmic Points",
      welcome: "Welcome back",
      guest: "Guest Player",
      featuredWorlds: "Featured Worlds",
      latestUpdates: "Latest Updates",
      newFeatures: "🆕 New Features",
      bossMode: "Boss Battles",
      aiEvolution: "AI Evolution",
      itemSystem: "Combat Items",
    },
    vi: {
      title: "FLAPPY EVOLUTION",
      subtitle: "Bắn Đĩa Bay",
      tagline: "Hành trình qua 10 thế giới tiến hóa đầy phiêu lưu!",
      play: "BẮT ĐẦU PHIÊU LƯU",
      store: "CỬA HÀNG VŨ TRỤ",
      tutorial: "HƯỚNG DẪN",
      developer: "NHÀ PHÁT TRIỂN",
      login: "ĐĂNG NHẬP",
      profile: "HỒ SƠ",
      highScore: "Điểm Cao Nhất",
      worldsUnlocked: "Thế Giới Đã Mở",
      totalPoints: "Điểm Vũ Trụ",
      welcome: "Chào mừng trở lại",
      guest: "Khách",
      featuredWorlds: "Thế Giới Nổi Bật",
      latestUpdates: "Cập Nhật Mới",
      newFeatures: "🆕 Tính Năng Mới",
      bossMode: "Trận Boss",
      aiEvolution: "AI Tiến Hóa",
      itemSystem: "Vật Phẩm Chiến Đấu",
    },
  }

  const t = texts[language]
  const selectedSkinData = ENHANCED_SKINS.find((s) => s.id === selectedSkin)

  return (
    <>
      <EnhancedMenu />

      <div
        className={`min-h-screen transition-all duration-500 overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
            : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white"
        }`}
      >
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Enemies */}
          {floatingEnemies.map((enemy) => (
            <motion.div
              key={enemy.id}
              className="absolute text-2xl opacity-20 pointer-events-none"
              style={{
                left: enemy.x,
                top: enemy.y,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {enemy.emoji}
            </motion.div>
          ))}

          {/* Cosmic Particles */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                backgroundColor: darkMode ? "#ffffff" : "#ffffff",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 300 - 150],
                scale: [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* World Portals */}
          {WORLDS.slice(0, 5).map((world, i) => (
            <motion.div
              key={world.id}
              className="absolute text-6xl opacity-10"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {world.emoji}
            </motion.div>
          ))}
        </div>

        {/* Enhanced Header Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSound}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              <Globe size={20} />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLoginModal(true)}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              <User size={20} />
            </Button>
          </motion.div>
        </div>

        {/* User Info */}
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{selectedSkinData?.emoji || "🚀"}</div>
              <div>
                <div className="text-sm opacity-80">{isAuthenticated ? t.welcome : t.guest}</div>
                <div className="font-semibold">{isAuthenticated ? user?.email?.split("@")[0] : "Anonymous"}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
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
              className="text-2xl md:text-4xl font-semibold mb-4 text-cyan-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {t.subtitle}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t.tagline}
            </motion.p>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-8 text-center"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold text-yellow-400 mb-1">{highScore}</div>
              <div className="text-xs opacity-80">{t.highScore}</div>
            </motion.div>
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold text-green-400 mb-1">{unlockedWorlds}</div>
              <div className="text-xs opacity-80">{t.worldsUnlocked}</div>
            </motion.div>
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold text-purple-400 mb-1">{totalPoints}</div>
              <div className="text-xs opacity-80">{t.totalPoints}</div>
            </motion.div>
          </motion.div>

          {/* Enhanced Menu Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 gap-4 w-full max-w-md mb-8"
          >
            <Link href="/game">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="w-full h-16 text-lg font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg border-2 border-white/20">
                  <Play className="mr-2" size={24} />
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
                <Button className="w-full h-16 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg border-2 border-white/20">
                  <Store className="mr-2" size={24} />
                  {t.store}
                </Button>
              </motion.div>
            </Link>

            <Link href="/tutorial">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="w-full h-16 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg border-2 border-white/20">
                  <BookOpen className="mr-2" size={24} />
                  {t.tutorial}
                </Button>
              </motion.div>
            </Link>

            <Link href="/developer">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="w-full h-16 text-lg font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-lg border-2 border-white/20">
                  <Trophy className="mr-2" size={24} />
                  {t.developer}
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* New Features Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-3 w-full max-w-md mb-6"
          >
            <motion.div
              className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 text-center border border-red-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-1">🐲</div>
              <div className="text-xs font-semibold">{t.bossMode}</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-3 text-center border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-1">🧠</div>
              <div className="text-xs font-semibold">{t.aiEvolution}</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 text-center border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-semibold">{t.itemSystem}</div>
            </motion.div>
          </motion.div>

          {/* Rotating Quote Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-center text-sm opacity-70 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 max-w-lg"
          >
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 italic">"{GAME_QUOTES[currentQuote].text[language]}"</p>
              <p className="text-xs text-cyan-300">— {GAME_QUOTES[currentQuote].author}</p>
            </motion.div>
          </motion.div>

          {/* Enhanced Controls Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-6 text-center text-sm opacity-70 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
          >
            <p className="mb-2">🖱️ Click or SPACE to fly • 🔫 E to shoot • 📱 Mobile friendly</p>
            <p className="mb-2">🎮 R & T for combat items • 🌍 10 evolving worlds • 🏆 Epic boss battles</p>
            <p>✨ Collect power-ups in bubbles • 🛒 Unlock legendary skins • 🧠 AI learns your patterns</p>
          </motion.div>
        </div>

        {/* Login Modal */}
        <AnimatePresence>
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
          {showMemoryModal && (
            <MemoryFragmentModal fragmentId={showMemoryModal} onClose={() => setShowMemoryModal(null)} />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
