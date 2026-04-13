import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { users } from "../data/dummyData";
import Card from "../components/Card";
import CursorGlow from "../components/CursorGlow";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  //  rotating words
  const words = ["Build", "Showcase", "Verify"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="relative overflow-hidden">

        <CursorGlow />

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="w-[500px] h-[500px] bg-purple-500 opacity-30 blur-[120px] rounded-full absolute top-[-100px] left-[-100px] animate-pulse"></div>
          <div className="w-[500px] h-[500px] bg-blue-500 opacity-30 blur-[120px] rounded-full absolute bottom-[-100px] right-[-100px] animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">

          <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 float">

            <span key={index} className="fade-text">
              {words[index]}
            </span>{" "}
            your achievements 🚀

          </h1>

          <p className="text-gray-400 text-lg mb-10 max-w-xl">
            Showcase your projects, certificates & achievements in a powerful and modern way.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/achievements")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110 hover:shadow-xl transition duration-300"
            >
              Explore Achievers
            </button>

            <button
              onClick={() => navigate("/verify")}
              className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-105 transition duration-300"
            >
              Verify Certificate
            </button>
          </div>

        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 text-center mb-20">

          <div className="hover:scale-110 transition duration-300">
            <h2 className="text-3xl font-bold text-white">500+</h2>
            <p className="text-gray-400">Students</p>
          </div>

          <div className="hover:scale-110 transition duration-300">
            <h2 className="text-3xl font-bold text-white">100+</h2>
            <p className="text-gray-400">Projects</p>
          </div>

          <div className="hover:scale-110 transition duration-300">
            <h2 className="text-3xl font-bold text-white">200+</h2>
            <p className="text-gray-400">Certificates</p>
          </div>

        </div>

        {/* Featured Achievers */}
        <div className="px-6 mb-20">

          <h2 className="text-3xl font-bold text-white text-center mb-10">
            🌟 Featured Achievers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {users.slice(0, 3).map((user) => (
              <Card
                key={user.id}
                id={user.id}
                name={user.name}
                role={user.role}
                image={user.image}
              />
            ))}

          </div>

        </div>

        {/* Trusted Section */}
        <div className="text-center mb-20">
          <p className="text-gray-400 mb-4">Trusted by students from</p>

          <div className="flex justify-center gap-10 text-white text-lg opacity-70">
            <span>Google</span>
            <span>Amazon</span>
            <span>Microsoft</span>
            <span>Startups</span>
          </div>
        </div>

        {/* Why Section */}
        <div className="px-6 mb-20">

          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Why Use Our Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 p-6 rounded-xl text-center hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2">Showcase Work</h3>
              <p className="text-gray-400">Display your projects and achievements.</p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl text-center hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2">Verify Certificates</h3>
              <p className="text-gray-400">Instantly validate authenticity.</p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl text-center hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2">Build Identity</h3>
              <p className="text-gray-400">Create a strong developer presence.</p>
            </div>

          </div>

        </div>

        {/* Final CTA */}
        <div className="text-center mb-20">

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your journey?
          </h2>

          <button
            onClick={() => navigate("/achievements")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110 transition shadow-lg float"
          >
            Get Started 🚀
          </button>

        </div>

      </div>
    </MainLayout>
  );
};

export default Home;