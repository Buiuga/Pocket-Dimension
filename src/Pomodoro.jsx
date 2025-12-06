import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Pomodoro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-t from-red-950 via-red-900 to-red-950 p-6 flex flex-col items-center">
      {/* Back Button (Absolute positioning to stay in corner) */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-white/70 hover:text-white text-xl transition-colors"
      >
        ← Back
      </button>

      {/* Spacer to push content down slightly */}
      <div className="h-12"></div>

      {/* 2. THE MESSAGE CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-xl mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Focus & Flow
        </h2>
        <p className="text-gray-200 text-lg leading-relaxed font-light">
          "Sometimes you lose track of time, and that's okay. But remember,
          breaks are just as important as being focused."
        </p>
      </motion.div>

      {/* 3. THE TIMER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="
          w-full max-w-md 
          bg-white/5 
          border border-white/10 
          backdrop-blur-sm 
          rounded-3xl 
          p-10 
          flex flex-col items-center justify-center 
          shadow-2xl
        "
      >
        {/* The Digital Clock Display */}
        <div className="text-8xl md:text-9xl text-white font-bold tracking-widest mb-10 drop-shadow-lg">
          01:00
        </div>

        {/* The Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            bg-white 
            text-rose-900 
            font-bold 
            text-xl 
            uppercase 
            tracking-widest 
            py-4 
            px-12 
            rounded-full 
            shadow-[0_0_15px_rgba(255,255,255,0.3)]
            hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]
            transition-all
          "
        >
          Start
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Pomodoro;
