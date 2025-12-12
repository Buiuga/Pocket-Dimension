/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";

const StarrySky = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // State refs for physics
  const mouse = useRef({ x: -1000, y: -1000, isDown: false });
  const stars = useRef([]);
  const shootingStars = useRef([]);
  const constellations = useRef([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // (Removed all old Audio/isMuted state and logic from here)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars.current = [];
      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.current.push({
          x: x,
          y: y,
          originX: x,
          originY: y,
          z: Math.random(),
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.5,
          driftOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- A. STARS LOGIC ---
      stars.current.forEach((star) => {
        const dx = mouse.current.x - star.x;
        const dy = mouse.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = (120 - distance) / 120;
          const pullFactor = 0.008 * star.z;
          star.vx += dx * force * pullFactor;
          star.vy += dy * force * pullFactor;
        }

        const homeDx = star.originX - star.x;
        const homeDy = star.originY - star.y;
        star.vx += homeDx * 0.002;
        star.vy += homeDy * 0.002;

        star.vx += Math.sin(time * 0.001 + star.driftOffset) * 0.002;
        star.vy += Math.cos(time * 0.001 + star.driftOffset) * 0.002;

        star.vx *= 0.95;
        star.vy *= 0.95;
        star.x += star.vx;
        star.y += star.vy;

        const alpha = 0.3 + star.z * 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * (0.8 + star.z), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- B. CONSTELLATIONS ---
      constellations.current = constellations.current.filter(
        (line) => line.life > 0
      );
      constellations.current.forEach((line) => {
        line.life -= 0.011; // 1.5s fade
        ctx.strokeStyle = `rgba(167, 243, 208, ${line.life})`;
        ctx.lineWidth = 2 * line.life;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      if (mouse.current.isDown) {
        constellations.current.push({
          x1: lastMousePos.current.x,
          y1: lastMousePos.current.y,
          x2: mouse.current.x,
          y2: mouse.current.y,
          life: 1.0,
        });
        lastMousePos.current = { x: mouse.current.x, y: mouse.current.y };
      }

      // --- C. SHOOTING STARS ---
      shootingStars.current = shootingStars.current.filter((s) => s.life > 0);
      shootingStars.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.01;

        const tailX = s.x - s.vx * 25;
        const tailY = s.y - s.vy * 25;
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.lineWidth = 4;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseDown = (e) => {
      mouse.current.isDown = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      const angle = Math.random() * Math.PI * 2;
      const speed = 7 + Math.random() * 8;
      shootingStars.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
      });
    };

    const handleMouseUp = () => {
      mouse.current.isDown = false;
    };

    const handleTouchMove = (e) => {
      mouse.current.x = e.touches[0].clientX;
      mouse.current.y = e.touches[0].clientY;
      if (mouse.current.isDown) {
        constellations.current.push({
          x1: lastMousePos.current.x,
          y1: lastMousePos.current.y,
          x2: mouse.current.x,
          y2: mouse.current.y,
          life: 1.0,
        });
        lastMousePos.current = { x: mouse.current.x, y: mouse.current.y };
      }
    };

    const handleTouchStart = (e) => {
      mouse.current.isDown = true;
      mouse.current.x = e.touches[0].clientX;
      mouse.current.y = e.touches[0].clientY;
      lastMousePos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      const angle = Math.random() * Math.PI * 2;
      const speed = 7 + Math.random() * 8;
      shootingStars.current.push({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
      });
    };

    resize();
    requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b] overflow-hidden">
      {/* 2. RENDER THE MUSIC PLAYER */}
      <MusicPlayer />

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 p-6">
        <button
          onClick={() => navigate("/home")}
          className="pointer-events-auto absolute top-6 left-6 text-indigo-200/50 hover:text-white text-xl transition-colors"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-auto select-none"
        >
          <h2 className="text-white/80 font-bold text-lg tracking-widest uppercase mb-1">
            Starry Sky
          </h2>
          <p className="text-indigo-200/50 text-sm">
            Move to swirl • Click to wish • Click + Drag to draw
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StarrySky;
