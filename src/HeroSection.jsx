import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  // Define the animation properties

  const navigate = useNavigate();
  const handleEnterClick = () => {
    navigate("/home");
  };

  const animationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        // 2. Using a standard, safe easing curve
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  // We'll also define a stagger effect so the title, text, and button appear sequentially.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  return (
    <motion.section
      className="min-h-screen purple-bg-gradient flex flex-col items-center justify-center p-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider"
        variants={animationVariants}
      >
        The Pocket Dimension
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl text-gray-300 max-w-md mb-8"
        variants={animationVariants}
      >
        This is <strong className="font-bold text-white">your</strong> space.
      </motion.p>

      <motion.button
        onClick={handleEnterClick}
        className="
          bg-white 
          text-[#290956] 
          hover:bg-gray-100 
          transition-all 
          duration-300
          font-bold 
          py-3 
          px-8 
          rounded-full 
          shadow-lg 
          text-lg 
          uppercase 
          tracking-widest
          hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
        "
        variants={animationVariants}
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15, // Added damping for a softer bounce
          },
        }}
      >
        Enter
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;
