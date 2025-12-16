// src/data/GrowthData.js

// The Base Image Path (Reuse this variable to keep code clean)
const BASE_PATH = "/Pocket-Dimension/GrowthSpot";

export const TREES_DATA = [
  {
    id: "tree_oak",
    name: "Classic Oak",
    description: "Strong and reliable. A perfect first companion.",
    unlockCount: 0,
    daysToGrow: 14,
    // No filter needed, this is the original green
    colorFilter: "none",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
  {
    id: "tree_willow",
    name: "Golden Willow",
    description: "A sweeping, graceful tree that loves water.",
    unlockCount: 1,
    daysToGrow: 14,
    colorFilter: "hue-rotate(-50deg) saturate(2.5) sepia(0.3)",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
  {
    id: "tree_sakura",
    name: "Cherry Blossom",
    description: "Pink petals that dance in the wind.",
    unlockCount: 2,
    daysToGrow: 14,
    colorFilter: "sepia(1) hue-rotate(290deg) saturate(3) brightness(1.25)",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
  {
    id: "tree_moon",
    name: "Moonbloom",
    description: "It grows quietly under silver light.",
    unlockCount: 5,
    daysToGrow: 14,
    colorFilter: "hue-rotate(120deg) contrast(1.5) brightness(1)",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
  {
    id: "tree_ember",
    name: "Emberwood",
    description: "Warm, fierce, and impossible to ignore.",
    unlockCount: 7,
    daysToGrow: 14,
    colorFilter: "sepia(1) hue-rotate(-10deg) saturate(4) brightness(1.2)",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
  {
    id: "tree_sun",
    name: "Sun's Grace",
    description: "A reminder that change can be beautiful.",
    unlockCount: 8,
    daysToGrow: 14,
    colorFilter: "sepia(1) hue-rotate(15deg) saturate(3) brightness(1.1)",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
  {
    id: "tree_cosmic",
    name: "Starwood",
    description: "A tree from the Pocket Dimension itself.",
    unlockCount: 10,
    daysToGrow: 14,
    colorFilter: "hue-rotate(190deg) contrast(1.2) brightness(1.1)",
    stages: [
      { minDay: 0, image: `${BASE_PATH}/SmallSprout.png` },
      { minDay: 4, image: `${BASE_PATH}/BigSprout.png` },
      { minDay: 8, image: `${BASE_PATH}/SmallTree.png` },
      { minDay: 13, image: `${BASE_PATH}/BigTree.png` },
    ],
  },
];
