import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 1. Define the features list
const features = [
  { id: 1, title: "Pomodoro Timer", path: "/pomodoro", icon: "⏳" },
  { id: 2, title: "Decision Maker", path: "/decisions", icon: "🔮" },
  { id: 3, title: "Quote Generator", path: "/quotes", icon: "💬" },
  { id: 4, title: "Reset Breath", path: "/breathing", icon: "🔄" },
  { id: 5, title: "Bubble Wrap", path: "/bubbles", icon: "🫧" },
  { id: 6, title: "Starry Sky", path: "/stars", icon: "🌌" },
  { id: 7, title: "Dopamine Inc", path: "/dopamineInc", icon: "⚡" },
  { id: 8, title: "Interactive Story", path: "/story", icon: "📖" },
  { id: 9, title: "The Growth Spot", path: "/growth", icon: "🌱" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Animation for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* 2. THE GREETING CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center mb-10 shadow-xl"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Welcome, Darla!
        </h1>
        <p className="text-gray-300 italic">What do you need today?</p>
      </motion.div>

      {/* 3. THE FEATURE GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={itemVariants}
            onClick={() => navigate(feature.path)}
            // 4. THE HOVER EFFECT
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Lighter on hover
              y: -5, // Floats up
            }}
            whileTap={{ scale: 0.95 }} // Satisfying click press
            className="
              bg-white/5 
              border border-white/10 
              backdrop-blur-sm 
              rounded-xl 
              p-6 
              h-40 
              flex flex-col items-center justify-center 
              text-center 
              cursor-pointer 
              shadow-lg
              transition-colors duration-300
            "
          >
            <span className="text-3xl mb-3">{feature.icon}</span>
            <h2 className="text-xl font-bold text-white tracking-wide">
              {feature.title}
            </h2>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
