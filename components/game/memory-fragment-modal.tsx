"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import { MEMORY_FRAGMENTS } from "@/lib/constants/story"

interface MemoryFragmentModalProps {
  fragmentId: string
  onClose: () => void
}

export function MemoryFragmentModal({ fragmentId, onClose }: MemoryFragmentModalProps) {
  const { language } = useGameStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)

  const fragment = MEMORY_FRAGMENTS.find((f) => f.id === fragmentId)

  if (!fragment) return null

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
      case "mythic":
        return "border-pink-400 bg-pink-400/10"
      default:
        return "border-gray-400 bg-gray-400/10"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-400/50"
      case "rare":
        return "shadow-blue-400/50"
      case "epic":
        return "shadow-purple-400/50"
      case "legendary":
        return "shadow-yellow-400/50"
      case "mythic":
        return "shadow-pink-400/50"
      default:
        return "shadow-gray-400/50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-black/90 backdrop-blur-md rounded-2xl p-8 text-white max-w-2xl w-full border-2 ${getRarityColor(fragment.rarity)} shadow-2xl ${getRarityGlow(fragment.rarity)}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getRarityColor(fragment.rarity)}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {fragment.rarity}
            </motion.div>
            <h2 className="text-2xl font-bold">{fragment.title[language]}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X size={20} />
          </Button>
        </div>

        {/* Description */}
        <p className="text-lg opacity-80 mb-6 italic">{fragment.description[language]}</p>

        {/* Content based on type */}
        <div className="mb-6">
          {fragment.type === "text" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-lg p-6 border border-white/10"
            >
              <p className="text-base leading-relaxed">{fragment.content[language]}</p>
            </motion.div>
          )}

          {fragment.type === "audio" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 border border-purple-500/30"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>
                <Button
                  onClick={() => setAudioMuted(!audioMuted)}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  {audioMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-70 mb-2">Audio Memory Fragment</div>
                <p className="text-base">{fragment.content[language]}</p>
              </div>
            </motion.div>
          )}

          {fragment.type === "image" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-lg p-6 border border-yellow-500/30"
            >
              <div className="w-full h-48 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl">🖼️</div>
              </div>
              <p className="text-base text-center">{fragment.content[language]}</p>
            </motion.div>
          )}

          {fragment.type === "video" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-pink-900/50 to-red-900/50 rounded-lg p-6 border border-pink-500/30"
            >
              <div className="w-full h-48 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl">🎬</div>
              </div>
              <p className="text-base text-center">{fragment.content[language]}</p>
            </motion.div>
          )}
        </div>

        {/* Unlock Info */}
        <div className="text-center text-sm opacity-60">
          <p>Unlocked at World {fragment.worldUnlock}</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-current rounded-full opacity-60" />
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-current rounded-full opacity-60" />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-current opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}
