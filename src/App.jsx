import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import PrivacyPolicy from "./pages/PrivacyPolicies";
import TermsConditions from "./pages/TermsConditions";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import AchievementsPage from "./pages/AchievementsPage";
import AchievementDetails from "./pages/AchievementDetails";
import Team from "./pages/Team";
import EventsMedia from "./pages/EventsMedia";



// Admin imports (FIXED)
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddUser from "./pages/admin/AddUser";
import AddProject from "./pages/admin/AddProject";
import GenerateCertificate from "./pages/admin/GenerateCertificate";
import Achievements from "./pages/admin/AdminAchievements";


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
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
         <Route path="/project/:id" element={<ProjectDetails />} />
         <Route path="/achievements" element={<AchievementsPage />} /> 
        <Route path="/achievements/:id" element={<AchievementDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events-media" element={<EventsMedia />} />


        {/* 🔐 Admin Routes (UPDATED) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/add-project" element={<AddProject />} />
        <Route path="/admin/generate" element={<GenerateCertificate />} />
        <Route path="/admin/achievements" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;