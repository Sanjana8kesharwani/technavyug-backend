import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import PrivacyPolicy from "./pages/PrivacyPolicies";
import TermsConditions from "./pages/TermsConditions";
import Contact from "./pages/Contact";

// Admin imports (FIXED)
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddUser from "./pages/admin/AddUser";
import AddProject from "./pages/admin/AddProject";
import GenerateCertificate from "./pages/admin/GenerateCertificate";


import CursorGlow from "./components/CursorGlow";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <CursorGlow />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🔐 Admin Routes (UPDATED) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/add-project" element={<AddProject />} />
        <Route path="/admin/generate" element={<GenerateCertificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;