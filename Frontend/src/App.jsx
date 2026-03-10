import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/style/Style.css";
import LandingPage from "./pages/LandingPage.jsx";
import GenrateVideo from "./pages/GenrateVideo.jsx";
import SignUp from "./auth/SignUp.jsx";
import SignIn from "./auth/SignIn.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import WatchDemo from "./components/WatchDemo.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Pricing from "./pages/Pricing.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import Account from "./pages/Account.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/watch-demo" element={<WatchDemo />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-video" element={<GenrateVideo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
