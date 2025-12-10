import React from "react";
import { AUTOMATION_DATA, ITEMS_DATA } from "../data/DopamineData";

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return Math.floor(num);
};

const AutomationPanel = ({ game }) => {
  // 1. Get the helper function
  const {
    dopamine,
    unlockedItems,
    automatedItems,
    handleBuyAutomation,
    getAutoCost,
  } = game;

  return (
    <div className="w-full max-w-4xl flex flex-col gap-3 pb-20">
      {AUTOMATION_DATA.map((auto) => {
        const targetsUnlocked = auto.targets.every((tId) =>
          unlockedItems.includes(tId)
        );
        const isBought = auto.targets.some((tId) =>
          automatedItems.includes(tId)
        );

        const requiredItemName =
          ITEMS_DATA.find((i) => i.id === auto.targets[0])?.name ||
          "Unknown Item";

        // 2. Calculate the specific cost for this item
        const currentCost = getAutoCost(auto);

        // 3. NEW: Get the actual names of the target items
        const targetNames = auto.targets
          .map((tId) => ITEMS_DATA.find((i) => i.id === tId)?.name)
          .join(" & ");

        return (
          <div
            key={auto.id}
            className={`
              p-4 rounded-xl flex items-center justify-between border transition-all
              ${
                targetsUnlocked
                  ? "bg-orange-900/40 border-orange-500/30"
                  : "bg-gray-900/40 border-gray-700/30 opacity-60"
              }
            `}
          >
            <div>
              <h3
                className={`text-xl font-bold ${
                  targetsUnlocked ? "text-white" : "text-gray-400"
                }`}
              >
                {auto.name}
              </h3>
              <p
                className={`${
                  targetsUnlocked ? "text-orange-200" : "text-gray-500"
                } text-sm`}
              >
                {/* Display the real names here */}
                Automates: {targetNames}
              </p>
            </div>

            {isBought ? (
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 px-4 py-2 rounded-lg font-bold text-sm">
                ACTIVE ✅
              </div>
            ) : targetsUnlocked ? (
              <button
                onClick={() => handleBuyAutomation(auto)}
                // 3. Use currentCost here
                disabled={dopamine < currentCost}
                className={`
                    px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg
                    ${
                      dopamine >= currentCost
                        ? "bg-amber-500 text-white hover:bg-amber-400"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }
                `}
              >
                {/* 4. Display currentCost here */}
                Buy {formatNumber(currentCost)} ⚡
              </button>
            ) : (
              <div className="px-4 py-2 rounded-lg font-bold text-xs bg-gray-800 text-gray-500 border border-gray-700 text-center">
                🔒 Requires <br /> {requiredItemName}
              </div>
            )}
          </div>
        );
      })}

      {AUTOMATION_DATA.every((a) => !unlockedItems.includes(a.targets[0])) && (
        <div className="text-center text-orange-200 mt-10">
          Unlock more items to see automation upgrades!
        </div>
      )}
    </div>
  );
};

export default AutomationPanel;
