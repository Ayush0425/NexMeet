import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPassword/ResetPasswordPage";
import EventsPage from "../pages/Events/EventsPage";
import EventDetailsPage from "../pages/EventDetails/EventDetailsPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import CreateEventPage from "../pages/Dashboard/CreateEventpage";
import MyEventsPage from "../pages/Dashboard/MyEventPage";
import ProfilePage from "../pages/Dashboard/Profilepage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import EditEventPage from "../pages/Dashboard/EditEventPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/events"
          element={<EventsPage />}
        />

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

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPasswordPage />}
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<DashboardHome />}
        />

        <Route
          path="create-event"
          element={<CreateEventPage />}
        />

        <Route
          path="my-events"
          element={<MyEventsPage />}
        />

        <Route
          path="edit-event/:id"
          element={<EditEventPage />}
        />
        <Route
          path="profile"
          element={<ProfilePage />}
        />

      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default AppRoutes;