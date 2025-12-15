/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGrowthGame } from "./hooks/useGrowthGame";
import { TREES_DATA } from "./data/GrowthData";

const GrowthSpot = () => {
  const navigate = useNavigate();
  const {
    gameState,
    currentTreeData,
    isReady,
    timeString,
    isFullyGrown,
    getCurrentStageImage,
    plantTree,
    waterTree,
    harvestTree,
  } = useGrowthGame();

  const [activeModal, setActiveModal] = useState(null); // 'menu' (seeds) or 'forest' (collection)

  // --- HANDLERS ---
  const handleMainAction = () => {
    if (!currentTreeData) {
      setActiveModal("menu");
    } else if (isFullyGrown) {
      harvestTree();
    } else {
      waterTree();
    }
  };

  const handleSelectSeed = (treeId) => {
    plantTree(treeId);
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0C4A6E] via-[#38BDF8] to-[#fef9c3] relative overflow-hidden flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-white/80 hover:text-white text-xl transition-colors z-20"
      >
        ← Back
      </button>

      {/* NEW: Forest Collection Button (Top Right) */}
      <button
        onClick={() => setActiveModal("forest")}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-4 py-2 rounded-full font-bold text-sm transition-all z-20 shadow-lg flex items-center gap-2"
      >
        🌲 My Forest
        <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
          {gameState.totalTreesGrown}
        </span>
      </button>

      {/* HEADER CARD */}
      <div className="mt-16 z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold text-white drop-shadow-md mb-2">
            There You Grow
          </h1>
          <div className="text-sky-100 font-medium text-sm">
            {currentTreeData ? (
              <div className="flex flex-col gap-1">
                <span>Nurturing: {currentTreeData.name}</span>
                <span className="text-yellow-100 font-bold text-lg">
                  Day {gameState.growthCount} / {currentTreeData.daysToGrow}
                </span>
              </div>
            ) : (
              "You are not the only one growing."
            )}
          </div>
        </motion.div>
      </div>

      {/* THE SCENE (Tree & Ground) */}
      {/* FIXED: Reduced pb-52 to pb-40 to bring tree closer to grass */}
      <div className="flex-1 w-full flex flex-col justify-end items-center relative pb-40">
        {/* The Tree Visual */}
        <AnimatePresence mode="wait">
          {currentTreeData ? (
            <motion.div
              key={gameState.growthCount}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              // Adjusted margin to sit perfectly on grass
              className="text-9xl md:text-[12rem] filter drop-shadow-2xl z-10 translate-y-4"
            >
              {getCurrentStageImage()}
            </motion.div>
          ) : (
            <div className="text-white/50 text-sm mb-10 font-bold tracking-widest uppercase z-10">
              Plot Empty
            </div>
          )}
        </AnimatePresence>

        {/* The Ground */}
        <div className="absolute bottom-0 w-[120%] h-48 bg-gradient-to-t from-emerald-800 to-emerald-600 rounded-[50%] -mb-12 shadow-inner border-t-4 border-emerald-400/30"></div>
      </div>

      {/* MAIN ACTION BUTTON */}
      <div className="absolute bottom-10 z-20 w-full flex justify-center px-4">
        {!currentTreeData ? (
          <button
            onClick={handleMainAction}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-12 rounded-full shadow-lg text-xl transition-all hover:scale-105"
          >
            🌱 Plant a Tree
          </button>
        ) : isFullyGrown ? (
          <button
            onClick={handleMainAction}
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 px-12 rounded-full shadow-lg text-xl transition-all hover:scale-105 animate-bounce"
          >
            🪓 Harvest & Collect
          </button>
        ) : (
          <button
            onClick={handleMainAction}
            disabled={!isReady}
            className={`
                py-4 px-8 rounded-full shadow-lg text-lg font-bold transition-all flex flex-col items-center min-w-[200px]
                ${
                  isReady
                    ? "bg-blue-500 hover:bg-blue-400 text-white hover:scale-105"
                    : "bg-gray-600/90 text-gray-300 cursor-not-allowed border border-white/20 backdrop-blur-md"
                }
              `}
          >
            {isReady ? (
              <span>💧 Water Tree</span>
            ) : (
              <>
                <span className="text-xs uppercase tracking-widest opacity-80">
                  Next Water In
                </span>
                <span className="font-mono text-xl">{timeString}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* MODALS (Menu & Forest) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            />

            {/* 1. SEED SELECTION MODAL */}
            {activeModal === "menu" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md relative z-10 max-h-[80vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold text-sky-900 mb-4 text-center">
                  Choose a Seed
                </h2>

                <div className="space-y-3">
                  {TREES_DATA.map((tree) => {
                    const isUnlocked =
                      gameState.totalTreesGrown >= tree.unlockCount;

                    return (
                      <button
                        key={tree.id}
                        onClick={() => isUnlocked && handleSelectSeed(tree.id)}
                        disabled={!isUnlocked}
                        className={`
                              w-full p-4 rounded-xl border-2 flex items-center gap-4 text-left transition-all
                              ${
                                isUnlocked
                                  ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100 cursor-pointer"
                                  : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                              }
                          `}
                      >
                        <div className="text-3xl bg-white p-2 rounded-full shadow-sm">
                          {isUnlocked
                            ? tree.stages[tree.stages.length - 1].image
                            : "🔒"}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {tree.name}
                          </h3>
                          {isUnlocked ? (
                            <p className="text-sm text-gray-600">
                              {tree.description}
                            </p>
                          ) : (
                            // FIXED: Shows progress (e.g., 1/3)
                            <p className="text-sm text-red-400 font-bold">
                              Requires {tree.unlockCount} trees (
                              {gameState.totalTreesGrown}/{tree.unlockCount})
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="mt-6 w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {/* 2. MY FOREST MODAL */}
            {activeModal === "forest" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md relative z-10 max-h-[80vh] overflow-y-auto text-center"
              >
                <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                  My Forest
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Total Trees Grown:{" "}
                  <span className="font-bold text-emerald-600 text-lg">
                    {gameState.totalTreesGrown}
                  </span>
                </p>

                {gameState.totalTreesGrown === 0 ? (
                  <div className="py-10 text-gray-400 italic">
                    No trees yet. Start planting! 🌱
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-2 justify-items-center max-h-60 overflow-y-auto p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                    {/* Render a tree emoji for every tree grown */}
                    {Array.from({ length: gameState.totalTreesGrown }).map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="text-2xl"
                          title="A tree you grew!"
                        >
                          🌲
                        </motion.div>
                      )
                    )}
                  </div>
                )}

                <button
                  onClick={() => setActiveModal(null)}
                  className="mt-6 w-full py-3 bg-emerald-100 hover:bg-emerald-200 rounded-xl font-bold text-emerald-800 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrowthSpot;
