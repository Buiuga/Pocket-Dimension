/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ResetBreath = () => {
  const navigate = useNavigate();

  // STATES
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle, inhale, hold, exhale
  const [cycleCount, setCycleCount] = useState(0);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhase("idle");
      setCycleCount(0);
      return;
    }
    setIsActive(true);
  };

  // INSTRUCTIONS TEXT
  const getInstructionText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      default:
        return "Ready?";
    }
  };

  // THE BREATHING LOGIC
  useEffect(() => {
    if (!isActive) return;

    let cancelled = false;

    const runCycle = async () => {
      if (cancelled) return;

      // 1. INHALE (4s)
      setPhase("inhale");
      await new Promise((r) => setTimeout(r, 4000));
      if (cancelled) return;

      // 2. HOLD (4s)
      setPhase("hold");
      await new Promise((r) => setTimeout(r, 4000));
      if (cancelled) return;

      // 3. EXHALE (4s)
      setPhase("exhale");
      await new Promise((r) => setTimeout(r, 4000));
      if (cancelled) return;

      setCycleCount((prev) => prev + 1);
    };

    const intervalId = setInterval(() => {
      runCycle();
    }, 12000);

    const kickoffId = setTimeout(runCycle, 0);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      clearTimeout(kickoffId);
    };
  }, [isActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B5F54] via-[#4A7266] to-[#2F4D44] p-6 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-emerald-100/70 hover:text-white text-xl transition-colors z-20"
      >
        ← Back
      </button>

      <div className="h-8"></div>

      {/* 2. HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-[#3B5F54]/40 backdrop-blur-md border border-[#597C74]/40 rounded-2xl p-6 text-center shadow-xl mb-24"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Feeling Overwhelmed?
        </h2>
        <p className="text-emerald-100 text-sm md:text-base leading-relaxed font-light">
          - Do this 4 times <br />
          - Put your wrists under cold water for 5-10 seconds. <br />- If you
          are still overwhelmed, gently submerge your face or the back of your
          neck in cold water for a few seconds
        </p>
      </motion.div>

      {/* 3. THE BREATHING CIRCLE CONTAINER */}
      <div className="relative flex items-center justify-center mb-24">
        {/* Background Static Ring */}
        <div className="absolute w-64 h-64 rounded-full border-4 border-white/10"></div>

        {/* Animated Breathing Circle */}
        <motion.div
          className="w-48 h-48 bg-emerald-100/20 backdrop-blur-sm rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          animate={{
            scale: phase === "inhale" || phase === "hold" ? 1.5 : 1,
            opacity: phase === "hold" ? 0.9 : 1,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
        >
          {/* Inner Core Circle */}
          <div className="w-40 h-40 bg-[#597C74] rounded-full flex items-center justify-center shadow-inner px-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-white font-bold text-lg uppercase tracking-wider text-center w-full leading-tight"
              >
                {getInstructionText()}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress Ring (SVG) */}
        {isActive && (
          <svg className="absolute w-80 h-80 rotate-[-90deg] pointer-events-none">
            <circle
              cx="160"
              cy="160"
              r="156"
              stroke="white"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0.3"
            />
            <motion.circle
              cx="160"
              cy="160"
              r="156"
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </svg>
        )}
      </div>

      {/* 4. CONTROLS */}
      <div className="flex flex-col items-center gap-4">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
                text-white font-bold text-xl uppercase tracking-widest py-4 px-16 rounded-full shadow-lg transition-all border border-white/20
                ${
                  isActive
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-[#597C74] hover:bg-[#4d6b60] shadow-[0_0_20px_rgba(89,124,116,0.6)]"
                }
            `}
        >
          {isActive ? "Stop" : "Start"}
        </motion.button>

        {cycleCount > 0 && (
          <p className="text-emerald-200/60 text-sm">
            Cycles completed: {cycleCount}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetBreath;
