// src/data/GrowthData.js

export const TREES_DATA = [
  {
    id: "tree_oak",
    name: "Classic Oak",
    description: "Strong and reliable. A perfect first companion.",
    unlockCount: 0, // Available immediately
    daysToGrow: 14, // Needs 14 waterings to finish
    stages: [
      { minDay: 0, image: "/Pocket-Dimension/GrowthSpot/SmallSprout.png" }, // Small Sprout
      { minDay: 4, image: "/Pocket-Dimension/GrowthSpot/BigSprout.png" }, // Sprout
      { minDay: 8, image: "/Pocket-Dimension/GrowthSpot/SmallTree.png" }, // Sapling
      { minDay: 13, image: "/Pocket-Dimension/GrowthSpot/BigTree.png" }, // Young Tree
    ],
  },
  {
    id: "tree_sakura",
    name: "Cherry Blossom",
    description: "Pink petals that dance in the wind.",
    unlockCount: 1, // Requires 1 fully grown tree to unlock
    daysToGrow: 14,
    stages: [
      { minDay: 0, image: "🌱" },
      { minDay: 3, image: "🌷" },
      { minDay: 7, image: "🌸" }, // Budding
      { minDay: 11, image: "💮" }, // Blooming
      { minDay: 14, image: "🍒" }, // Full Sakura
    ],
  },
  {
    id: "tree_willow",
    name: "Golden Willow",
    description: "A sweeping, graceful tree that loves water.",
    unlockCount: 3, // Requires 3 fully grown trees
    daysToGrow: 14,
    stages: [
      { minDay: 0, image: "🌱" },
      { minDay: 3, image: "🌿" },
      { minDay: 7, image: "🌾" },
      { minDay: 11, image: "🎋" },
      { minDay: 14, image: "🌴" },
    ],
  },
  {
    id: "tree_cosmic",
    name: "Starwood",
    description: "A tree from the Pocket Dimension itself.",
    unlockCount: 5, // Requires 5 fully grown trees
    daysToGrow: 21, // Takes longer!
    stages: [
      { minDay: 0, image: "✨" },
      { minDay: 5, image: "🌟" },
      { minDay: 10, image: "💫" },
      { minDay: 15, image: "🌌" },
      { minDay: 21, image: "🪐" },
    ],
  },
];
