/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const POP_SOUNDS = [
  "/Pocket-Dimension/pop1.mp3",
  "/Pocket-Dimension/pop2.mp3",
  "/Pocket-Dimension/pop3.mp3",
];

const GRID_SIZE = 48;

const BubbleWrap = () => {
  const navigate = useNavigate();

  // Deterministic pseudo-random generator to keep render pure
  const randSeed = React.useRef(1);
  const nextRand = () => {
    // Lehmer RNG; deterministic and fast
    randSeed.current = (randSeed.current * 48271) % 2147483647;
    return (randSeed.current - 1) / 2147483646;
  };

  const [bubbles, setBubbles] = useState(
    Array.from({ length: GRID_SIZE }).map((_, i) => ({ id: i, popped: false }))
  );

  // POP LOGIC
  const popBubble = (id) => {
    const bubble = bubbles.find((b) => b.id === id);
    if (bubble.popped) return;

    // 1. PICK RANDOM SOUND
    const randomSoundUrl =
      POP_SOUNDS[Math.floor(nextRand() * POP_SOUNDS.length)];

    // 2. PLAY IT
    const audio = new Audio(randomSoundUrl);
    audio.volume = 0.5;
    // Slight playback rate variation makes it sound even more natural!
    audio.playbackRate = 0.9 + nextRand() * 0.2;
    audio.play().catch(() => {});

    // 3. Vibrate (Mobile only)
    if (navigator.vibrate) navigator.vibrate(50);

    // 4. Update State
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  const handleReset = () => {
    setBubbles((prev) => prev.map((b) => ({ ...b, popped: false })));
  };

  const poppedCount = bubbles.filter((b) => b.popped).length;
  const allPopped = poppedCount === GRID_SIZE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BE185D] via-[#DB2777] to-[#9D174D] p-6 flex flex-col items-center">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-pink-200 hover:text-white text-xl transition-colors z-20"
      >
        ← Back
      </button>

      <div className="h-8"></div>

      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-pink-300/30 rounded-2xl p-6 text-center shadow-xl mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Stress Relief
        </h2>
        <p className="text-pink-100 text-sm md:text-base leading-relaxed font-medium">
          Stressful day? Frustrated? Just bored? <br />
          <span className="text-white font-bold">Pop some bubbles!</span>
        </p>
      </motion.div>

      {/* THE BUBBLE WRAP GRID */}
      <div
        className="
          bg-white/20 
          backdrop-blur-sm 
          p-4 
          rounded-xl 
          shadow-2xl 
          grid 
          grid-cols-6 
          sm:grid-cols-8 
          gap-3 
          md:gap-4
          mb-10
          border border-white/30
        "
      >
        {bubbles.map((bubble) => (
          <motion.button
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            whileTap={!bubble.popped ? { scale: 0.9 } : {}}
            className={`
                relative
                w-10 h-10 sm:w-12 sm:h-12 
                rounded-full 
                transition-all 
                duration-200
                flex items-center justify-center
                ${
                  bubble.popped
                    ? "bg-pink-900/20 shadow-inner border border-pink-900/10 scale-95"
                    : "bg-white/20 backdrop-blur-sm border border-white/30 shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-white/30" // Unpopped: Glassy, shiny plastic
                }
              `}
          >
            {!bubble.popped && (
              <div className="absolute top-2 left-2 w-3 h-2 bg-white/80 rounded-full blur-[1px]"></div>
            )}
          </motion.button>
        ))}
      </div>

      {/* RESET BUTTON */}
      <motion.button
        onClick={handleReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          font-bold text-xl uppercase tracking-widest py-4 px-16 rounded-full shadow-lg transition-all
          ${
            allPopped
              ? "bg-white text-pink-600 animate-pulse"
              : "bg-pink-800/80 text-white hover:bg-pink-700"
          }
        `}
      >
        {allPopped ? "Fresh Sheet!" : "Reset"}
      </motion.button>

      <p className="mt-4 text-pink-200/60 text-sm">
        Popped: {poppedCount} / {GRID_SIZE}
      </p>
    </div>
  );
};

export default BubbleWrap;
