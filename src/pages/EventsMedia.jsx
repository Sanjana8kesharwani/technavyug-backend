import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import EventsSection from "../components/events/EventsSection";

export default function EventsMedia() {
  const tabs = [
    "Events",
    "Media Gallery",
    "Latest News & Updates",
    "Blogs",
    "Newsletters",
    "Gallery Videos",
  ];

  const words = ["Events", "Gallery", "Blogs", "News", "Videos"];

  const [activeTab, setActiveTab] = useState("Events");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 md:pt-28">
        {/* HERO */}
        <section className="bg-gradient-to-b from-blue-50 to-white text-center py-16 md:py-20 px-4 sm:px-6">
          <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-4">
            CONNECT, LEARN, SUCCEED
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Don't Miss Out <br />
            On <span className="text-black">Tech</span>
            <span className="text-cyan-500">navyug</span>{" "}
            <span className="text-cyan-500 inline-block h-[1.2em] overflow-hidden">
              <span key={index} className="block animate-slide">
                {words[index]}
              </span>
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-500 text-sm mt-4">
            Stay connected with events, blogs, and updates from Technavyug.
          </p>

          <button className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition">
            Explore
          </button>
        </section>

        {/* TABS */}
        <div className="flex justify-center mt-8 px-4">
          <div className="bg-gray-100 rounded-full p-2 md:p-3 flex gap-2 md:gap-3 shadow overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-cyan-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {activeTab === "Events" && <EventsSection />}

          {activeTab === "Media Gallery" && (
            <div className="text-center">Gallery coming soon...</div>
          )}

          {activeTab === "Blogs" && (
            <div className="text-center">Blogs coming soon...</div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
