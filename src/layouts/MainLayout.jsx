import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>

      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <div className="pt-24">
        {children}

        <Footer />
      </div>

    </div>
  );
};

export default MainLayout;