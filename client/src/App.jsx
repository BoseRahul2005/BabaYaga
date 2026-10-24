import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import ManualReviewPage from "./pages/ManualReviewPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/manual-review" element={<ManualReviewPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;

