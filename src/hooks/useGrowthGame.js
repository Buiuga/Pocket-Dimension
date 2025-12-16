import { useState, useEffect } from "react";
import { TREES_DATA } from "../data/GrowthData";

// THE RULES
const COOLDOWN_TIME = 24 * 60 * 60 * 1000;
// const COOLDOWN_TIME = 1 * 1000; // Testing

export const useGrowthGame = () => {
  // --- STATE ---
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem("growth_save");
    let parsed = saved ? JSON.parse(saved) : null;

    // Default State
    const defaultState = {
      currentTreeId: null,
      growthCount: 0,
      lastWatered: 0,
      grownTrees: [], // NEW: Array to store history
    };

    if (!parsed) return defaultState;

    // --- MIGRATION ---
    if (
      parsed.totalTreesGrown > 0 &&
      (!parsed.grownTrees || parsed.grownTrees.length === 0)
    ) {
      parsed.grownTrees = Array(parsed.totalTreesGrown).fill("tree_oak");
    }

    // Ensure the new array exists
    return { ...defaultState, ...parsed };
  });

  const [timeString, setTimeString] = useState("");
  const [isReady, setIsReady] = useState(false);

  // --- SAVE SYSTEM ---
  useEffect(() => {
    localStorage.setItem("growth_save", JSON.stringify(gameState));
  }, [gameState]);

  // --- TIMER LOOP ---
  useEffect(() => {
    const checkTimer = () => {
      const now = Date.now();

      if (!gameState.currentTreeId) {
        setIsReady(true);
        setTimeString("");
        return;
      }

      const diff = now - gameState.lastWatered;
      const remaining = COOLDOWN_TIME - diff;

      if (remaining <= 0) {
        setIsReady(true);
        setTimeString("Ready!");
      } else {
        setIsReady(false);
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeString(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 1000);
    return () => clearInterval(interval);
  }, [gameState.lastWatered, gameState.currentTreeId]);

  // --- ACTIONS ---

  const plantTree = (treeId) => {
    setGameState((prev) => ({
      ...prev,
      currentTreeId: treeId,
      growthCount: 0,
      lastWatered: 0,
    }));
  };

  const waterTree = () => {
    const now = Date.now();
    const timeSinceLastWater = now - gameState.lastWatered;

    if (gameState.lastWatered !== 0 && timeSinceLastWater < COOLDOWN_TIME) {
      return;
    }

    setIsReady(false);
    setTimeString("23h 59m 59s");

    setGameState((prev) => ({
      ...prev,
      growthCount: prev.growthCount + 1,
      lastWatered: now,
    }));
  };

  const harvestTree = () => {
    setGameState((prev) => ({
      ...prev,
      // Add the current tree ID to the history array
      grownTrees: [...prev.grownTrees, prev.currentTreeId],
      currentTreeId: null,
      growthCount: 0,
      lastWatered: 0,
    }));
  };

  // --- DERIVED DATA ---
  const currentTreeData = TREES_DATA.find(
    (t) => t.id === gameState.currentTreeId
  );

  const isFullyGrown = currentTreeData
    ? gameState.growthCount >= currentTreeData.daysToGrow
    : false;

  const getCurrentStageImage = () => {
    if (!currentTreeData) return null;
    const stage = [...currentTreeData.stages]
      .reverse()
      .find((s) => gameState.growthCount >= s.minDay);
    return stage ? stage.image : currentTreeData.stages[0].image;
  };

  return {
    gameState,
    currentTreeData,
    isReady,
    timeString,
    isFullyGrown,
    getCurrentStageImage,
    plantTree,
    waterTree,
    harvestTree,
  };
};
