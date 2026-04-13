import DashboardLayout from "../layouts/DashboardLayout";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard Overview 📊
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your platform efficiently
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <Search size={18} className="text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none text-sm bg-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Notification */}
          <div className="p-2 bg-white/10 rounded-full border border-white/20 cursor-pointer hover:scale-110 transition">
            <Bell className="text-white" />
          </div>

          {/* Profile */}
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-full">
            A
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
          <p className="text-gray-300 text-sm">Total Users</p>
          <h2 className="text-3xl font-bold text-white mt-2">3</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
          <p className="text-gray-300 text-sm">Certificates</p>
          <h2 className="text-3xl font-bold text-white mt-2">2</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
          <p className="text-gray-300 text-sm">Projects</p>
          <h2 className="text-3xl font-bold text-white mt-2">5</h2>
        </div>
      </div>

      {/* Quick Actions */}
<div className="mb-10">
  <h2 className="text-xl font-semibold text-white mb-6">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Add User */}
    <div
      onClick={() => navigate("/add-user")}
      className="cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        ➕ Add User
      </h3>
      <p className="text-gray-400 text-sm">
        Add new users to the platform
      </p>
    </div>

    {/* Add Project */}
    <div
      onClick={() => navigate("/add-project")}
      className="cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        🚀 Add Project
      </h3>
      <p className="text-gray-400 text-sm">
        Add new project details
      </p>
    </div>

    {/* Generate Certificate */}
    <div
      onClick={() => navigate("/generate")}
      className="cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        📜 Generate Certificate
      </h3>
      <p className="text-gray-400 text-sm">
        Create new certificates
      </p>
    </div>

  </div>
</div>

    </DashboardLayout>
  );
};

export default Dashboard;