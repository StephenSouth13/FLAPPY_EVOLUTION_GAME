"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Gamepad2, Target, Shield, Zap, Clock, Bomb, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import Link from "next/link"

export default function TutorialPage() {
  const { darkMode, language } = useGameStore()

  const texts = {
    en: {
      title: "HOW TO PLAY",
      subtitle: "Master the art of space evolution",
      back: "Back to Home",
      controls: "Game Controls",
      controlsDesc: "Learn the basic controls to navigate your spacecraft",
      objectives: "Game Objectives",
      objectivesDesc: "Understand your mission and goals",
      powerups: "Power-ups Guide",
      powerupsDesc: "Discover special abilities to enhance your gameplay",
      worlds: "World Evolution",
      worldsDesc: "Journey through 10 unique themed worlds",
      tips: "Pro Tips",
      tipsDesc: "Advanced strategies for high scores",

      // Controls
      flyControl: "Fly Up",
      flyDesc: "Click mouse, tap screen, or press SPACE to make your ship fly upward",
      shootControl: "Shoot Laser",
      shootDesc: "Press E key or tap the shoot button to fire lasers at enemies",
      pauseControl: "Pause Game",
      pauseDesc: "Press ESC or click pause button to pause the game",

      // Objectives
      obj1: "Survive as long as possible",
      obj1Desc: "Avoid obstacles and enemies to stay alive",
      obj2: "Destroy enemies for points",
      obj2Desc: "Shoot UFOs, birds, and other enemies to earn points",
      obj3: "Collect power-ups",
      obj3Desc: "Grab floating power-ups to gain special abilities",
      obj4: "Unlock new worlds",
      obj4Desc: "Progress through worlds every 25 points",

      // Power-ups
      shieldPower: "Shield Protection",
      shieldDesc: "5 seconds of invincibility - pass through enemies safely",
      autoFirePower: "Auto Fire",
      autoFireDesc: "10 seconds of automatic laser shooting",
      slowMotionPower: "Slow Motion",
      slowMotionDesc: "4 seconds of slowed time for easier navigation",
      bombPower: "Nuclear Bomb",
      bombDesc: "Instantly destroys all enemies on screen",

      // Tips
      tip1: "Stay in the middle",
      tip1Desc: "Keep your ship in the center area for better maneuverability",
      tip2: "Collect power-ups strategically",
      tip2Desc: "Save powerful abilities for difficult situations",
      tip3: "Learn enemy patterns",
      tip3Desc: "Each world has different enemy types with unique behaviors",
      tip4: "Practice makes perfect",
      tip4Desc: "The more you play, the better your reflexes become",
    },
    vi: {
      title: "HƯỚNG DẪN CHƠI",
      subtitle: "Làm chủ nghệ thuật tiến hóa vũ trụ",
      back: "Về Trang Chủ",
      controls: "Điều Khiển Game",
      controlsDesc: "Học cách điều khiển cơ bản để điều hướng tàu vũ trụ",
      objectives: "Mục Tiêu Game",
      objectivesDesc: "Hiểu nhiệm vụ và mục tiêu của bạn",
      powerups: "Hướng Dẫn Vật Phẩm",
      powerupsDesc: "Khám phá khả năng đặc biệt để nâng cao gameplay",
      worlds: "Tiến Hóa Thế Giới",
      worldsDesc: "Hành trình qua 10 thế giới chủ đề độc đáo",
      tips: "Mẹo Chuyên Nghiệp",
      tipsDesc: "Chiến lược nâng cao để đạt điểm cao",

      // Controls
      flyControl: "Bay Lên",
      flyDesc: "Click chuột, chạm màn hình, hoặc nhấn SPACE để tàu bay lên",
      shootControl: "Bắn Laser",
      shootDesc: "Nhấn phím E hoặc chạm nút bắn để bắn laser vào kẻ địch",
      pauseControl: "Tạm Dừng",
      pauseDesc: "Nhấn ESC hoặc click nút tạm dừng để dừng game",

      // Objectives
      obj1: "Sống sót càng lâu càng tốt",
      obj1Desc: "Tránh chướng ngại vật và kẻ địch để sống sót",
      obj2: "Tiêu diệt kẻ địch để lấy điểm",
      obj2Desc: "Bắn UFO, chim và kẻ địch khác để kiếm điểm",
      obj3: "Thu thập vật phẩm",
      obj3Desc: "Lấy vật phẩm bay để có khả năng đặc biệt",
      obj4: "Mở khóa thế giới mới",
      obj4Desc: "Tiến qua các thế giới mỗi 25 điểm",

      // Power-ups
      shieldPower: "Khiên Bảo Vệ",
      shieldDesc: "5 giây bất tử - đi qua kẻ địch an toàn",
      autoFirePower: "Bắn Tự Động",
      autoFireDesc: "10 giây bắn laser tự động",
      slowMotionPower: "Chậm Thời Gian",
      slowMotionDesc: "4 giây thời gian chậm để di chuyển dễ hơn",
      bombPower: "Bom Hạt Nhân",
      bombDesc: "Tiêu diệt ngay lập tức tất cả kẻ địch trên màn hình",

      // Tips
      tip1: "Ở giữa màn hình",
      tip1Desc: "Giữ tàu ở khu vực giữa để cơ động tốt hơn",
      tip2: "Thu thập vật phẩm chiến lược",
      tip2Desc: "Giữ khả năng mạnh cho tình huống khó khăn",
      tip3: "Học pattern kẻ địch",
      tip3Desc: "Mỗi thế giới có loại kẻ địch khác với hành vi riêng",
      tip4: "Luyện tập tạo nên hoàn hảo",
      tip4Desc: "Chơi càng nhiều, phản xạ càng tốt hơn",
    },
  }

  const t = texts[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="mr-2" size={20} />
            {t.back}
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-lg opacity-80">{t.subtitle}</p>
        </div>
        <div className="w-24"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 pb-12"
      >
        {/* Controls Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Gamepad2 className="mr-3 text-blue-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">{t.controls}</h2>
                <p className="opacity-80">{t.controlsDesc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white/5 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-lg mb-2">{t.flyControl}</h3>
                <p className="text-sm opacity-80">{t.flyDesc}</p>
              </motion.div>

              <motion.div
                className="bg-white/5 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">🔫</div>
                <h3 className="font-bold text-lg mb-2">{t.shootControl}</h3>
                <p className="text-sm opacity-80">{t.shootDesc}</p>
              </motion.div>

              <motion.div
                className="bg-white/5 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">⏸️</div>
                <h3 className="font-bold text-lg mb-2">{t.pauseControl}</h3>
                <p className="text-sm opacity-80">{t.pauseDesc}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Objectives Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Target className="mr-3 text-green-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">{t.objectives}</h2>
                <p className="opacity-80">{t.objectivesDesc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "💀", title: t.obj1, desc: t.obj1Desc },
                { icon: "🎯", title: t.obj2, desc: t.obj2Desc },
                { icon: "✨", title: t.obj3, desc: t.obj3Desc },
                { icon: "🌍", title: t.obj4, desc: t.obj4Desc },
              ].map((obj, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 flex items-start gap-4"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl">{obj.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{obj.title}</h3>
                    <p className="text-sm opacity-80">{obj.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Power-ups Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Star className="mr-3 text-yellow-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">{t.powerups}</h2>
                <p className="opacity-80">{t.powerupsDesc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Shield className="text-cyan-400" size={24} />,
                  title: t.shieldPower,
                  desc: t.shieldDesc,
                  color: "border-cyan-400/30 bg-cyan-400/10",
                },
                {
                  icon: <Zap className="text-yellow-400" size={24} />,
                  title: t.autoFirePower,
                  desc: t.autoFireDesc,
                  color: "border-yellow-400/30 bg-yellow-400/10",
                },
                {
                  icon: <Clock className="text-purple-400" size={24} />,
                  title: t.slowMotionPower,
                  desc: t.slowMotionDesc,
                  color: "border-purple-400/30 bg-purple-400/10",
                },
                {
                  icon: <Bomb className="text-red-400" size={24} />,
                  title: t.bombPower,
                  desc: t.bombDesc,
                  color: "border-red-400/30 bg-red-400/10",
                },
              ].map((power, index) => (
                <motion.div
                  key={index}
                  className={`rounded-xl p-6 flex items-start gap-4 border ${power.color}`}
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 rounded-lg bg-white/10">{power.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{power.title}</h3>
                    <p className="text-sm opacity-80">{power.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Pro Tips Section */}
        <motion.section variants={itemVariants}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Trophy className="mr-3 text-orange-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">{t.tips}</h2>
                <p className="opacity-80">{t.tipsDesc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.tip1, desc: t.tip1Desc, emoji: "🎯" },
                { title: t.tip2, desc: t.tip2Desc, emoji: "⚡" },
                { title: t.tip3, desc: t.tip3Desc, emoji: "🧠" },
                { title: t.tip4, desc: t.tip4Desc, emoji: "🏆" },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20"
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{tip.emoji}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-orange-300">{tip.title}</h3>
                      <p className="text-sm opacity-80">{tip.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
