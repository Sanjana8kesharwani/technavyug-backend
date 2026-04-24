import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import achievements from "../data/achievementsData";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Achievements() {
  const [search, setSearch] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const domains = ["AI", "Web Dev"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDomain = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const filtered = achievements.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDomain =
      selectedDomains.length === 0 ||
      selectedDomains.includes(item.domain);

    return matchSearch && matchDomain;
  });

  return (
    <MainLayout>
      <div className="pt-24 px-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-white shadow-sm border rounded-2xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Explore <span className="text-blue-500">Achievements</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Discover student success stories
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search achievers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* FILTER CHIPS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedDomains([])}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedDomains.length === 0
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            All
          </button>

          {domains.map((d) => (
            <button
              key={d}
              onClick={() => toggleDomain(d)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedDomains.includes(d)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* SHIMMER LOADING */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl shadow p-4"
              >
                <div className="h-40 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076506.png"
              alt="no data"
              className="w-40 mb-4 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-600">
              No Achievements Found
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Try changing your search or filters
            </p>
          </div>
        ) : (
          /* CARDS */
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/achievements/${item.id}`)}
                className="cursor-pointer bg-white rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    {item.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}