import React, { useState } from "react";
import { CHECKPOINTS_DATA } from "../data/DopamineData";

const formatNumber = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return Math.floor(num);
};

const CollectionPanel = ({ game }) => {
  const { lifetimeDopamine, unlockedCheckpoints, handleClaimCheckpoint } = game;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const count = unlockedCheckpoints.length;
  const totalCheckpoints = CHECKPOINTS_DATA.length;

  return (
    <>
      {/* 1. BUFFS INFO CARD */}
      <div className="w-full max-w-5xl bg-black/20 border border-emerald-500/30 rounded-2xl p-6 mb-8 text-center backdrop-blur-sm shadow-xl">
        <h3 className="text-emerald-400 font-bold text-lg uppercase tracking-widest mb-4">
          Collection Bonuses
        </h3>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm md:text-base">
          <div className="px-4 py-2 bg-emerald-900/30 rounded-lg border border-emerald-500/20 text-emerald-100 flex flex-col md:flex-row gap-2 items-center">
            <span>📸 Memories:</span>
            <span className="text-white font-bold text-lg">
              {count} / {totalCheckpoints}
            </span>
          </div>

          <div className="px-4 py-2 bg-orange-900/30 rounded-lg border border-orange-500/20 text-orange-100 flex flex-col md:flex-row gap-2 items-center">
            <span>📉 All Costs:</span>
            <span className="text-white font-bold text-lg">-{count * 3}%</span>
          </div>

          <div className="px-4 py-2 bg-blue-900/30 rounded-lg border border-blue-500/20 text-blue-100 flex flex-col md:flex-row gap-2 items-center">
            <span>⚡ Cooldowns:</span>
            <span className="text-white font-bold text-lg">-{count * 3}%</span>
          </div>

          <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/20 text-purple-100 flex flex-col md:flex-row gap-2 items-center">
            <span>💸 Passive:</span>
            <span className="text-white font-bold text-lg">
              +{count * 100}/s
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-xs mt-4 italic max-w-2xl mx-auto">
          Every memory you unlock strengthens your bond with the creator.
          <span className="text-emerald-500 font-bold">
            {" "}
            Each photo grants 3% bonus stats
          </span>{" "}
          to help you reach the next one.
        </p>
      </div>

      {/* 2. PHOTO GRID */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 pb-20">
        {CHECKPOINTS_DATA.map((cp) => {
          const isUnlocked = unlockedCheckpoints.includes(cp.id);
          const canUnlock = !isUnlocked && lifetimeDopamine >= cp.threshold;

          if (!isUnlocked && !canUnlock) {
            return (
              <div
                key={cp.id}
                className="aspect-[3/4] rounded-2xl bg-gray-900 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center p-4 text-center opacity-60"
              >
                <span className="text-4xl mb-2">🔒</span>
                <p className="text-gray-400 text-sm font-bold">LOCKED</p>
                <p className="text-gray-500 text-xs mt-1">
                  Requires {formatNumber(cp.threshold)} Lifetime Dopamine
                </p>
              </div>
            );
          }

          if (canUnlock) {
            return (
              <button
                key={cp.id}
                onClick={() => handleClaimCheckpoint(cp.id)}
                className="aspect-[3/4] rounded-2xl bg-emerald-900/40 border-2 border-emerald-500 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-emerald-800/50 transition-all animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span className="text-4xl mb-2">🎁</span>
                <p className="text-emerald-300 text-lg font-bold">
                  OPEN MEMORY
                </p>
                <p className="text-emerald-400/70 text-xs mt-2">
                  Goal Reached!
                </p>
              </button>
            );
          }

          return (
            <div
              key={cp.id}
              onClick={() => setSelectedPhoto(cp)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-orange-500/30 cursor-pointer group shadow-lg"
            >
              <img
                src={cp.image}
                alt="Memory"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity">
                  View
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full flex flex-col items-center justify-center">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4 bg-black/60 px-6 py-2 rounded-full backdrop-blur-md text-center shadow-lg border border-white/10">
              {selectedPhoto.title ||
                `Memory #${selectedPhoto.id.split("_")[1]}`}
            </h2>

            <img
              src={selectedPhoto.image}
              alt="Full Memory"
              className="max-w-full max-h-[75vh] rounded-lg shadow-2xl border-2 border-orange-500/20"
            />

            <p className="text-center text-white mt-4 text-sm bg-black/50 px-4 py-2 rounded-full border border-white/10">
              Unlocked at {formatNumber(selectedPhoto.threshold)} Dopamine
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionPanel;
