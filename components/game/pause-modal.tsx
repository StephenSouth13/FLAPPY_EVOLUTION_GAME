"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import { useRouter } from "next/navigation"
import { Play, Home, Volume2, VolumeX } from "lucide-react"

export function PauseModal() {
  const router = useRouter()
  const { resumeGame, soundEnabled, toggleSound, language } = useGameStore()

  const texts = {
    en: {
      paused: "PAUSED",
      resume: "Resume",
      home: "Home",
      sound: "Sound",
    },
    vi: {
      paused: "TẠM DỪNG",
      resume: "Tiếp Tục",
      home: "Trang Chủ",
      sound: "Âm Thanh",
    },
  }

  const t = texts[language]

  const handleHome = () => {
    router.push("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white text-center max-w-sm mx-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-400">{t.paused}</h2>

        <div className="space-y-4">
          <Button onClick={resumeGame} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3">
            <Play className="mr-2" size={20} />
            {t.resume}
          </Button>

          <Button
            onClick={toggleSound}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            {soundEnabled ? <Volume2 className="mr-2" size={16} /> : <VolumeX className="mr-2" size={16} />}
            {t.sound}
          </Button>

          <Button
            onClick={handleHome}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            <Home className="mr-2" size={16} />
            {t.home}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
