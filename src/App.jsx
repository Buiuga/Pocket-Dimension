import HeroSection from "./HeroSection";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
