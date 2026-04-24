import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { users } from "../data/dummyData";

// ─── SHIMMER ─────────────────────────────
function ShimmerCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse bg-gray-200 h-64"></div>
  );
}

export default function AchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const filtered = users.filter((u) => {
    const s = u.name.toLowerCase().includes(search.toLowerCase());
    const d = domain === "All" || u.domain === domain;
    return s && d;
  });

  return (
    <MainLayout>
      <div className="pt-24 px-6 max-w-7xl mx-auto pb-16">

        {/* HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          🎓 Certificates & Achievements
        </h1>

        {/* SEARCH */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search achievers..."
            className="border px-4 py-2 rounded-lg w-full max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {["All", "AI", "Frontend", "Backend"].map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className={`px-4 py-2 rounded-full text-sm ${
                domain === d
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {loading
            ? Array(6).fill(0).map((_, i) => <ShimmerCard key={i} />)
            : filtered.map((user) => (
                <div
                  key={user.id}
                  className="relative group rounded-2xl overflow-hidden shadow-lg"
                >
                  {/* IMAGE */}
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* VERIFIED BADGE */}
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    ✓ Verified
                  </span>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">

                    <h3 className="text-white font-semibold text-lg">
                      {user.name}
                    </h3>

                    <p className="text-gray-200 text-sm">
                      {user.role}
                    </p>

                    {/* BUTTON */}
                    <button className="mt-3 bg-white text-black text-xs px-4 py-1 rounded-full w-fit hover:bg-gray-200">
                      View Certificate
                    </button>

                  </div>
                </div>
              ))}
        </div>

      </div>
    </MainLayout>
  );
}