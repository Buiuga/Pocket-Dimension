/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { quotes } from "./data/quotes";
import { useState } from "react";

const BorrowedWisdom = () => {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const generateQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === quotes.indexOf(currentQuote) && quotes.length > 1);

    setCurrentQuote(quotes[newIndex]);
  };
  return (
    // 1. Background: Rich Oak/Amber/Bronze Gradient
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-amber-900 p-6 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-amber-200/70 hover:text-amber-100 text-xl transition-colors z-20"
      >
        ← Back
      </button>

      <div className="h-12"></div>

      {/* 2. HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-amber-950/40 backdrop-blur-md border border-amber-500/20 rounded-2xl p-8 text-center shadow-xl mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-amber-100 mb-3 tracking-wide">
          A Message You Might Need
        </h2>
        <p className="text-amber-200/80 text-base md:text-lg leading-relaxed font-light italic">
          Sometimes you need a soft push, sometimes a warm reminder. Let me
          choose the right words for you.
        </p>
      </motion.div>

      {/* 3. THE QUOTE "BOOK PAGE" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="
            relative
            w-full max-w-3xl 
            min-h-[300px]
            bg-[#F5E6D3] 
            rounded-xl 
            shadow-[0_0_40px_rgba(0,0,0,0.5)] 
            p-10 md:p-16 
            flex flex-col items-center justify-center 
            text-center
            border-l-8 border-l-amber-900/20
        "
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Decorative Quote Mark */}
        <span className="absolute top-4 left-6 text-6xl text-amber-900/10 font-serif">
          ❝
        </span>

        {/* Placeholder Text (You will make this dynamic later) */}
        <blockquote className="text-2xl md:text-3xl text-amber-950 font-serif font-medium leading-relaxed mb-6">
          {currentQuote.quote}
        </blockquote>

        {/* Placeholder Author */}
        <cite className="text-amber-800 text-lg font-bold uppercase tracking-widest not-italic">
          — {currentQuote.author}
        </cite>

        <span className="absolute bottom-4 right-6 text-6xl text-amber-900/10 font-serif rotate-180">
          ❝
        </span>
      </motion.div>

      {/* 4. THE ACTION BUTTON */}
      <div className="mt-12">
        <motion.button
          onClick={generateQuote}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            bg-gradient-to-r from-amber-700 to-orange-700 
            text-amber-50 
            font-bold 
            text-xl 
            uppercase 
            tracking-widest 
            py-4 
            px-12 
            rounded-full 
            shadow-[0_4px_20px_rgba(180,83,9,0.4)]
            hover:shadow-[0_6px_25px_rgba(180,83,9,0.6)]
            border border-amber-500/30
            transition-all
          "
        >
          Uncover Wisdom
        </motion.button>
      </div>
    </div>
  );
};

export default BorrowedWisdom;
