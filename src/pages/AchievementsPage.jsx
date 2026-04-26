import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import achievements from "../data/achievementsData";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const DOMAIN_CHIPS = ["All", "AI", "Web Dev", "IoT"];

const SIDEBAR_CATEGORIES = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Full Stack Web Development",
  "Frontend Development",
  "Backend Development",
  "IoT Systems",
  "Embedded Systems",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Mobile App Development",
  "Blockchain",
  "Research & Publication",
];

export default function Achievements() {
  const [search, setSearch] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = achievements.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.role && item.role.toLowerCase().includes(search.toLowerCase()));
    const matchDomain =
      activeDomain === "All" || item.domain === activeDomain;
    const matchBatch =
      selectedBatch === "All" || item.batch === selectedBatch;
    const matchCat =
      selectedCategories.length === 0 ||
      selectedCategories.some((c) => item.categories?.includes(c));
    return matchSearch && matchDomain && matchBatch && matchCat;
  });

  return (
    <MainLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        .ach-root { font-family: 'DM Sans', sans-serif; background: #f8faff; min-height: 100vh; }

        /* SEARCH */
        .ach-search-wrap { position: relative; }
        .ach-search-wrap input {
          width: 100%; padding: 10px 16px 10px 40px;
          border: 1.5px solid #e5e7eb; border-radius: 10px;
          font-size: 0.875rem; font-family: 'DM Sans', sans-serif;
          color: #111827; background: #fff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ach-search-wrap input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        .ach-search-wrap input::placeholder { color: #9ca3af; }
        .ach-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }

        /* LAYOUT */
        .ach-layout { display: flex; gap: 1.5rem; align-items: flex-start; }

        /* SIDEBAR */
        .ach-sidebar {
          width: 250px; flex-shrink: 0;
          background: #fff; border: 1px solid #e5e7eb;
          border-radius: 16px; overflow: hidden;
          position: sticky; top: 96px;
        }
        .ach-sidebar-hdr {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 15px; background: #3b82f6; cursor: pointer;
        }
        .ach-sidebar-hdr-left { display: flex; align-items: center; gap: 9px; }
        .ach-sidebar-hdr-icon {
          width: 30px; height: 30px; background: rgba(255,255,255,0.2);
          border-radius: 7px; display: flex; align-items: center; justify-content: center;
        }
        .ach-sidebar-title { font-family: 'Sora', sans-serif; font-weight: 600; font-size: 0.88rem; color: #fff; }
        .ach-sidebar-sub { font-size: 0.72rem; color: rgba(255,255,255,0.72); }
        .ach-chevron { color: #fff; font-size: 11px; transition: transform 0.25s; display: inline-block; }
        .ach-chevron.open { transform: rotate(180deg); }

        /* BATCH */
        .ach-section { padding: 11px 14px; border-bottom: 1px solid #f3f4f6; }
        .ach-section-title {
          font-family: 'Sora', sans-serif; font-size: 0.7rem; font-weight: 600;
          color: #9ca3af; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 8px;
        }
        .batch-row { display: flex; flex-wrap: wrap; gap: 5px; }
        .batch-btn {
          padding: 4px 11px; border-radius: 20px; font-size: 0.76rem; font-weight: 500;
          border: 1.5px solid #e5e7eb; background: #fff; color: #6b7280;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .batch-btn:hover { border-color: #93c5fd; color: #3b82f6; background: #eff6ff; }
        .batch-btn.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

        /* CAT LIST */
        .ach-cats { max-height: 370px; overflow-y: auto; padding: 6px 0 10px; }
        .ach-cats::-webkit-scrollbar { width: 4px; }
        .ach-cats::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        .ach-cat-row {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 14px; cursor: pointer; transition: background 0.13s;
        }
        .ach-cat-row:hover { background: #f8faff; }
        .ach-checkbox {
          width: 16px; height: 16px; border-radius: 4px;
          border: 2px solid #d1d5db; background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.13s; font-size: 10px; font-weight: 700;
        }
        .ach-checkbox.on { background: #3b82f6; border-color: #3b82f6; color: #fff; }
        .ach-cat-lbl { font-size: 0.82rem; color: #374151; transition: color 0.13s; }
        .ach-cat-row:hover .ach-cat-lbl { color: #3b82f6; }

        /* CLEAR */
        .ach-clear {
          margin: 0 14px 11px; width: calc(100% - 28px);
          padding: 7px; border-radius: 8px; border: 1px solid #e5e7eb;
          background: #fff; color: #6b7280; font-size: 0.78rem;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s;
        }
        .ach-clear:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }

        /* CHIPS */
        .ach-chips { display: flex; gap: 7px; margin-bottom: 1.1rem; flex-wrap: wrap; }
        .ach-chip {
          padding: 7px 18px; border-radius: 8px; font-size: 0.84rem; font-weight: 500;
          border: 1.5px solid #e5e7eb; background: #fff; color: #6b7280;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .ach-chip:hover { border-color: #93c5fd; color: #3b82f6; }
        .ach-chip.on { background: #3b82f6; color: #fff; border-color: #3b82f6; box-shadow: 0 4px 10px rgba(59,130,246,0.22); }

        /* GRID */
        .ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 1.1rem; }

        /* CARD */
        .ach-card {
          background: #fff; border-radius: 14px; overflow: hidden;
          border: 1px solid #e5e7eb; cursor: pointer;
          transition: transform 0.26s, box-shadow 0.26s, border-color 0.26s;
          animation: fadeUp 0.4s ease both;
        }
        .ach-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(59,130,246,0.13); border-color: #bfdbfe; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

        .ach-img-wrap { position: relative; height: 185px; overflow: hidden; background: #e8f0fe; }
        .ach-img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.32s; }
        .ach-card:hover .ach-img { transform: scale(1.06); }

        .ach-dtag {
          position:absolute; top:10px; left:10px;
          background: rgba(255,255,255,0.93); backdrop-filter: blur(5px);
          color: #2563eb; font-size:0.68rem; font-weight:600;
          font-family:'Sora',sans-serif; padding:3px 9px; border-radius:20px;
          border:1px solid rgba(59,130,246,0.2);
        }
        .ach-btag {
          position:absolute; top:10px; right:10px;
          background: rgba(30,58,138,0.8); backdrop-filter: blur(5px);
          color:#bfdbfe; font-size:0.68rem; font-weight:500;
          padding:3px 9px; border-radius:20px;
        }

        .ach-body { padding: 0.95rem 1rem 1.1rem; }
        .ach-meta { display:flex; align-items:center; gap:9px; margin-bottom:8px; }
        .ach-avatar {
          width:36px; height:36px; border-radius:50%; flex-shrink:0;
          background: linear-gradient(135deg,#2563eb,#60a5fa);
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-family:'Sora',sans-serif; font-size:0.75rem; font-weight:600;
          border:2px solid #e8f0fe;
        }
        .ach-name { font-family:'Sora',sans-serif; font-weight:600; font-size:0.9rem; color:#111827; margin:0; }
        .ach-role { font-size:0.74rem; color:#3b82f6; font-weight:500; margin:2px 0 0; }
        .ach-highlight {
          font-size:0.8rem; color:#6b7280; line-height:1.6;
          border-left:3px solid #bfdbfe; padding-left:9px; margin-bottom:0.85rem;
        }

        /* BUTTONS — matches your project page exactly */
        .ach-btns { display:flex; flex-direction:column; gap:6px; }
        .ach-btn {
          width:100%; padding:8px 12px; border-radius:8px;
          font-size:0.81rem; font-family:'DM Sans',sans-serif; font-weight:500;
          border:1px solid #e5e7eb; background:#fff; color:#374151;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;
          transition: all 0.16s;
        }
        .ach-btn:hover { background:#f0f4ff; border-color:#bfdbfe; color:#2563eb; }
        .ach-btn.pri { background:#eff6ff; color:#2563eb; border-color:#bfdbfe; }
        .ach-btn.pri:hover { background:#3b82f6; color:#fff; border-color:#3b82f6; }

        /* SHIMMER */
        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        .sh { background:linear-gradient(90deg,#f0f4ff 25%,#dce8ff 50%,#f0f4ff 75%); background-size:1200px 100%; animation:shimmer 1.4s infinite; border-radius:6px; }

        /* EMPTY */
        .ach-empty { text-align:center; padding:5rem 2rem; }
        .ach-empty h2 { font-family:'Sora',sans-serif; color:#6b7280; font-size:1.1rem; font-weight:600; }
        .ach-empty p { color:#9ca3af; font-size:0.83rem; margin-top:5px; }

        .ach-count { font-size:0.78rem; color:#9ca3af; margin-bottom:1rem; }
        .ach-count b { color:#3b82f6; font-weight:600; }

        @media (max-width: 768px) {
          .ach-layout { flex-direction: column; }
          .ach-sidebar { width: 100%; position: static; }
        }
      `}</style>

      <div className="ach-root pt-20 pb-16 px-4 md:px-8">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* ── HEADER ── */}
          <div style={{ padding: "2.2rem 0 1.3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "2rem", fontWeight: 700, color: "#111827" }}>
                Explore <span style={{ color: "#3b82f6" }}>Achievements</span>
              </h1>
              <p style={{ color: "#6b7280", fontSize: "0.87rem", marginTop: 4 }}>
                Internship highlights &amp; student success stories
              </p>
            </div>
            <div className="ach-search-wrap" style={{ width: "100%", maxWidth: 310 }}>
              <Search size={15} className="ach-search-icon" />
              <input
                type="text"
                placeholder="Search achievers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ── MAIN LAYOUT ── */}
          <div className="ach-layout">

            {/* ── SIDEBAR ── */}
            <div className="ach-sidebar">

              {/* Header toggle */}
              <div className="ach-sidebar-hdr" onClick={() => setSidebarOpen((o) => !o)}>
                <div className="ach-sidebar-hdr-left">
                  <div className="ach-sidebar-hdr-icon">
                    <SlidersHorizontal size={15} color="#fff" />
                  </div>
                  <div>
                    <div className="ach-sidebar-title">Filters</div>
                    <div className="ach-sidebar-sub">Select categories</div>
                  </div>
                </div>
                <span className={`ach-chevron ${sidebarOpen ? "open" : ""}`}>▼</span>
              </div>

              {sidebarOpen && (
                <>
                  {/* Batch */}
                  <div className="ach-section">
                    <div className="ach-section-title">Batch Year</div>
                    <div className="batch-row">
                      {["All", "2022", "2023", "2024"].map((b) => (
                        <button
                          key={b}
                          className={`batch-btn ${selectedBatch === b ? "active" : ""}`}
                          onClick={() => setSelectedBatch(b)}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specialization label */}
                  <div style={{ padding: "11px 14px 5px" }}>
                    <div className="ach-section-title">Specialization</div>
                  </div>

                  {/* Category checkboxes */}
                  <div className="ach-cats">
                    {SIDEBAR_CATEGORIES.map((cat) => {
                      const on = selectedCategories.includes(cat);
                      return (
                        <div key={cat} className="ach-cat-row" onClick={() => toggleCategory(cat)}>
                          <div className={`ach-checkbox ${on ? "on" : ""}`}>{on ? "✓" : ""}</div>
                          <span className="ach-cat-lbl">{cat}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Clear */}
                  {(selectedCategories.length > 0 || selectedBatch !== "All") && (
                    <button className="ach-clear" onClick={() => { setSelectedCategories([]); setSelectedBatch("All"); }}>
                      ✕ Clear All Filters
                    </button>
                  )}
                </>
              )}
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Domain chips */}
              <div className="ach-chips">
                {DOMAIN_CHIPS.map((d) => (
                  <button
                    key={d}
                    className={`ach-chip ${activeDomain === d ? "on" : ""}`}
                    onClick={() => setActiveDomain(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Count */}
              {!loading && (
                <p className="ach-count">
                  Showing <b>{filtered.length}</b> achievement{filtered.length !== 1 ? "s" : ""}
                </p>
              )}

              {/* Shimmer */}
              {loading ? (
                <div className="ach-grid">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e5e7eb" }}>
                      <div className="sh" style={{ height: 185, borderRadius: 0 }} />
                      <div style={{ padding: "0.95rem" }}>
                        <div className="sh" style={{ height: 11, width: "60%", marginBottom: 8 }} />
                        <div className="sh" style={{ height: 10, width: "40%", marginBottom: 8 }} />
                        <div className="sh" style={{ height: 10, width: "80%", marginBottom: 13 }} />
                        <div className="sh" style={{ height: 32, marginBottom: 6 }} />
                        <div className="sh" style={{ height: 32 }} />
                      </div>
                    </div>
                  ))}
                </div>

              ) : filtered.length === 0 ? (
                <div className="ach-empty">
                  <div style={{ fontSize: "3rem", opacity: 0.28, marginBottom: 14 }}>🔍</div>
                  <h2>No Achievements Found</h2>
                  <p>Try changing your search or filters</p>
                </div>

              ) : (
                <div className="ach-grid">
                  {filtered.map((item, idx) => (
                    <div
                      key={item.id}
                      className="ach-card"
                      style={{ animationDelay: `${idx * 0.06}s` }}
                      onClick={() => navigate(`/achievements/${String(item.id)}`)}
                    >
                      {/* Image */}
                      <div className="ach-img-wrap">
                        <img src={item.image} alt={item.name} className="ach-img" loading="lazy" />
                        <span className="ach-dtag">{item.domain}</span>
                        {item.batch && <span className="ach-btag">Batch '{item.batch.slice(2)}</span>}
                      </div>

                      {/* Body */}
                      <div className="ach-body">
                        <div className="ach-meta">
                          <div className="ach-avatar">{getInitials(item.name)}</div>
                          <div>
                            <p className="ach-name">{item.name}</p>
                            <p className="ach-role">{item.role}</p>
                          </div>
                        </div>

                        <p className="ach-highlight">{item.highlight}</p>

                        {/* Buttons — same as Projects page */}
                        <div className="ach-btns">
                          <button
                            className="ach-btn pri"
                            onClick={(e) => { e.stopPropagation(); navigate(`/achievements/${item.id}`); }}
                          >
                            <ArrowRight size={13} /> View Achievement
                          </button>
                          <button
                            className="ach-btn"
                            onClick={(e) => { e.stopPropagation(); navigate(`/achievements/${item.id}#story`); }}
                          >
                            ▶ Read Story
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}