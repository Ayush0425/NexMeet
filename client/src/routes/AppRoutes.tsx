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
import MyBookingsPage from "../pages/Dashboard/MyBookingsPage";
import ProfilePage from "../pages/Dashboard/Profilepage";
import EditEventPage from "../pages/Dashboard/EditEventPage";
import MyTicketsPage from "../pages/Dashboard/MyTicketsPage";
import CheckInPage from "../pages/Dashboard/CheckInPage";

import EventBookings from "../features/booking/EventBookings/EventBookings";

import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* ==========================
          Public Routes
      ========================== */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/events"
          element={<EventsPage />}
        />

        <Route
          path="/events/:id"
          element={<EventDetailsPage />}
        />
      </Route>

      {/* ==========================
          Authentication Routes
      ========================== */}

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

      {/* ==========================
          Protected Dashboard
      ========================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Home */}

        <Route
          index
          element={<DashboardHome />}
        />

        {/* ==========================
            Organizer Only
        ========================== */}

        <Route
          path="create-event"
          element={
            <ProtectedRoute
              allowedRoles={["organizer"]}
            >
              <CreateEventPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="my-events"
          element={
            <ProtectedRoute
              allowedRoles={["organizer"]}
            >
              <MyEventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="event-bookings/:eventId"
          element={
            <ProtectedRoute
              allowedRoles={["organizer"]}
            >
              <EventBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="edit-event/:id"
          element={
            <ProtectedRoute
              allowedRoles={["organizer"]}
            >
              <EditEventPage />
            </ProtectedRoute>
          }
        />

        {/* Check-in */}

        <Route
          path="check-in"
          element={
            <ProtectedRoute
              allowedRoles={["organizer"]}
            >
              <CheckInPage />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            User Only
        ========================== */}

        <Route
          path="my-bookings"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        {/* My Tickets */}

        <Route
          path="my-tickets"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <MyTicketsPage />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            Profile
        ========================== */}

        <Route
          path="profile"
          element={<ProfilePage />}
        />
      </Route>

      {/* ==========================
          404
      ========================== */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default AppRoutes;