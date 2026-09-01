import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import ManualReviewPage from "./pages/ManualReviewPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/manual-review" element={<ManualReviewPage />} />
    </Routes>
  );
};

export default App;

