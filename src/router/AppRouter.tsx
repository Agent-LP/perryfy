import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DesignerPage from "../pages/DesignerPage";
import {LandingPage} from "../pages/LandingPage";

const AppRouter = () => (
    <Routes>
      <Route path="/designer" element={<DesignerPage />} />
      <Route path="/*" element={<LandingPage />} />
    </Routes>
);

export default AppRouter;
