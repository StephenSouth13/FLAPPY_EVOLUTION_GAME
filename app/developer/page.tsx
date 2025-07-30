"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, Globe, Github, MapPin, Heart, Code, Coffee, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store/game-store"
import Link from "next/link"

export default function DeveloperPage() {
  const { darkMode, language } = useGameStore()

  const texts = {
    en: {
      title: "DEVELOPER",
      subtitle: "Meet the creator behind FLAPPY EVOLUTION",
      back: "Back to Home",
      about: "About Me",
      aboutDesc: "Passionate game developer and software engineer",
      contact: "Contact Information",
      contactDesc: "Get in touch for collaborations or feedback",
      skills: "Technical Skills",
      skillsDesc: "Technologies used to create this amazing game",
      stats: "Development Stats",
      statsDesc: "Numbers behind the creation process",

      // Personal info
      name: "Quách Thành Long",
      role: "Full-Stack Developer & Game Creator",
      location: "Ho Chi Minh City, Vietnam",
      bio: "I'm a passionate developer who loves creating interactive experiences. FLAPPY EVOLUTION represents my dedication to combining classic gameplay with modern web technologies. When I'm not coding, you can find me exploring new game mechanics and pushing the boundaries of web-based gaming.",

      // Contact
      email: "stephensouth1307@gmail.com",
      phone: "0979 137 018",
      website: "https://www.quachthanhlong.com",
      github: "https://github.com/StephenSouth13",

      // Stats
      linesOfCode: "Lines of Code",
      hoursSpent: "Hours Spent",
      cupsOfCoffee: "Cups of Coffee",
      bugsFixed: "Bugs Fixed",

      // Skills
      frontend: "Frontend Development",
      backend: "Backend Development",
      gamedev: "Game Development",
      mobile: "Mobile Development",

      // Footer
      madeWith: "Made with",
      inVietnam: "in Vietnam",
      thanks: "Thank you for playing!",
    },
    vi: {
      title: "NHÀ PHÁT TRIỂN",
      subtitle: "Gặp gỡ người tạo ra FLAPPY EVOLUTION",
      back: "Về Trang Chủ",
      about: "Về Tôi",
      aboutDesc: "Nhà phát triển game đam mê và kỹ sư phần mềm",
      contact: "Thông Tin Liên Hệ",
      contactDesc: "Liên hệ để hợp tác hoặc góp ý",
      skills: "Kỹ Năng Kỹ Thuật",
      skillsDesc: "Công nghệ được sử dụng để tạo ra game tuyệt vời này",
      stats: "Thống Kê Phát Triển",
      statsDesc: "Con số đằng sau quá trình sáng tạo",

      // Personal info
      name: "Quách Thành Long",
      role: "Lập Trình Viên Full-Stack & Tác Giả Game",
      location: "Thành phố Hồ Chí Minh, Việt Nam",
      bio: "Tôi là một lập trình viên đam mê tạo ra những trải nghiệm tương tác. FLAPPY EVOLUTION thể hiện sự cống hiến của tôi trong việc kết hợp gameplay cổ điển với công nghệ web hiện đại. Khi không lập trình, bạn có thể thấy tôi khám phá cơ chế game mới và đẩy ranh giới của game trên web.",

      // Contact
      email: "stephensouth1307@gmail.com",
      phone: "0979 137 018",
      website: "https://www.quachthanhlong.com",
      github: "https://github.com/StephenSouth13",

      // Stats
      linesOfCode: "Dòng Code",
      hoursSpent: "Giờ Làm Việc",
      cupsOfCoffee: "Tách Cà Phê",
      bugsFixed: "Lỗi Đã Sửa",

      // Skills
      frontend: "Phát Triển Frontend",
      backend: "Phát Triển Backend",
      gamedev: "Phát Triển Game",
      mobile: "Phát Triển Mobile",

      // Footer
      madeWith: "Được tạo với",
      inVietnam: "tại Việt Nam",
      thanks: "Cảm ơn bạn đã chơi!",
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

  const skills = [
    { name: "Next.js", level: 95, color: "bg-blue-500" },
    { name: "TypeScript", level: 90, color: "bg-blue-600" },
    { name: "React", level: 95, color: "bg-cyan-500" },
    { name: "TailwindCSS", level: 90, color: "bg-teal-500" },
    { name: "Canvas API", level: 85, color: "bg-purple-500" },
    { name: "Zustand", level: 88, color: "bg-orange-500" },
    { name: "Framer Motion", level: 85, color: "bg-pink-500" },
    { name: "Node.js", level: 88, color: "bg-green-500" },
  ]

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
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mb-12 text-center">
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-6xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            👨‍💻
          </motion.div>
          <h2 className="text-4xl font-bold mb-2">{t.name}</h2>
          <p className="text-xl text-cyan-300 mb-4">{t.role}</p>
          <div className="flex items-center justify-center gap-2 text-lg opacity-80">
            <MapPin size={20} />
            <span>{t.location}</span>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Heart className="mr-3 text-red-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">{t.about}</h2>
                <p className="opacity-80">{t.aboutDesc}</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-90">{t.bio}</p>
          </div>
        </motion.section>

        {/* Contact & Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Section */}
          <motion.section variants={itemVariants}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 h-full">
              <div className="flex items-center mb-6">
                <Mail className="mr-3 text-blue-400" size={32} />
                <div>
                  <h2 className="text-2xl font-bold">{t.contact}</h2>
                  <p className="opacity-80">{t.contactDesc}</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.a
                  href={`mailto:${t.email}`}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Mail className="text-blue-400" size={24} />
                  <span>{t.email}</span>
                </motion.a>

                <motion.a
                  href={`tel:${t.phone}`}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Phone className="text-green-400" size={24} />
                  <span>{t.phone}</span>
                </motion.a>

                <motion.a
                  href={t.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Globe className="text-purple-400" size={24} />
                  <span>quachthanhlong.com</span>
                </motion.a>

                <motion.a
                  href={t.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Github className="text-gray-400" size={24} />
                  <span>StephenSouth13</span>
                </motion.a>
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section variants={itemVariants}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 h-full">
              <div className="flex items-center mb-6">
                <Star className="mr-3 text-yellow-400" size={32} />
                <div>
                  <h2 className="text-2xl font-bold">{t.stats}</h2>
                  <p className="opacity-80">{t.statsDesc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 text-center border border-blue-500/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Code className="mx-auto mb-2 text-blue-400" size={32} />
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-sm opacity-80">{t.linesOfCode}</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6 text-center border border-green-500/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm opacity-80">{t.hoursSpent}</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 text-center border border-orange-500/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Coffee className="mx-auto mb-2 text-orange-400" size={32} />
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-sm opacity-80">{t.cupsOfCoffee}</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 text-center border border-pink-500/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-2">🐛</div>
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-sm opacity-80">{t.bugsFixed}</div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Skills Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <Code className="mr-3 text-green-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">{t.skills}</h2>
                <p className="opacity-80">{t.skillsDesc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-sm opacity-80">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className={`h-3 rounded-full ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.section variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-8 border border-red-500/30">
            <motion.div
              className="flex items-center justify-center gap-2 text-xl mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span>{t.madeWith}</span>
              <Heart className="text-red-400" size={24} />
              <span>{t.inVietnam}</span>
            </motion.div>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text">
              {t.thanks}
            </p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
