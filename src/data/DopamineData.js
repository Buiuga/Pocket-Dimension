// src/data/dopamineData.js

export const ITEMS_DATA = [
  // --- PHASE 1: The Fruit Stand (Fast & Clicky) ---
  {
    id: "item_1",
    name: "Ripe Banana",
    unlockCost: 0,
    reward: 1,
    duration: 600, // 0.6s (Very fast)
  },
  {
    id: "item_2",
    name: "Yellow Apple",
    unlockCost: 50,
    reward: 3,
    duration: 1000, // 1s
  },
  {
    id: "item_3",
    name: "Red Grape",
    unlockCost: 250,
    reward: 8,
    duration: 1500, // 1.5s
  },
  {
    id: "item_4",
    name: "Egg",
    unlockCost: 1000,
    reward: 20,
    duration: 2000, // 2s
  },
  {
    id: "item_5",
    name: "Yoghurt",
    unlockCost: 2500,
    reward: 45,
    duration: 2500, // 2.5s
  },

  // --- PHASE 2: The Kitchen (The Grind Begins) ---
  {
    id: "item_6",
    name: "Nuts",
    unlockCost: 7500,
    reward: 120,
    duration: 3000, // 3s
  },
  {
    id: "item_7",
    name: "Coffee",
    unlockCost: 20000,
    reward: 250,
    duration: 3500,
  },
  {
    id: "item_8",
    name: "Rose Wine",
    unlockCost: 50000,
    reward: 600,
    duration: 3500,
  },
  {
    id: "item_9",
    name: "Salad",
    unlockCost: 120000,
    reward: 1200,
    duration: 4000, // 4s
  },
  {
    id: "item_10",
    name: "Plum",
    unlockCost: 300000,
    reward: 2500,
    duration: 4000,
  },

  // --- PHASE 3: The Bakery (Mid-Game / Artifact Hunting) ---
  // At this point, she should be buying the expensive Artifacts (100k - 1M)
  {
    id: "item_11",
    name: "Taco",
    unlockCost: 600000,
    reward: 4500,
    duration: 4500, // 4.5s
  },
  {
    id: "item_12",
    name: "Jam Donut",
    unlockCost: 1500000, // 1.5M
    reward: 10000,
    duration: 4500,
  },
  {
    id: "item_13",
    name: "Vanilla Donut",
    unlockCost: 3000000, // 3M
    reward: 22000,
    duration: 5000, // 5s (Max drag)
  },
  {
    id: "item_14",
    name: "Molded Cheese",
    unlockCost: 7500000, // 7.5M
    reward: 50000,
    duration: 5000,
  },

  // --- PHASE 4: Luxury (High End Automation) ---
  {
    id: "item_15",
    name: "Pesto Pizza",
    unlockCost: 15000000, // 15M
    reward: 110000,
    duration: 5000,
  },
  {
    id: "item_16",
    name: "Spicy Food",
    unlockCost: 35000000, // 35M
    reward: 250000,
    duration: 5000,
  },
  {
    id: "item_17",
    name: "Kebab",
    unlockCost: 75000000, // 75M
    reward: 600000,
    duration: 5000,
  },
  {
    id: "item_18",
    name: "Caramel Boba",
    unlockCost: 150000000, // 150M
    reward: 1200000, // 1.2M
    duration: 5000,
  },

  // --- PHASE 5: End Game (The Final Stretch) ---
  {
    id: "item_19",
    name: "Swedish Macaroons",
    unlockCost: 300000000, // 300M
    reward: 2500000, // 2.5M
    duration: 5000,
  },
  {
    id: "item_20",
    name: "Choco Latte",
    unlockCost: 600000000, // 600M
    reward: 5500000, // 5.5M
    duration: 5000,
  },
  {
    id: "item_21",
    name: "Carrot Cake",
    unlockCost: 1000000000, // 1 Billion
    reward: 12000000, // 12M
    duration: 5000,
  },
  {
    id: "item_22",
    name: "Writing Realms",
    unlockCost: 2500000000, // 2.5 Billion
    reward: 35000000, // 35M
    duration: 5000,
  },
];

// --- BALANCED AUTOMATION (Approx 8x - 10x Item Unlock Cost) ---
export const AUTOMATION_DATA = [
  { id: "auto_1", name: "Banana Grove", cost: 250, targets: ["item_1"] },
  {
    id: "auto_2",
    name: "Golden Apple Orchard",
    cost: 500, // Kept cheap to hook the player early
    targets: ["item_2"],
  },
  {
    id: "auto_3",
    name: "Royal Grape Vineyard",
    cost: 2500,
    targets: ["item_3"],
  },
  { id: "auto_4", name: "Sunrise Egg Farm", cost: 10000, targets: ["item_4"] },
  {
    id: "auto_5",
    name: "Creamy Yogurt Workshop",
    cost: 25000,
    targets: ["item_5"],
  },
  {
    id: "auto_6",
    name: "Woodland Nut Grove",
    cost: 75000,
    targets: ["item_6"],
  },
  {
    id: "auto_7",
    name: "Artisan Coffee Roaster",
    cost: 200000,
    targets: ["item_7"],
  },
  { id: "auto_8", name: "Rosé Winery", cost: 500000, targets: ["item_8"] },
  {
    id: "auto_9",
    name: "Fresh Greens Garden",
    cost: 1200000, // 1.2M
    targets: ["item_9"],
  },
  {
    id: "auto_10",
    name: "Plum Blossom Orchard",
    cost: 3000000, // 3M
    targets: ["item_10"],
  },
  {
    id: "auto_11",
    name: "Street Taco Cart",
    cost: 6000000, // 6M
    targets: ["item_11"],
  },
  {
    id: "auto_12",
    name: "Donut Shop",
    cost: 35000000, // 35M (Automates TWO expensive items)
    targets: ["item_12", "item_13"],
  },
  {
    id: "auto_13",
    name: "Cave-Aged Cheese Cellar",
    cost: 75000000, // 75M
    targets: ["item_14"],
  },
  {
    id: "auto_14",
    name: "Stonefire Pesto Pizzeria",
    cost: 150000000, // 150M
    targets: ["item_15"],
  },
  {
    id: "auto_15",
    name: "Inferno Spice Kitchen",
    cost: 350000000, // 350M
    targets: ["item_16"],
  },
  {
    id: "auto_16",
    name: "Midnight Kebab Grill",
    cost: 750000000, // 750M
    targets: ["item_17"],
  },
  {
    id: "auto_17",
    name: "Boba Shop",
    cost: 1500000000, // 1.5 Billion
    targets: ["item_18"],
  },
  {
    id: "auto_18",
    name: "Nordic Macaroon Atelier",
    cost: 3000000000, // 3 Billion
    targets: ["item_19"],
  },
  {
    id: "auto_19",
    name: "Milkshake Shop",
    cost: 6000000000, // 6 Billion
    targets: ["item_20"],
  },
  {
    id: "auto_20",
    name: "Cake Shop",
    cost: 10000000000, // 10 Billion
    targets: ["item_21"],
  },
  {
    id: "auto_21",
    name: "Writers & Editors",
    cost: 25000000000, // 25 Billion
    targets: ["item_22"],
  },
];

// Artifacts Data
export const ARTIFACTS_DATA = [
  {
    id: "art_1",
    name: "Potato Scaling Trophy",
    cost: 5000, // Increased to fit Phase 1
    description: "Your humble Trophy.",
    effect: "Cooldowns -5%",
    image: "🏆",
  },
  {
    id: "art_2",
    name: "Ikea Bag",
    cost: 15000, // Fits around Coffee
    description: "Take the blue one.",
    effect: "Manual Unlock Cost -5%",
    image: "🛍️",
  },
  {
    id: "art_3",
    name: "Bolg",
    cost: 50000, // Fits around Rose Wine
    description: "Bolg sound strong name.",
    effect: "Automation Cost -5%",
    image: "👹",
  },
  {
    id: "art_4",
    name: "Ogrul",
    cost: 150000, // Fits around Salad/Plum
    description: "Not the sharpest orc in the horde",
    effect: "Artifact Costs -15%",
    image: "🧌",
  },
  {
    id: "art_5",
    name: "Pioner (Peony)",
    cost: 500000, // Fits around Taco
    description: "This is for your mom",
    effect: "Manual Unlock Cost -10%",
    image: "🌸",
  },
  {
    id: "art_6",
    name: "Blåklockor (Bellflower)",
    cost: 1500000, // 1.5M - Fits around Jam Donut
    description: "This is for you",
    effect: "Automation Cost -10%",
    image: "🪻",
  },
  {
    id: "art_7",
    name: "Balou",
    cost: 10000000, // 10M - Fits around Pesto Pizza
    description: "Cute and Manly.",
    effect: "Cooldowns -10%",
    image: "🐻",
  },
  {
    id: "art_8",
    name: "Baghera",
    cost: 50000000, // 50M - Late Game helper
    description: "Handsome Boy.",
    // BUFFED: 100 is too low for late game. Made it 10k.
    effect: "+10k dop/sec (+25k w/ Doris)",
    image: "🐈‍⬛",
  },
  {
    id: "art_9",
    name: "Doris",
    cost: 50000000, // 50M
    description: "Delusional Girl.",
    // BUFFED: 100 is too low for late game. Made it 10k.
    effect: "+10k dop/sec (+25k w/ Baghera)",
    image: "🐈",
  },
  {
    id: "art_10",
    name: "Creator's Favor",
    cost: 500000000, // 500M - The final hurdle before Billions
    description: "The creator waves at you!",
    effect: "Cooldowns -10%, All Costs -10%",
    image: "✨",
  },
];

//CheckpointsData.js

export const CHECKPOINTS_DATA = [
  // --- EARLY GAME (The Hook) ---
  {
    id: "cp_1",
    threshold: 1000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint1.png",
    title: "Terraria",
  },
  {
    id: "cp_2",
    threshold: 10000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint2.png",
    title: "Movie Night!",
  },
  {
    id: "cp_3",
    threshold: 50000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint3.png",
    title: "Portal Guns Pew Pew",
  },
  {
    id: "cp_4",
    threshold: 150000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint4.png",
    title: "Paparazzi",
  },

  // --- MID GAME (The Grind) ---
  {
    id: "cp_5",
    threshold: 500000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint5.png",
    title: "She's the catch",
  },
  {
    id: "cp_6",
    threshold: 1500000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint6.png",
    title: "Winged Goth GF",
  },
  {
    id: "cp_7",
    threshold: 5000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint7.png",
    title: "Fast and Furious",
  },
  {
    id: "cp_8",
    threshold: 15000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint8.png",
    title: "Help i am being captive",
  },
  {
    id: "cp_9",
    threshold: 35000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint9.png",
    title: "Free photos with Harambe",
  },

  // --- LATE GAME (The Push for Billions) ---
  {
    id: "cp_10",
    threshold: 75000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint10.png",
    title: "Struggling..",
  },
  {
    id: "cp_11",
    threshold: 150000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint11.png",
    title: "Heeelp im falling",
  },
  {
    id: "cp_12",
    threshold: 300000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint12.png",
    title: "First time matching outfits!",
  },
  {
    id: "cp_13",
    threshold: 600000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint13.png",
    title: "Just Chillin'",
  },
  {
    id: "cp_14",
    threshold: 1200000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint14.png",
    title: "Kinda cute",
  },
  {
    id: "cp_15",
    threshold: 2000000000,
    image: "/Pocket-Dimension/DopamineInc/checkpoints/checkpoint15.png",
    title: "Best moment",
  },
];
