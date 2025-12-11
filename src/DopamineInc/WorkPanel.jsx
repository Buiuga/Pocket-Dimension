import React from "react";
import { ITEMS_DATA } from "../data/DopamineData";

// Helper function for numbers
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return Math.floor(num);
};

// Helper to calculate percentage for display
const getPercent = (multiplier) => {
  const percent = (1 - multiplier) * 100;
  if (percent < 0.1) return "0%";
  return parseFloat(percent.toFixed(1)) + "%";
};

const getProgress = (item, cooldowns, currentTime) => {
  const readyTime = cooldowns[item.id] || 0;
  if (currentTime >= readyTime) return 0;
  const timeLeft = readyTime - currentTime;
  const percentage = 1 - timeLeft / item.duration;
  return Math.min(Math.max(percentage * 100, 0), 100);
};

const WorkPanel = ({ game }) => {
  const {
    dopamine,
    unlockedItems,
    automatedItems,
    cooldowns,
    tick,
    handleItemClick,
    handleUnlock,
    getManualCost,
    bonuses, // 1. Destructure bonuses here
  } = game;

  return (
    <>
      {/* 2. TOTAL STATS DASHBOARD (Artifacts + Memories) */}
      <div className="w-full max-w-5xl bg-black/40 border border-orange-500/30 rounded-2xl p-4 mb-8 text-center backdrop-blur-sm shadow-xl">
        <h3 className="text-orange-300 font-bold text-sm md:text-base uppercase tracking-widest mb-3">
          Total Active Boosts
        </h3>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm">
          {/* Manual Discount */}
          <div className="px-3 py-2 bg-orange-900/30 rounded-lg border border-orange-500/20 text-orange-100 flex flex-col items-center min-w-[80px]">
            <div className="text-gray-400 text-[10px] uppercase">
              Manual Cost
            </div>
            <div className="font-bold text-base md:text-lg">
              -{getPercent(bonuses.manualCostMult)}
            </div>
          </div>

          {/* Auto Discount */}
          <div className="px-3 py-2 bg-amber-900/30 rounded-lg border border-amber-500/20 text-amber-100 flex flex-col items-center min-w-[80px]">
            <div className="text-gray-400 text-[10px] uppercase">Auto Cost</div>
            <div className="font-bold text-base md:text-lg">
              -{getPercent(bonuses.autoCostMult)}
            </div>
          </div>

          {/* Cooldown Speed */}
          <div className="px-3 py-2 bg-blue-900/30 rounded-lg border border-blue-500/20 text-blue-100 flex flex-col items-center min-w-[80px]">
            <div className="text-gray-400 text-[10px] uppercase">Cooldowns</div>
            <div className="font-bold text-base md:text-lg">
              -{getPercent(bonuses.cdMult)}
            </div>
          </div>

          {/* Passive Income */}
          <div className="px-3 py-2 bg-emerald-900/30 rounded-lg border border-emerald-500/20 text-emerald-100 flex flex-col items-center min-w-[80px]">
            <div className="text-gray-400 text-[10px] uppercase">Passive</div>
            <div className="font-bold text-base md:text-lg">
              +{bonuses.passivePerSec.toFixed(1)}/s
            </div>
          </div>
        </div>
      </div>

      {/* 3. BUTTON GRID */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
        {ITEMS_DATA.map((item) => {
          const isUnlocked = unlockedItems.includes(item.id);
          const isAutomated = automatedItems.includes(item.id);
          const progress = getProgress(item, cooldowns, tick);
          const isOnCooldown = progress > 0 && progress < 100;

          const currentCost = getManualCost(item);

          // LOCKED
          if (!isUnlocked) {
            return (
              <button
                key={item.id}
                onClick={() => handleUnlock(item)}
                disabled={dopamine < currentCost}
                className={`
                  relative h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all
                  ${
                    dopamine >= currentCost
                      ? "border-orange-300/50 bg-orange-900/40 text-white cursor-pointer hover:bg-orange-900/60"
                      : "border-orange-900/30 bg-orange-950/30 text-orange-500/50 cursor-not-allowed"
                  }
                `}
              >
                <div className="font-bold text-lg mb-1">🔒 {item.name}</div>
                <div className="text-sm">
                  Cost: {formatNumber(currentCost)} ⚡
                </div>
              </button>
            );
          }

          // UNLOCKED
          return (
            <button
              key={item.id}
              onClick={() => !isAutomated && handleItemClick(item)}
              disabled={isOnCooldown || isAutomated}
              className={`
                  relative h-24 rounded-xl overflow-hidden border shadow-lg group active:scale-95 transition-transform
                  ${
                    isAutomated
                      ? "bg-amber-900/60 border-amber-500/50"
                      : "bg-orange-900/60 border-orange-500/30"
                  }
              `}
            >
              <div
                className={`absolute top-0 left-0 h-full transition-none ${
                  isAutomated ? "bg-amber-600/50" : "bg-orange-500"
                }`}
                style={{ width: `${progress}%` }}
              />
              <div className="relative z-10 w-full h-full flex items-center justify-between px-6">
                <div className="text-left">
                  <div className="font-bold text-xl text-white drop-shadow-sm">
                    {item.name}
                  </div>
                  <div
                    className={`text-xs ${
                      isAutomated ? "text-amber-200" : "text-orange-200"
                    }`}
                  >
                    {isAutomated
                      ? "Running Auto..."
                      : isOnCooldown
                      ? "Recharging..."
                      : `+${formatNumber(item.reward)} Dopamine`}
                  </div>
                </div>
                <div className="text-2xl">
                  {isAutomated ? "⚙️" : isOnCooldown ? "⏳" : "⚡"}
                </div>
              </div>
              {!isOnCooldown && !isAutomated && (
                <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default WorkPanel;
