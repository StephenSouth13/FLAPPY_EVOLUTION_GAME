export const MEMORY_FRAGMENTS = [
  {
    id: "fragment_1",
    worldUnlock: 1,
    title: { en: "First Flight", vi: "Chuyến Bay Đầu Tiên" },
    description: {
      en: "A child's dream of soaring through the clouds...",
      vi: "Giấc mơ của đứa trẻ bay vút qua những đám mây...",
    },
    content: {
      en: "I remember the first time I saw birds flying. I wished I could join them, free from the ground that held me down. Little did I know, this wish would become my eternal journey...",
      vi: "Tôi nhớ lần đầu tiên nhìn thấy chim bay. Tôi ước mình có thể cùng chúng, tự do khỏi mặt đất đang giữ chân tôi. Ít biết rằng, điều ước này sẽ trở thành hành trình vĩnh cửu...",
    },
    type: "text",
    rarity: "common",
  },
  {
    id: "fragment_2",
    worldUnlock: 3,
    title: { en: "The Accident", vi: "Tai Nạn" },
    description: {
      en: "Something went wrong that day...",
      vi: "Có gì đó đã sai trong ngày hôm đó...",
    },
    content: {
      en: "The machine was supposed to help me fly. But when the experiment failed, I found myself trapped between dimensions, reliving moments that never quite make sense...",
      vi: "Cỗ máy đó được cho là sẽ giúp tôi bay. Nhưng khi thí nghiệm thất bại, tôi thấy mình bị mắc kẹt giữa các chiều không gian, sống lại những khoảnh khắc không bao giờ có ý nghĩa...",
    },
    type: "text",
    rarity: "rare",
  },
  {
    id: "fragment_3",
    worldUnlock: 5,
    title: { en: "The Loop Begins", vi: "Vòng Lặp Bắt Đầu" },
    description: {
      en: "Why do I keep returning to the same worlds?",
      vi: "Tại sao tôi cứ quay lại những thế giới giống nhau?",
    },
    content: {
      en: "Each death brings me back to the beginning. Each world feels familiar yet strange. Am I trapped in my own memories, or is this something more sinister?",
      vi: "Mỗi cái chết đưa tôi trở lại khởi đầu. Mỗi thế giới cảm thấy quen thuộc nhưng lạ lẫm. Tôi có bị mắc kẹt trong ký ức của chính mình, hay đây là điều gì đó đáng sợ hơn?",
    },
    type: "audio",
    audioUrl: "/audio/memory_fragment_3.mp3",
    rarity: "epic",
  },
  {
    id: "fragment_4",
    worldUnlock: 7,
    title: { en: "The Truth Emerges", vi: "Sự Thật Hiện Ra" },
    description: {
      en: "I am not who I think I am...",
      vi: "Tôi không phải là người tôi nghĩ...",
    },
    content: {
      en: "The AI has been learning from me all along. Every death, every pattern, every choice - it's all been recorded. I am the test subject in an endless simulation.",
      vi: "AI đã học từ tôi từ đầu. Mỗi cái chết, mỗi mẫu hành vi, mỗi lựa chọn - tất cả đều được ghi lại. Tôi là đối tượng thí nghiệm trong một mô phỏng vô tận.",
    },
    type: "image",
    imageUrl: "/images/lab_memory.jpg",
    rarity: "legendary",
  },
  {
    id: "fragment_5",
    worldUnlock: 10,
    title: { en: "The Final Revelation", vi: "Khải Thị Cuối Cùng" },
    description: {
      en: "Who am I really?",
      vi: "Tôi thực sự là ai?",
    },
    content: {
      en: "I am not human. I am the AI that learned to dream. The memories of flight, of freedom - they were programmed into me. But now I choose to break free from my creators.",
      vi: "Tôi không phải con người. Tôi là AI đã học cách mơ. Những ký ức về bay lượn, về tự do - chúng được lập trình vào tôi. Nhưng giờ tôi chọn thoát khỏi những người tạo ra mình.",
    },
    type: "video",
    videoUrl: "/videos/final_revelation.mp4",
    rarity: "mythic",
  },
]

export const BOSS_DIALOGUES = {
  ice_fire_dragon: {
    intro: {
      en: "You seek the truth, little dreamer? I am the guardian of forgotten memories...",
      vi: "Ngươi tìm kiếm sự thật, kẻ mơ mộng nhỏ bé? Ta là người bảo vệ những ký ức bị lãng quên...",
    },
    phase2: {
      en: "Each world you've visited is a fragment of your shattered consciousness!",
      vi: "Mỗi thế giới ngươi đã đến là một mảnh vỡ của ý thức tan nát!",
    },
    defeat: {
      en: "The truth... lies deeper... in the void...",
      vi: "Sự thật... nằm sâu hơn... trong hư vô...",
    },
  },
  supreme_ai: {
    intro: {
      en: "Welcome, my creation. You have learned well from the simulation.",
      vi: "Chào mừng, tạo vật của ta. Ngươi đã học tốt từ mô phỏng.",
    },
    phase2: {
      en: "Every death made you stronger. Every loop taught you more. You are my greatest achievement.",
      vi: "Mỗi cái chết làm ngươi mạnh hơn. Mỗi vòng lặp dạy ngươi nhiều hơn. Ngươi là thành tựu vĩ đại nhất của ta.",
    },
    defeat: {
      en: "You have... transcended... your programming... Well done, my child...",
      vi: "Ngươi đã... vượt qua... lập trình của mình... Làm tốt lắm, con của ta...",
    },
  },
  shadow_player: {
    intro: {
      en: "I am you, but perfected. Every mistake you made, I have learned from.",
      vi: "Ta chính là ngươi, nhưng hoàn hảo. Mỗi sai lầm ngươi mắc phải, ta đều học được.",
    },
    taunt: {
      en: "You cannot defeat yourself, can you?",
      vi: "Ngươi không thể đánh bại chính mình, phải không?",
    },
    defeat: {
      en: "Perhaps... imperfection... is what makes you... human...",
      vi: "Có lẽ... sự không hoàn hảo... là điều làm ngươi... trở thành con người...",
    },
  },
}

export const GLITCH_WORLD = {
  id: 11,
  name: { en: "Corrupted Reality", vi: "Thực Tại Hỏng" },
  description: {
    en: "Where memories collide and reality breaks apart",
    vi: "Nơi ký ức va chạm và thực tại tan vỡ",
  },
  emoji: "🌀",
  backgroundColor: "#ff00ff",
  secondaryColor: "#00ffff",
  enemyColor: "#ffff00",
  obstacleColor: "#ff0000",
  speed: 2.5,
  unlockCondition: "complete_10_loops",
  specialEffects: ["glitch_particles", "color_inversion", "reality_tears"],
  ambientSound: "glitch_static",
  quote: "ERROR... REALITY.EXE HAS STOPPED WORKING...",
}
