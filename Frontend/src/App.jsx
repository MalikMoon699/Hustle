import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/style/Style.css";
import LandingPage from "./pages/LandingPage.jsx";
import GenrateVideo from "./pages/GenrateVideo.jsx";
import SignUp from "./auth/SignUp.jsx";
import SignIn from "./auth/SignIn.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import WatchDemo from "./components/WatchDemo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Pricing from "./pages/Pricing.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import Account from "./pages/Account.jsx";
import { ProtectedRoute, PublicRoute } from "./routes/RouteGuards.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role={["user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-video"
            element={
              <ProtectedRoute role={["user"]}>
                <GenrateVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute role={["user"]}>
                <Pricing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute role={["user"]}>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute role={["user"]}>
                <Account />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/watch-demo" element={<WatchDemo />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
