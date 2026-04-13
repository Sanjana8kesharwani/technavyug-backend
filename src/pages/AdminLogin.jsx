import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "1234") {
      navigate("/dashboard"); 
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-[80vh]">

        <div className="bg-white/10 p-8 rounded-xl w-96 backdrop-blur-lg">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 rounded bg-white/20 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 rounded bg-white/20 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </div>

      </div>
    </MainLayout>
  );
};

export default AdminLogin;