import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

// Shimmer Skeleton Card
function ShimmerCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-200 rounded w-3/5" />
        <div className="h-3 bg-gray-200 rounded w-2/5" />
        <div className="h-9 bg-gray-200 rounded-lg w-full" />
        <div className="h-9 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}

const dummyProjects = [
  {
    id: "certificate-verification",
    title: "Certificate Verification System",
    desc: "QR-based secure verification platform",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=200&fit=crop",
    category: "Web",
    enrolled: 325,
  },
  {
    id: "ai-chat-app",
    title: "AI Chat App",
    desc: "Real-time AI chat using socket.io",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop",
    category: "AI",
    enrolled: 233,
  },
  {
    id: "food-delivery-app",
    title: "Food Delivery App",
    desc: "Swiggy-like full stack app",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop",
    category: "Web",
    enrolled: 193,
  },
  {
    id: "portfolio-builder",
    title: "Portfolio Builder",
    desc: "Dynamic portfolio generator",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop",
    category: "Frontend",
    enrolled: 158,
  },
];

const categories = [
  "Data Science", "Cloud Technology", "Full Stack Web Development",
  "Data Analyst", "IOT", "Blockchain",
  "Software Tester", "Cybersecurity", "Front-end Web Development",
  "Mobile App Development",
];

const tabs = ["All", "Web", "AI", "Frontend"];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = dummyProjects.filter((p) => {
    return (
      (activeTab === "All" || p.category === activeTab) &&
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <MainLayout>
      <div className="pt-28 px-6 max-w-7xl mx-auto pb-12">

        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Explore <span className="text-sky-500">Projects</span>
            </h1>
            <p className="text-gray-400 mt-1.5 text-sm">
              Internship analytics & student performance insights
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-sm">▼</div>
              <div>
                <p className="font-bold text-sm text-gray-800">Filters</p>
                <p className="text-xs text-gray-400">Select categories</p>
              </div>
            </div>

            {categories.map((cat) => (
              <div key={cat} className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group">
                <label className="flex items-center gap-2.5 text-sm text-gray-600 font-medium cursor-pointer">
                  <input type="checkbox" className="accent-sky-500 w-3.5 h-3.5 cursor-pointer" />
                  {cat}
                </label>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">

            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                    activeTab === tab
                      ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200"
                      : "bg-white text-gray-500 border-gray-200 hover:border-sky-300 hover:text-sky-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading
                ? Array(6).fill(0).map((_, i) => <ShimmerCard key={i} />)
                : filteredProjects.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">

                      <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />

                      <div className="p-4">
                        <h2 className="font-bold text-sm text-gray-900 mb-1.5">
                          {p.title}
                        </h2>

                        <p className="text-gray-400 text-xs mb-4">
                          {p.desc}
                        </p>

                        <div className="flex flex-col gap-2">

                          {/* ✅ ONLY CHANGE HERE */}
                          <button
                            onClick={() => navigate(`/project/${p.id}`, { state: p })}
                            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
                          >
                            ▶ Start Learning &nbsp;›
                          </button>

                          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600">
                            ▶ View Demo &nbsp;›
                          </button>

                        </div>
                      </div>
                    </div>
                  ))
              }
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}