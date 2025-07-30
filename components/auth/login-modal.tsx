"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/lib/store/auth-store"
import { useGameStore } from "@/lib/store/game-store"

interface LoginModalProps {
  onClose: () => void
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, register } = useAuthStore()
  const { language } = useGameStore()

  const texts = {
    en: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginButton: "Login",
      registerButton: "Create Account",
      switchToRegister: "Don't have an account? Register",
      switchToLogin: "Already have an account? Login",
      demoAccount: "Demo Account",
      demoEmail: "longquach@gmail.com",
      demoPassword: "123456",
      useDemoAccount: "Use Demo Account",
      invalidCredentials: "Invalid email or password",
      passwordMismatch: "Passwords don't match",
      accountCreated: "Account created successfully!",
      loginSuccess: "Login successful!",
    },
    vi: {
      login: "Đăng Nhập",
      register: "Đăng Ký",
      email: "Email",
      password: "Mật Khẩu",
      confirmPassword: "Xác Nhận Mật Khẩu",
      loginButton: "Đăng Nhập",
      registerButton: "Tạo Tài Khoản",
      switchToRegister: "Chưa có tài khoản? Đăng ký",
      switchToLogin: "Đã có tài khoản? Đăng nhập",
      demoAccount: "Tài Khoản Demo",
      demoEmail: "longquach@gmail.com",
      demoPassword: "123456",
      useDemoAccount: "Dùng Tài Khoản Demo",
      invalidCredentials: "Email hoặc mật khẩu không đúng",
      passwordMismatch: "Mật khẩu không khớp",
      accountCreated: "Tạo tài khoản thành công!",
      loginSuccess: "Đăng nhập thành công!",
    },
  }

  const t = texts[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password)
        if (success) {
          onClose()
        } else {
          setError(t.invalidCredentials)
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError(t.passwordMismatch)
          setLoading(false)
          return
        }
        const success = await register(formData.email, formData.password)
        if (success) {
          setError(t.accountCreated)
          setTimeout(() => {
            setIsLogin(true)
            setError("")
          }, 1500)
        }
      }
    } catch (err) {
      setError(t.invalidCredentials)
    }

    setLoading(false)
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    const success = await login("longquach@gmail.com", "123456")
    if (success) {
      onClose()
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white max-w-md w-full border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{isLogin ? t.login : t.register}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X size={20} />
          </Button>
        </div>

        {/* Demo Account Info */}
        <div className="bg-blue-500/20 rounded-lg p-4 mb-6 border border-blue-500/30">
          <h3 className="font-semibold mb-2 text-blue-300">{t.demoAccount}</h3>
          <p className="text-sm opacity-80 mb-2">
            {t.demoEmail}: <span className="font-mono">{t.demoEmail}</span>
          </p>
          <p className="text-sm opacity-80 mb-3">
            {t.demoPassword}: <span className="font-mono">{t.demoPassword}</span>
          </p>
          <Button onClick={handleDemoLogin} disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600">
            {t.useDemoAccount}
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="email"
              placeholder={t.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={t.password}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={t.confirmPassword}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center text-sm p-2 rounded ${
                error.includes("success") ? "text-green-400 bg-green-500/20" : "text-red-400 bg-red-500/20"
              }`}
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold py-3"
          >
            {loading ? "..." : isLogin ? t.loginButton : t.registerButton}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
              setFormData({ email: "", password: "", confirmPassword: "" })
            }}
            className="text-cyan-300 hover:text-cyan-200 hover:bg-white/10"
          >
            {isLogin ? t.switchToRegister : t.switchToLogin}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
