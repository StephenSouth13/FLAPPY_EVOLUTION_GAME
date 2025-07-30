//lib/constants/enhanced-items.ts
export const ENHANCED_COMBAT_ITEMS = [
  {
    id: "triple_laser",
    name: { en: "Triple Laser", vi: "Laser Ba Nòng" },
    description: { en: "Shoots 3 lasers simultaneously", vi: "Bắn 3 tia laser cùng lúc" },
    emoji: "🔫",
    color: "#ef4444",
    duration: 10000,
    cooldown: 25000,
    effect: "triple_shot",
    rarity: "epic",
    cost: 300,
    hotkey: "R",
    tier: 2,
  },
  {
    id: "item_magnet",
    name: { en: "Item Magnet", vi: "Nam Châm Vật Phẩm" },
    description: { en: "Attracts all coins and items", vi: "Hút tất cả coin và vật phẩm" },
    emoji: "🧲",
    color: "#8b5cf6",
    duration: 8000,
    cooldown: 30000,
    effect: "magnetic_field",
    rarity: "rare",
    cost: 200,
    hotkey: "T",
    tier: 1,
  },
  {
    id: "ultimate_shield",
    name: { en: "Ultimate Shield", vi: "Khiên Tối Thượng" },
    description: { en: "Absorbs 3 hits and reflects damage", vi: "Hấp thụ 3 đòn và phản sát thương" },
    emoji: "🛡️",
    color: "#06b6d4",
    duration: 0,
    cooldown: 60000,
    effect: "reflecting_shield",
    rarity: "legendary",
    cost: 500,
    hotkey: "R",
    tier: 3,
  },
  {
    id: "reality_bomb",
    name: { en: "Reality Bomb", vi: "Bom Thực Tại" },
    description: {
      en: "Destroys everything and creates temporary safe zone",
      vi: "Phá hủy mọi thứ và tạo vùng an toàn tạm thời",
    },
    emoji: "💥",
    color: "#ff0000",
    duration: 0,
    cooldown: 120000,
    effect: "reality_clear",
    rarity: "mythic",
    cost: 800,
    hotkey: "T",
    tier: 4,
  },
  {
    id: "time_dilation_max",
    name: { en: "Chrono Field", vi: "Trường Thời Gian" },
    description: {
      en: "Extreme slow motion with bullet time effects",
      vi: "Slow motion cực mạnh với hiệu ứng bullet time",
    },
    emoji: "🌀",
    color: "#a855f7",
    duration: 5000,
    cooldown: 45000,
    effect: "chrono_field",
    rarity: "legendary",
    cost: 600,
    hotkey: "R",
    tier: 3,
  },
  {
    id: "mirror_army",
    name: { en: "Mirror Army", vi: "Quân Đoàn Gương" },
    description: { en: "Creates 3 mirror clones that confuse enemies", vi: "Tạo 3 bản sao gương làm rối loạn kẻ địch" },
    emoji: "🔄",
    color: "#22c55e",
    duration: 7000,
    cooldown: 50000,
    effect: "mirror_clones",
    rarity: "epic",
    cost: 400,
    hotkey: "T",
    tier: 2,
  },
]

export const ENHANCED_OBSTACLES = [
  // Ice Age Obstacles
  {
    worldId: 1,
    type: "ice_spike",
    emoji: "🧊",
    animation: "vertical_slide",
    behavior: "static_with_warning",
  },
  {
    worldId: 1,
    type: "frozen_tree",
    emoji: "🌲",
    animation: "sway",
    behavior: "breakable",
  },

  // Jurassic Obstacles
  {
    worldId: 2,
    type: "dino_bone",
    emoji: "🦴",
    animation: "rotate",
    behavior: "moving_vertical",
  },
  {
    worldId: 2,
    type: "volcano_rock",
    emoji: "🌋",
    animation: "pulse",
    behavior: "falling",
  },

  // Wild West Obstacles
  {
    worldId: 3,
    type: "cactus",
    emoji: "🌵",
    animation: "none",
    behavior: "static",
  },
  {
    worldId: 3,
    type: "cowboy_hat",
    emoji: "🤠",
    animation: "spin",
    behavior: "boomerang",
  },

  // Cyberpunk Obstacles
  {
    worldId: 4,
    type: "electric_wire",
    emoji: "⚡",
    animation: "spark",
    behavior: "electric_pulse",
  },
  {
    worldId: 4,
    type: "hologram",
    emoji: "📱",
    animation: "flicker",
    behavior: "phase_in_out",
  },

  // Space Obstacles
  {
    worldId: 5,
    type: "asteroid",
    emoji: "☄️",
    animation: "rotate",
    behavior: "orbital",
  },
  {
    worldId: 5,
    type: "space_station",
    emoji: "🛰️",
    animation: "rotate_slow",
    behavior: "laser_sweep",
  },
]

export const BOSS_ABILITIES = {
  rexzilla: {
    name: { en: "Rexzilla", vi: "Khủng Long Vua" },
    abilities: [
      {
        name: "earthquake_stomp",
        description: { en: "Ground shaking stomp", vi: "Dậm chân rung chuyển đất" },
        effect: "screen_shake",
        cooldown: 8000,
      },
      {
        name: "roar_stun",
        description: { en: "Stunning roar", vi: "Tiếng gầm choáng váng" },
        effect: "player_stun",
        cooldown: 12000,
      },
    ],
  },
  cowmech: {
    name: { en: "CowMech", vi: "Cao Bồi Máy" },
    abilities: [
      {
        name: "drone_swarm",
        description: { en: "Calls drone reinforcements", vi: "Gọi drone tiếp viện" },
        effect: "spawn_drones",
        cooldown: 10000,
      },
      {
        name: "lasso_trap",
        description: { en: "Lasso trap attack", vi: "Tấn công bẫy dây thòng lọng" },
        effect: "movement_restrict",
        cooldown: 15000,
      },
    ],
  },
  modern_hacker: {
    name: { en: "Modern Hacker", vi: "Hacker Hiện Đại" },
    abilities: [
      {
        name: "gravity_hack",
        description: { en: "Inverts gravity controls", vi: "Đảo ngược điều khiển trọng lực" },
        effect: "invert_controls",
        cooldown: 20000,
      },
      {
        name: "screen_glitch",
        description: { en: "Glitches the display", vi: "Làm nhiễu màn hình" },
        effect: "visual_distortion",
        cooldown: 18000,
      },
    ],
  },
}

// Định nghĩa kiểu dữ liệu cho skin
export type Skin = {
  id: string;
  name: string;
  price: number;
  // thêm các trường khác nếu có
};

// Khai báo danh sách skins (có thể nhập từ JSON hoặc tự định nghĩa)
export const skins: Skin[] = [
  { id: "skin1", name: "Skin A", price: 100 },
  { id: "skin2", name: "Skin B", price: 200 },
  // thêm skin khác nếu có
];

// Export để dùng ở nơi khác
export const ENHANCED_SKINS = skins;


