import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDopamineGame } from "../hooks/useDopamineGame";
import WorkPanel from "./WorkPanel";
import AutomationPanel from "./AutomationPanel";
import ArtifactsPanel from "./ArtifactsPanel";

const DopamineInc = () => {
  const navigate = useNavigate();
  // Call the hook to get the entire game state/logic
  const game = useDopamineGame();
  const [view, setView] = useState("manual"); // 'manual', 'auto', 'artifacts'

  // Helper for formatting the big header number
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return Math.floor(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-800 via-orange-700/80 to-amber-800 p-4 md:p-8 flex flex-col items-center">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 left-4 text-orange-200/70 hover:text-white text-lg transition-colors z-20"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-orange-900/95 backdrop-blur-md w-full max-w-xl rounded-2xl p-4 mb-6 shadow-2xl border border-orange-500/30 flex flex-col items-center">
        <h2 className="text-orange-200 text-sm font-bold uppercase tracking-widest">
          Current Dopamine
        </h2>
        <div className="text-5xl font-black text-white drop-shadow-md flex items-center gap-2">
          ⚡ {formatNumber(game.dopamine)}
        </div>

        {/* VIEW TABS */}
        <div className="flex gap-2 mt-4 bg-orange-950/50 p-1 rounded-full border border-orange-500/20">
          <button
            onClick={() => setView("manual")}
            className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm transition-all ${
              view === "manual"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-orange-300 hover:text-white"
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setView("auto")}
            className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm transition-all ${
              view === "auto"
                ? "bg-amber-500 text-white shadow-lg"
                : "text-orange-300 hover:text-white"
            }`}
          >
            Automation
          </button>
          <button
            onClick={() => setView("artifacts")}
            className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm transition-all ${
              view === "artifacts"
                ? "bg-purple-600 text-white shadow-lg" // Purple for "Special" items
                : "text-orange-300 hover:text-white"
            }`}
          >
            Artifacts
          </button>
        </div>
      </div>

      {/* RENDER THE CORRECT PANEL */}
      {view === "manual" && <WorkPanel game={game} />}
      {view === "auto" && <AutomationPanel game={game} />}
      {view === "artifacts" && <ArtifactsPanel game={game} />}
    </div>
  );
};

export default DopamineInc;
