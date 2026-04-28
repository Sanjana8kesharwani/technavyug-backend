import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = ({ setOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">

      <div className={`pointer-events-auto w-[95%] md:w-[92%] max-w-[1400px] rounded-full px-6 md:px-10 py-4 
      md:py-5 flex items-center justify-between transition-all duration-300
      ${ scrolled ? "bg-white shadow-lg border border-gray-200" : "bg-white/70 backdrop-blur-xl border border-white/30"}`}>

      
        <div className="flex items-center gap-4">

          <button onClick={() => setOpen(true)}>
            <Menu className="text-gray-800" />
          </button>

          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-200">
              <img src="/Technavyug Logo.jpeg" alt="logo" className="w-full h-full object-cover"/>
            </div>

            <h1 className="text-base md:text-xl font-semibold text-black">
              Tech<span className="text-cyan-500">navyug</span>
            </h1>
          </Link>

        </div>

        {/* CENTER MENU */}
       <div className="hidden md:flex gap-10 text-base md:text-lg font-medium text-gray-700">

  <Link to="/" className="hover:text-cyan-500 transition">Home</Link>
  <Link to="/about" className="hover:text-cyan-500 transition">About</Link>
  <Link to="/projects" className="hover:text-cyan-500 transition">Projects</Link>
  <Link to="/achievements" className="hover:text-cyan-500 transition">Achievements</Link>
  <Link to="/events-media" className="hover:text-cyan-500 transition">Events & Media</Link>
  <Link to="/verify" className="hover:text-cyan-500 transition">Verify</Link>
  <Link to="/contact" className="hover:text-cyan-500 transition">Contact</Link>

</div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <Link to="/admin" className="px-4 py-2 rounded-full border border-blue-300 text-gray-700 hover:bg-cyan-100 transition text-sm">  Login </Link>
           
          <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 md:px-5 py-2 rounded-full hover:scale-105 transition shadow-md text-sm">
            Get Started
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;