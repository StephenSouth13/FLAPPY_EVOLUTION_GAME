"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/store/game-store"
import { COMBAT_ITEMS } from "@/lib/constants/items"

export function ItemHotbar() {
  const { language, selectedItems, useItem } = useGameStore()
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({})

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "KeyR") {
      const rItem = selectedItems.find((item) => COMBAT_ITEMS.find((ci) => ci.id === item && ci.hotkey === "R"))
      if (rItem && !cooldowns[rItem]) {
        useItem(rItem)
        startCooldown(rItem)
      }
    }
    if (e.code === "KeyT") {
      const tItem = selectedItems.find((item) => COMBAT_ITEMS.find((ci) => ci.id === item && ci.hotkey === "T"))
      if (tItem && !cooldowns[tItem]) {
        useItem(tItem)
        startCooldown(tItem)
      }
    }
  }

  useEffect(() => {
    // Handle keyboard input for item usage
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedItems, cooldowns])

  const startCooldown = (itemId: string) => {
    const item = COMBAT_ITEMS.find((i) => i.id === itemId)
    if (!item) return

    setCooldowns((prev) => ({ ...prev, [itemId]: item.cooldown }))

    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const newCooldown = prev[itemId] - 100
        if (newCooldown <= 0) {
          clearInterval(interval)
          const { [itemId]: _, ...rest } = prev
          return rest
        }
        return { ...prev, [itemId]: newCooldown }
      })
    }, 100)
  }

  const handleItemClick = (itemId: string) => {
    if (!cooldowns[itemId]) {
      useItem(itemId)
      startCooldown(itemId)
    }
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/20">
        {selectedItems.slice(0, 4).map((itemId, index) => {
          const item = COMBAT_ITEMS.find((i) => i.id === itemId)
          if (!item) return null

          const cooldownPercent = cooldowns[itemId] ? (cooldowns[itemId] / item.cooldown) * 100 : 0
          const isOnCooldown = cooldowns[itemId] > 0

          return (
            <motion.button
              key={itemId}
              className={`relative w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center text-white font-bold transition-all ${
                isOnCooldown
                  ? "border-gray-500 bg-gray-700/50 cursor-not-allowed"
                  : "border-white/30 bg-white/10 hover:bg-white/20 hover:scale-105"
              }`}
              onClick={() => handleItemClick(itemId)}
              whileHover={!isOnCooldown ? { scale: 1.05 } : {}}
              whileTap={!isOnCooldown ? { scale: 0.95 } : {}}
            >
              {/* Item Icon */}
              <div className="text-2xl mb-1">{item.emoji}</div>

              {/* Hotkey */}
              <div className="text-xs opacity-70">{item.hotkey}</div>

              {/* Cooldown Overlay */}
              {isOnCooldown && (
                <motion.div
                  className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-xs font-bold">{Math.ceil(cooldowns[itemId] / 1000)}s</div>
                </motion.div>
              )}

              {/* Cooldown Progress Ring */}
              {isOnCooldown && (
                <svg className="absolute inset-0 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="30"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (cooldownPercent / 100)}`}
                    transform="rotate(-90 32 32)"
                  />
                </svg>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Item Tooltips */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
          Press R or T to use items
        </div>
      </div>
    </div>
  )
}
