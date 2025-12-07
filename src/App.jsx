import HeroSection from "./HeroSection";
import Dashboard from "./Dashboard";
import Pomodoro from "./Pomodoro";
import WheelofFate from "./WheelofFate";
import BorrowedWisdom from "./BorrowedWisdom";
import { Routes, Route } from "react-router-dom";
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
        </Routes>
      </div>
    </>
  );
}

export default App;
