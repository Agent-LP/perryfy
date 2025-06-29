import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import MerchandiserDashboardPage from "../pages/MerchandiserDashboardPage";
import { DesignerPage } from "../pages/DesignerPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/home" element={
      <ProtectedRoute allowedRoles={["customer", "merchandiser"]}>
        <HomePage />
      </ProtectedRoute>
    } />
    <Route path="/merchandiser" element={
      <ProtectedRoute allowedRoles={["merchandiser"]}>
        <MerchandiserDashboardPage />
      </ProtectedRoute>
    } />
    <Route path="/designer" element={
      <ProtectedRoute allowedRoles={["customer", "merchandiser"]}>
        <DesignerPage />
        </ProtectedRoute>  
    } />
  </Routes>
);

export default AppRouter;
