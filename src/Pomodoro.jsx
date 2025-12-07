/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ALARM_SOUND = "../Public/Alarm.mp3";

const Pomodoro = () => {
  const INITIAL_TIME = 25 * 60;
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleTimerControl = () => {
    if (timeLeft === 0) {
      // RESET Logic
      setTimeLeft(INITIAL_TIME);
      setIsRunning(false);
    } else {
      if (!isRunning) {
        // START/RESUME Logic:
        setEndTime(Date.now() + timeLeft * 1000);
        setIsRunning(true);
      } else {
        // PAUSE Logic
        setIsRunning(false);
      }
    }
  };

  useEffect(() => {
    if (!isRunning || !endTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;

      // Calculate seconds remaining from the time difference
      const secondsRemaining = Math.ceil(distance / 1000);

      // CHECK IF TIMER ENDS
      if (secondsRemaining <= 0) {
        setTimeLeft(0);
        setIsRunning(false);
        clearInterval(interval);

        // PLAY SOUND (This remains here, so it only plays at the end)
        const audio = new Audio(ALARM_SOUND);
        audio.volume = 0.3;
        audio.play().catch((e) => console.log("Audio play failed:", e));

        // NOTIFICATION
        if (Notification.permission === "granted") {
          new Notification("Pocket Dimension", {
            body: "Time is up! Take a break.",
          });
        }
      } else {
        // Update the display with the calculated time
        setTimeLeft(secondsRemaining);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning, endTime]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-to-t from-red-950 via-red-900 to-red-950 p-6 flex flex-col items-center">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-white/70 hover:text-white text-xl transition-colors"
      >
        ← Back
      </button>

      <div className="h-12"></div>

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
          Sometimes you lose track of time, and that's okay. But remember,
          breaks are just as important as being focused.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl"
      >
        <div className="text-8xl md:text-9xl text-white font-bold tracking-widest mb-10 drop-shadow-lg">
          {minutes}:{seconds}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTimerControl}
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
          {timeLeft === 0 ? "Reset" : isRunning ? "Pause" : "Start"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Pomodoro;
