/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLAYLIST } from "../data/MusicData";

const MusicPlayer = () => {
  const audioRef = useRef(new Audio());

  // STATE
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);

  // NEW: Real Audio Time State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // --- CONTROLS ---
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Playback failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setCurrentTime(0); // reset progress when moving forward
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setCurrentTime(0); // reset progress when moving backward
    setIsPlaying(true);
  };

  // --- AUDIO LOGIC ---

  useEffect(() => {
    const audio = audioRef.current;

    // Set source
    audio.src = PLAYLIST[currentTrack].url;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    // HANDLERS
    const handleEnded = () => nextTrack();
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    // EVENT LISTENERS
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate); // Updates bar moving
    audio.addEventListener("loadedmetadata", handleLoadedMetadata); // Gets total length

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentTrack]);

  // Volume Handler
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  // Helper for progress bar width
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="absolute bottom-26 left-1/2 transform -translate-x-1/2 z-50 flex flex-col-reverse items-center">
      {/* 1. TOGGLE BUTTON  */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-indigo-900/50 backdrop-blur-md border border-indigo-500/30 rounded-full flex items-center justify-center text-white shadow-lg z-50"
      >
        {isExpanded ? "✕" : "♫"}
      </motion.button>

      {/* 2. PLAYER UI (Expands UPWARDS) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            // Animate sliding UP from the button
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-64 bg-black/60 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-4 shadow-2xl flex flex-col gap-3"
          >
            {/* Song Info */}
            <div className="text-center">
              <p className="text-xs text-indigo-300 uppercase tracking-widest mb-1">
                Now Playing
              </p>
              <p className="text-white font-bold text-sm truncate">
                {PLAYLIST[currentTrack].title}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-indigo-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-400"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevTrack}
                className="text-indigo-200 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white text-indigo-900 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={nextTrack}
                className="text-indigo-200 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-indigo-300">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <span className="text-xs text-indigo-300">🔊</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MusicPlayer;
