/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Colors for the slices
const WHEEL_COLORS = [
  "#14b8a6", // Teal
  "#8b5cf6", // Violet
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#0ea5e9", // Sky
];

// Sound effect for the wheel
const SPIN_SOUND = "../Public/WheelSpin.mp3";

const WheelofFate = () => {
  const navigate = useNavigate();

  // STATE
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  // 1. ADD OPTION
  const handleAddOption = () => {
    if (!inputValue.trim()) return;
    setOptions([...options, inputValue]);
    setInputValue("");
    setWinner(null);
  };

  // 2. NEW: RESET LOGIC
  const handleReset = () => {
    setOptions([]);
    setWinner(null);
    setRotation(0); // Reset rotation (optional, but cleaner)
  };

  // 3. SPIN LOGIC
  const handleSpin = () => {
    if (options.length < 2) return;
    setIsSpinning(true);
    setWinner(null);

    // Added: Start the sound
    const spinAudio = new Audio(SPIN_SOUND);
    spinAudio.volume = 0.3;
    spinAudio.loop = false; // Loops the clicking sound while spinning
    spinAudio.play().catch(() => {}); // Catch errors if browser blocks autoplay

    // 5 spins (1800) + random angle
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = rotation + 1800 + randomAngle;
    setRotation(newRotation);

    setTimeout(() => {
      spinAudio.pause();
      spinAudio.currentTime = 0;

      setIsSpinning(false);

      const degrees = newRotation % 360;
      const winningAngle = (360 - degrees) % 360;
      const sliceSize = 360 / options.length;
      const winningIndex = Math.floor(winningAngle / sliceSize);

      setWinner(options[winningIndex]);
    }, 3000);
  };

  // 4. GRADIENT GENERATOR
  const getWheelGradient = () => {
    if (options.length === 0) return "conic-gradient(#334155 0deg 360deg)";
    if (options.length === 1)
      return `conic-gradient(${WHEEL_COLORS[0]} 0deg 360deg)`;

    const sliceSize = 360 / options.length;
    let gradient = "conic-gradient(";

    options.forEach((_, i) => {
      const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
      gradient += `${color} ${i * sliceSize}deg ${(i + 1) * sliceSize}deg, `;
    });

    return gradient.slice(0, -2) + ")";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950 p-6 flex flex-col items-center overflow-hidden">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-white/70 hover:text-emerald-400 text-xl transition-colors z-20"
      >
        ← Back
      </button>

      <div className="h-12"></div>

      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-teal-950/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 text-center shadow-xl mb-8 relative z-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-2">
          Decision Anxiety?
        </h2>

        {winner ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="text-teal-200 text-sm">The Wheel has spoken:</p>
            <p className="text-3xl font-bold text-white mt-2 drop-shadow-md uppercase">
              {winner}
            </p>
          </motion.div>
        ) : (
          <p className="text-teal-200 text-sm md:text-base leading-relaxed">
            Spin the wheel! <br />
            <span className="text-xs opacity-70 italic mt-1 block text-emerald-300">
              (Don't use it for very important, life decisions. Ask me instead,
              so we can decide together)
            </span>
          </p>
        )}
      </motion.div>

      {/* INPUT AREA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md flex gap-2 mb-10 z-10 px-2 md:px-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            options.length < 2
              ? "Add at least 2 options..."
              : "Add another option..."
          }
          disabled={isSpinning}
          className="flex-1 min-w-0 bg-white/10 border border-emerald-500/30 rounded-full px-4 md:px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500 focus:bg-white/20 transition-all"
        />

        {/* ADD BUTTON */}
        <button
          onClick={handleAddOption}
          disabled={isSpinning || !inputValue.trim()}
          className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-teal-950 font-bold px-4 md:px-6 py-3 rounded-full transition-colors shadow-lg disabled:opacity-50"
        >
          Add
        </button>

        {/* RESET BUTTON - FIXED FOR MOBILE */}
        <button
          onClick={handleReset}
          disabled={isSpinning || options.length === 0}
          className="shrink-0 w-12 bg-rose-700/70 hover:bg-rose-500 text-white font-bold rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:hidden flex items-center justify-center text-xl"
          title="Reset Wheel"
        >
          ↺
        </button>
      </motion.div>

      {/* THE WHEEL */}
      <div className="relative mb-10 scale-90 md:scale-100">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-rose-700 drop-shadow-lg"></div>
        </div>

        {/* The Wheel Circle */}
        <motion.div
          className="w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative transition-transform duration-[3000ms] cubic-bezier(0.25, 0.1, 0.25, 1)"
          style={{
            background: getWheelGradient(),
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* TEXT RENDERING LOGIC */}
          {options.map((opt, i) => {
            const sliceSize = 360 / options.length;
            // We want the text in the MIDDLE of the slice
            const rotateAmount = i * sliceSize + sliceSize / 2;

            return (
              <div
                key={i}
                className="absolute top-0 left-0 w-full h-full flex justify-center pt-4"
                style={{
                  // 1. Rotate the container to align with the slice angle
                  transform: `rotate(${rotateAmount}deg)`,
                }}
              >
                <span
                  className="text-gray-200 font-bold text-sm md:text-base drop-shadow-md truncate max-w-[100px]"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(0deg) translateY(-80px)`,
                    textAlign: "center",
                  }}
                >
                  {opt}
                </span>
              </div>
            );
          })}

          {/* Center Decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-teal-800 rounded-full border-2 border-cyan-500/50 flex items-center justify-center shadow-inner z-10"></div>
        </motion.div>
      </div>

      {/* SPIN BUTTON */}
      <motion.button
        onClick={handleSpin}
        disabled={isSpinning || options.length < 2}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          bg-gradient-to-r from-emerald-400 to-cyan-500 
          text-teal-950 font-bold text-xl uppercase tracking-widest 
          py-4 px-16 rounded-full shadow-lg transition-all
          ${
            isSpinning || options.length < 2
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          }
        `}
      >
        {isSpinning ? "..." : "SPIN"}
      </motion.button>
    </div>
  );
};

export default WheelofFate;
