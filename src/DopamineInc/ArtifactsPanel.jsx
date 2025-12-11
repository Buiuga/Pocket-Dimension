import React, { useMemo } from "react";
import { ARTIFACTS_DATA } from "../data/DopamineData";

const formatNumber = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return Math.floor(num);
};

// Helper to turn a multiplier (e.g. 0.85) into a discount string (e.g. "15%")
const getPercent = (multiplier) => {
  const percent = (1 - multiplier) * 100;
  if (percent < 0.1) return "0%";
  return parseFloat(percent.toFixed(1)) + "%";
};

const ArtifactsPanel = ({ game }) => {
  const { dopamine, ownedArtifacts, handleBuyArtifact, getArtifactCost } = game;

  const ownedCount = ownedArtifacts.length;
  const totalCount = ARTIFACTS_DATA.length;

  // Calculate bonuses ONLY from Artifacts for this display
  const artifactStats = useMemo(() => {
    let cdMult = 1.0;
    let manualMult = 1.0;
    let autoMult = 1.0;
    let artMult = 1.0;
    let passive = 0;

    // Cooldowns
    if (ownedArtifacts.includes("art_1")) cdMult *= 0.95; // Potato
    if (ownedArtifacts.includes("art_7")) cdMult *= 0.9; // Balou
    if (ownedArtifacts.includes("art_10")) cdMult *= 0.9; // Creator

    // Manual Cost
    if (ownedArtifacts.includes("art_2")) manualMult *= 0.95; // Ikea
    if (ownedArtifacts.includes("art_5")) manualMult *= 0.9; // Peony
    if (ownedArtifacts.includes("art_10")) manualMult *= 0.9; // Creator

    // Auto Cost
    if (ownedArtifacts.includes("art_3")) autoMult *= 0.95; // Bolg
    if (ownedArtifacts.includes("art_6")) autoMult *= 0.9; // Bellflower
    if (ownedArtifacts.includes("art_10")) autoMult *= 0.9; // Creator

    // Artifact Cost
    if (ownedArtifacts.includes("art_4")) artMult *= 0.85; // Ogrul
    if (ownedArtifacts.includes("art_10")) artMult *= 0.9; // Creator

    // Passive
    const hasBaghera = ownedArtifacts.includes("art_8");
    const hasDoris = ownedArtifacts.includes("art_9");

    if (hasBaghera && hasDoris) {
      passive += 50000;
    } else {
      if (hasBaghera) passive += 10000;
      if (hasDoris) passive += 10000;
    }

    return { cdMult, manualMult, autoMult, artMult, passive };
  }, [ownedArtifacts]);

  return (
    <>
      {/* 1. ARTIFACT-SPECIFIC STATS CARD */}
      <div className="w-full max-w-4xl bg-black/20 border border-purple-500/30 rounded-2xl p-6 mb-8 text-center backdrop-blur-sm shadow-xl">
        <h3 className="text-purple-300 font-bold text-lg uppercase tracking-widest mb-4">
          Artifacts Bonuses
        </h3>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm">
          <div className="px-3 py-2 bg-purple-900/30 rounded-lg border border-purple-500/20 text-purple-100">
            <div className="text-gray-400 text-[10px] uppercase">Collected</div>
            <div className="font-bold text-lg">
              {ownedCount} / {totalCount}
            </div>
          </div>

          <div className="px-3 py-2 bg-orange-900/30 rounded-lg border border-orange-500/20 text-orange-100">
            <div className="text-gray-400 text-[10px] uppercase">
              Manual Cost
            </div>
            <div className="font-bold text-lg">
              -{getPercent(artifactStats.manualMult)}
            </div>
          </div>

          <div className="px-3 py-2 bg-amber-900/30 rounded-lg border border-amber-500/20 text-amber-100">
            <div className="text-gray-400 text-[10px] uppercase">Auto Cost</div>
            <div className="font-bold text-lg">
              -{getPercent(artifactStats.autoMult)}
            </div>
          </div>

          <div className="px-3 py-2 bg-pink-900/30 rounded-lg border border-pink-500/20 text-pink-100">
            <div className="text-gray-400 text-[10px] uppercase">
              Artifact Cost
            </div>
            <div className="font-bold text-lg">
              -{getPercent(artifactStats.artMult)}
            </div>
          </div>

          <div className="px-3 py-2 bg-blue-900/30 rounded-lg border border-blue-500/20 text-blue-100">
            <div className="text-gray-400 text-[10px] uppercase">Cooldowns</div>
            <div className="font-bold text-lg">
              -{getPercent(artifactStats.cdMult)}
            </div>
          </div>

          <div className="px-3 py-2 bg-emerald-900/30 rounded-lg border border-emerald-500/20 text-emerald-100">
            <div className="text-gray-400 text-[10px] uppercase">Passive</div>
            <div className="font-bold text-lg">
              +{formatNumber(artifactStats.passive)}/s
            </div>
          </div>
        </div>
      </div>

      {/* 2. ARTIFACT GRID */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
        {ARTIFACTS_DATA.map((art) => {
          const isOwned = ownedArtifacts.includes(art.id);
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
              <div className="flex gap-4 mb-4">
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
    </>
  );
};

export default ArtifactsPanel;
