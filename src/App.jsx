import HeroSection from "./HeroSection";
import Dashboard from "./Dashboard";
import Pomodoro from "./Pomodoro";
import WheelofFate from "./WheelofFate";
import BorrowedWisdom from "./BorrowedWisdom";
import ResetBreath from "./ResetBreath";
import BubbleWrap from "./BubbleWrap";
import { Routes, Route } from "react-router-dom";
import StarrySky from "./StarrySky/StarrySky";
import DopamineInc from "./DopamineInc/DopamineInc";
import GrowthSpot from "./GrowthSpot";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="decisionMaker" element={<WheelofFate />} />
          <Route path="quotes" element={<BorrowedWisdom />} />
          <Route path="breathing" element={<ResetBreath />} />
          <Route path="bubbles" element={<BubbleWrap />} />
          <Route path="stars" element={<StarrySky />} />
          <Route path="dopamineInc" element={<DopamineInc />} />

          <Route path="growth" element={<GrowthSpot />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
