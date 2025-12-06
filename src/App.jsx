import HeroSection from "./HeroSection";
import Dashboard from "./Dashboard";
import Pomodoro from "./Pomodoro";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="pomodoro" element={<Pomodoro />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
