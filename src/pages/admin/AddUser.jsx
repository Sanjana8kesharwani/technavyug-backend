import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { User, Briefcase, Layers } from "lucide-react";
import toast from "react-hot-toast";

const AddUser = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      role,
      domain,
      image: "https://via.placeholder.com/150",
    };

    console.log(newUser);
    toast.success("User Added Successfully 🎉");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-[80vh]">

        <div className="w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Add New User 👤
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm">Name</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <User size={18} className="text-gray-300" />
                <input
                  type="text"
                  className="bg-transparent outline-none text-white w-full"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-gray-300 text-sm">Role</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <Briefcase size={18} className="text-gray-300" />
                <input
                  type="text"
                  className="bg-transparent outline-none text-white w-full"
                  placeholder="Enter Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            {/* Domain */}
            <div>
              <label className="text-gray-300 text-sm">Domain</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <Layers size={18} className="text-gray-300" />
                <input
                  type="text"
                  className="bg-transparent outline-none text-white w-full"
                  placeholder="Frontend / AI / Full Stack"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition text-white font-semibold"
            >
              Add User 🚀
            </button>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default AddUser;