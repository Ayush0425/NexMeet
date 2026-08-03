import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import EventsPage from "../pages/Events/EventsPage";
import EventDetailsPage from "../pages/EventDetails/EventDetailsPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route
          path="/events/:id"
          element={<EventDetailsPage />}
        />
      </Route>

      {/* Authentication Routes */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default AppRoutes;