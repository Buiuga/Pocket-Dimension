import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDopamineGame } from "../hooks/useDopamineGame";
import WorkPanel from "./WorkPanel";
import AutomationPanel from "./AutomationPanel";
import ArtifactsPanel from "./ArtifactsPanel";
import CollectionPanel from "./CollectionPanel";

const DopamineInc = () => {
  const navigate = useNavigate();
  const game = useDopamineGame();
  const [view, setView] = useState("manual");

  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    if (num < 10 && num > 0) return num.toFixed(1);
    return Math.floor(num);
  };

  // Switch header number based on tab
  const displayDopamine =
    view === "collection" ? game.lifetimeDopamine : game.dopamine;
  const displayLabel =
    view === "collection" ? "Total Lifetime Earned" : "Current Dopamine";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-700 via-orange-600 to-amber-700 p-4 md:p-8 flex flex-col items-center">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 left-4 text-orange-200/70 hover:text-white text-lg transition-colors z-20"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-orange-900/95 backdrop-blur-md w-full max-w-2xl rounded-2xl p-4 mb-6 shadow-2xl border border-orange-500/30 flex flex-col items-center">
        <h2 className="text-orange-200 text-xs md:text-sm font-bold uppercase tracking-widest mb-1">
          {displayLabel}
        </h2>

        {/* DOPAMINE + DPS DISPLAY */}
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-black text-white drop-shadow-md flex items-center gap-2">
            {view === "collection" ? "🌟" : "⚡"}{""}
            {formatNumber(displayDopamine)}
          </div>

          {/* NEW: Display DPS if it exists and we aren't in Collection view */}
          {view !== "collection" && game.totalDPS > 0 && (
            <div className="text-emerald-300 font-bold text-sm md:text-base mt-1 animate-pulse">
              (+ {formatNumber(game.totalDPS)} Dop / sec)
            </div>
          )}
        </div>

        {/* VIEW TABS */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 bg-orange-950/50 p-1 rounded-2xl border border-orange-500/20">
          <button
            onClick={() => setView("manual")}
            className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-all ${
              view === "manual"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-orange-300 hover:text-white"
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setView("auto")}
            className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-all ${
              view === "auto"
                ? "bg-amber-500 text-white shadow-lg"
                : "text-orange-300 hover:text-white"
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => setView("artifacts")}
            className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-all ${
              view === "artifacts"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-orange-300 hover:text-white"
            }`}
          >
            Artifacts
          </button>
          <button
            onClick={() => setView("collection")}
            className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-all ${
              view === "collection"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-orange-300 hover:text-white"
            }`}
          >
            Collection
          </button>
        </div>
      </div>

      {/* RENDER PANELS */}
      {view === "manual" && <WorkPanel game={game} />}
      {view === "auto" && <AutomationPanel game={game} />}
      {view === "artifacts" && <ArtifactsPanel game={game} />}
      {view === "collection" && <CollectionPanel game={game} />}
    </div>
  );
};

export default DopamineInc;
