import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FLAPPY EVOLUTION: Space Shooter",
  description:
    "An addictive web game combining Flappy Bird mechanics with space shooting action. Journey through 10 evolving worlds!",
  keywords: "game, flappy bird, space shooter, web game, evolution, worlds",
  authors: [{ name: "Quách Thành Long", url: "mailto:stephensouth1307@gmail.com" }],
  openGraph: {
    title: "FLAPPY EVOLUTION: Space Shooter",
    description: "Journey through 10 evolving worlds in this addictive space shooter game!",
    type: "website",
    url: "https://www.quachthanhlong.com/flappy-evolution",
  },
    generator: 'quachthanhlong'

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
