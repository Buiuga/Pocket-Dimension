import React from "react";
import { ARTIFACTS_DATA } from "../data/DopamineData";

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return Math.floor(num);
};

const ArtifactsPanel = ({ game }) => {
  // Destructure getArtifactCost
  const { dopamine, ownedArtifacts, handleBuyArtifact, getArtifactCost } = game;

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
      {ARTIFACTS_DATA.map((art) => {
        const isOwned = ownedArtifacts.includes(art.id);

        // Calculate dynamic cost using the helper logic
        const currentCost = getArtifactCost(art);

        return (
          <div
            key={art.id}
            className={`
                relative p-4 rounded-xl border flex flex-col justify-between transition-all
                ${
                  isOwned
                    ? "bg-amber-950/40 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                    : "bg-orange-900/40 border-orange-500/30"
                }
            `}
          >
            {/* Artifact Content */}
            <div className="flex gap-4 mb-4">
              {/* Photo Placeholder */}
              <div
                className={`
                    w-16 h-16 rounded-lg flex items-center justify-center text-3xl shadow-inner
                    ${
                      isOwned
                        ? "bg-amber-500/20 text-white"
                        : "bg-black/20 text-white/50 grayscale"
                    }
                `}
              >
                {art.image}
              </div>

              <div className="flex-1">
                <h3
                  className={`font-bold text-lg ${
                    isOwned ? "text-amber-100" : "text-white"
                  }`}
                >
                  {art.name}
                </h3>
                <p className="text-orange-200/80 text-xs italic mb-1">
                  {art.description}
                </p>
                <p className="text-emerald-300 text-xs font-bold">
                  Effect: {art.effect}
                </p>
              </div>
            </div>

            {/* Action Button */}
            {isOwned ? (
              <div className="w-full py-2 bg-amber-500/20 border border-amber-500/50 text-amber-200 text-center rounded-lg font-bold text-sm">
                OWNED
              </div>
            ) : (
              <button
                onClick={() => handleBuyArtifact(art)}
                disabled={dopamine < currentCost}
                className={`
                        w-full py-2 rounded-lg font-bold text-sm transition-all shadow-lg
                        ${
                          dopamine >= currentCost
                            ? "bg-amber-500 text-white hover:bg-amber-400"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }
                    `}
              >
                Buy for {formatNumber(currentCost)} ⚡
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArtifactsPanel;
