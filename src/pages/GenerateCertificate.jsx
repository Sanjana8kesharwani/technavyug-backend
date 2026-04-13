import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Award, User } from "lucide-react";
import toast from "react-hot-toast";

const GenerateCertificate = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleGenerate = () => {

    // Validation
    if (!name || !course) {
      toast.error("Please fill all fields");
      return;
    }

    //Generate ID
    const certId = "CERT" + Math.floor(Math.random() * 10000);


    const existing = JSON.parse(localStorage.getItem("certificates")) || [];

existing.push({
  id: certId,
  name,
  course,
});

localStorage.setItem("certificates", JSON.stringify(existing));

    // Advanced Toast
    toast.success(
      `Certificate Generated 🎉`,
      {
        duration: 4000,
        style: {
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
        },
      }
    );

    console.log({
      name,
      course,
      certId,
    });

    // Reset form
    setName("");
    setCourse("");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-[80vh]">

        <div className="w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Generate Certificate 📜
          </h2>

          <div className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm">User Name</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Enter user name"
                  className="bg-transparent outline-none text-white w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="text-gray-300 text-sm">Course</label>
              <div className="flex items-center gap-3 mt-1 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <Award size={18} />
                <input
                  type="text"
                  placeholder="Frontend / AI"
                  className="bg-transparent outline-none text-white w-full"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleGenerate}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 transition text-white font-semibold shadow-lg"
            >
              Generate Certificate 🎯
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default GenerateCertificate;