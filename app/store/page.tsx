"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Lock, Star, Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import { SKINS, POWER_UPS, TRAILS, BACKGROUNDS } from "@/lib/constants/store-items"
import Link from "next/link"

export default function StorePage() {
  const {
    totalPoints,
    selectedSkin,
    selectedTrail,
    selectedBackground,
    unlockedSkins,
    unlockedTrails,
    unlockedBackgrounds,
    unlockSkin,
    unlockTrail,
    unlockBackground,
    selectSkin,
    selectTrail,
    selectBackground,
    darkMode,
    language,
  } = useGameStore()

  const [selectedCategory, setSelectedCategory] = useState("skins")
  const [selectedPreview, setSelectedPreview] = useState(selectedSkin)

  const texts = {
    en: {
      store: "COSMIC STORE",
      subtitle: "Upgrade your space adventure",
      points: "Cosmic Points",
      select: "SELECT",
      selected: "SELECTED",
      unlock: "UNLOCK",
      locked: "LOCKED",
      notEnoughPoints: "Not enough points",
      back: "Back",
      categories: {
        skins: "Spaceships",
        trails: "Particle Trails",
        backgrounds: "Cosmic Backgrounds",
        powerups: "Power Boosters",
      },
      preview: "Preview",
      rarity: {
        common: "Common",
        rare: "Rare",
        epic: "Epic",
        legendary: "Legendary",
      },
    },
    vi: {
      store: "CỬA HÀNG VŨ TRỤ",
      subtitle: "Nâng cấp cuộc phiêu lưu không gian",
      points: "Điểm Vũ Trụ",
      select: "CHỌN",
      selected: "ĐÃ CHỌN",
      unlock: "MỞ KHÓA",
      locked: "KHÓA",
      notEnoughPoints: "Không đủ điểm",
      back: "Quay Lại",
      categories: {
        skins: "Tàu Vũ Trụ",
        trails: "Đuôi Hạt",
        backgrounds: "Nền Vũ Trụ",
        powerups: "Tăng Cường Sức Mạnh",
      },
      preview: "Xem Trước",
      rarity: {
        common: "Thường",
        rare: "Hiếm",
        epic: "Sử Thi",
        legendary: "Huyền Thoại",
      },
    },
  }

  const t = texts[language]

  const categories = [
    { id: "skins", name: t.categories.skins, icon: "🚀", items: SKINS },
    { id: "trails", name: t.categories.trails, icon: "✨", items: TRAILS },
    { id: "backgrounds", name: t.categories.backgrounds, icon: "🌌", items: BACKGROUNDS },
    { id: "powerups", name: t.categories.powerups, icon: "⚡", items: POWER_UPS },
  ]

  const currentCategory = categories.find((cat) => cat.id === selectedCategory)
  const currentItems = currentCategory?.items || []

  const handleItemAction = (item: any, category: string) => {
    const isUnlocked =
      category === "skins"
        ? unlockedSkins.includes(item.id)
        : category === "trails"
          ? unlockedTrails.includes(item.id)
          : category === "backgrounds"
            ? unlockedBackgrounds.includes(item.id)
            : false

    if (isUnlocked) {
      if (category === "skins") selectSkin(item.id)
      else if (category === "trails") selectTrail(item.id)
      else if (category === "backgrounds") selectBackground(item.id)
      setSelectedPreview(item.id)
    } else if (totalPoints >= item.cost) {
      if (category === "skins") {
        unlockSkin(item.id, item.cost)
        selectSkin(item.id)
      } else if (category === "trails") {
        unlockTrail(item.id, item.cost)
        selectTrail(item.id)
      } else if (category === "backgrounds") {
        unlockBackground(item.id, item.cost)
        selectBackground(item.id)
      }
      setSelectedPreview(item.id)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-400/10"
      case "rare":
        return "border-blue-400 bg-blue-400/10"
      case "epic":
        return "border-purple-400 bg-purple-400/10"
      case "legendary":
        return "border-yellow-400 bg-yellow-400/10"
      default:
        return "border-gray-400 bg-gray-400/10"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return <Star className="w-4 h-4" />
      case "epic":
        return <Sparkles className="w-4 h-4" />
      case "legendary":
        return <Crown className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white"
      }`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: "#ffffff",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
            <ArrowLeft className="mr-2" size={20} />
            {t.back}
          </Button>
        </Link>

        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundSize: "200%" }}
          >
            {t.store}
          </motion.h1>
          <p className="text-lg opacity-80">{t.subtitle}</p>
        </div>

        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              ⭐
            </motion.div>
            <span className="text-yellow-400 font-bold text-xl">{totalPoints}</span>
            <span className="text-sm opacity-80">{t.points}</span>
          </div>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="relative z-10 px-6 mb-8">
        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative z-10 flex justify-center mb-8 px-6">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-80 h-80 flex flex-col items-center justify-center border border-white/20"
          key={selectedPreview}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-cyan-300">{t.preview}</h3>
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4"
            style={{
              backgroundColor: currentItems.find((item) => item.id === selectedPreview)?.color || "#3b82f6",
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {currentItems.find((item) => item.id === selectedPreview)?.emoji || "🚀"}
          </motion.div>
          <div className="text-center">
            <h4 className="font-bold text-lg">
              {currentItems.find((item) => item.id === selectedPreview)?.name[language] || "Default"}
            </h4>
            <p className="text-sm opacity-70 mt-1">
              {currentItems.find((item) => item.id === selectedPreview)?.description[language] || ""}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Items Grid */}
      <div className="relative z-10 px-6 pb-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto"
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {currentItems.map((item, index) => {
            const isUnlocked =
              selectedCategory === "skins"
                ? unlockedSkins.includes(item.id)
                : selectedCategory === "trails"
                  ? unlockedTrails.includes(item.id)
                  : selectedCategory === "backgrounds"
                    ? unlockedBackgrounds.includes(item.id)
                    : false

            const isSelected =
              selectedCategory === "skins"
                ? selectedSkin === item.id
                : selectedCategory === "trails"
                  ? selectedTrail === item.id
                  : selectedCategory === "backgrounds"
                    ? selectedBackground === item.id
                    : false

            const canAfford = totalPoints >= item.cost

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 cursor-pointer transition-all duration-200 border-2 ${
                  selectedPreview === item.id
                    ? "ring-2 ring-yellow-400 border-yellow-400/50"
                    : getRarityColor(item.rarity || "common")
                } hover:scale-105 hover:shadow-2xl`}
                onClick={() => setSelectedPreview(item.id)}
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  {/* Rarity Badge */}
                  {item.rarity && item.rarity !== "common" && (
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                        item.rarity === "rare"
                          ? "bg-blue-500/20 text-blue-300"
                          : item.rarity === "epic"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {getRarityIcon(item.rarity)}
                      <span>{t.rarity[item.rarity as keyof typeof t.rarity]}</span>
                    </div>
                  )}

                  {/* Item Display */}
                  <motion.div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl relative overflow-hidden"
                    style={{ backgroundColor: item.color }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Bubble Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative z-10">{item.emoji}</span>
                  </motion.div>

                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.name[language]}</h3>
                  <p className="text-xs opacity-70 mb-3 line-clamp-2 h-8">{item.description[language]}</p>

                  {/* Action Button */}
                  {isSelected ? (
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold" disabled>
                      <Check className="mr-1" size={16} />
                      {t.selected}
                    </Button>
                  ) : isUnlocked ? (
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleItemAction(item, selectedCategory)
                      }}
                    >
                      {t.select}
                    </Button>
                  ) : (
                    <Button
                      className={`w-full font-bold ${
                        canAfford
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                          : "bg-gray-600 cursor-not-allowed text-gray-300"
                      }`}
                      disabled={!canAfford}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (canAfford) handleItemAction(item, selectedCategory)
                      }}
                    >
                      {canAfford ? (
                        <>
                          {t.unlock} ({item.cost}⭐)
                        </>
                      ) : (
                        <>
                          <Lock className="mr-1" size={16} />
                          {item.cost}⭐
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
