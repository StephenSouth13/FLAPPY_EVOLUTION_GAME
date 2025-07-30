"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  createdAt: string
}

export interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Demo users database
const DEMO_USERS = [
  {
    id: "1",
    email: "longquach@gmail.com",
    password: "123456",
    createdAt: new Date().toISOString(),
  },
]

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = DEMO_USERS.find((u) => u.email === email && u.password === password)

        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
          }
          set({ user: userData, isAuthenticated: true })
          return true
        }

        return false
      },

      register: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user already exists
        const existingUser = DEMO_USERS.find((u) => u.email === email)
        if (existingUser) {
          return false
        }

        // Add new user to demo database
        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          createdAt: new Date().toISOString(),
        }
        DEMO_USERS.push(newUser)

        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "flappy-evolution-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
