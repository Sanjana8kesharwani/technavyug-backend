import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Award, CheckCircle, LogOut } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Achievements", path: "/achievements", icon: <Award size={18} /> },
    { name: "Verify", path: "/verify", icon: <CheckCircle size={18} /> },
  ];

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-[#020617] via-[#0f172a] to-black text-white p-6 flex flex-col border-r border-white/10">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">

          <div className="bg-white p-2 rounded-full shadow-lg hover:scale-105 transition">
            <img
              src="/Technavyug Logo.jpeg"
              alt="Technavyug Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold mt-3 tracking-wide text-gray-200">
            Technavyug
          </h2>

        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 flex-1">

          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}

                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></span>
                )}
              </Link>
            );
          })}

        </nav>

        {/* Logout */}
        <button className="flex items-center justify-center gap-2 mt-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition shadow-md hover:scale-105">
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden bg-black text-white p-6">

     
        <div className="absolute inset-0 -z-10">
          <div className="w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[120px] rounded-full absolute top-[-100px] left-[-100px]"></div>
          <div className="w-[500px] h-[500px] bg-blue-600 opacity-30 blur-[120px] rounded-full absolute bottom-[-100px] right-[-100px]"></div>
        </div>

        {children}

      </div>

    </div>
  );
};

export default DashboardLayout;