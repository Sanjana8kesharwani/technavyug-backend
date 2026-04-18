import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FileText, Code, User } from "lucide-react";
import toast from "react-hot-toast";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title,
      tech,
      user,
    };

    console.log("New Project:", newProject);
    toast.success("Project Added 🚀");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-[80vh]">

        <div className="w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Add New Project 🚀
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="text-gray-300 text-sm">Project Title</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <FileText size={18} />
                <input
                  type="text"
                  placeholder="Enter project title"
                  className="bg-transparent outline-none text-white w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Tech */}
            <div>
              <label className="text-gray-300 text-sm">Technologies</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <Code size={18} />
                <input
                  type="text"
                  placeholder="React, Node, MongoDB"
                  className="bg-transparent outline-none text-white w-full"
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                />
              </div>
            </div>

            {/* User */}
            <div>
              <label className="text-gray-300 text-sm">User Name</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Assign to user"
                  className="bg-transparent outline-none text-white w-full"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
            </div>

            {/* Button */}
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition text-white font-semibold">
              Add Project 🚀
            </button>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default AddProject;