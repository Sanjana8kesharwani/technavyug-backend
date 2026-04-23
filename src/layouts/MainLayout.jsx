import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar setOpen={setOpen} />

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <main className="flex-1 pt-24">
        {children}
      </main>

      {/* Footer always bottom */}
      <Footer />

    </div>
  );
};

export default MainLayout;