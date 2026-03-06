import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Pricing from "../Pages/Pricing";
import Matches from "../Pages/Matches";
import Explores from "../Pages/Explores";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import UserProfile from "../Pages/UserProfile";
import Chat from "../Pages/Chat";
import TopToScroll from "../Pages/TopToScroll";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService";
import VerifyEmail from "../Pages/VerifyEmail";
import ResendVerification from "../Pages/ResendVerification";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <TopToScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/explore" element={<Explores />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
