import { useState, useEffect, useRef } from "react";
import { useProjects } from "../../provider/useProjects";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminProjects() {
  const {
    projects,
    deleteProject,
    duplicateProject,
    toggleFeatured,
    togglePublish,
  } = useProjects();

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);

  const menuRef = useRef(null);

  // FILTER STATES
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState("");

  // OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteProject(id);
      toast.success("Project deleted");
    }
  };

  // FILTER LOGIC
  const filteredProjects = projects.filter((p) => {
    const statusMatch = !statusFilter || p.status === statusFilter;

    const categoryMatch =
      !categoryFilter || p.category === categoryFilter;

    const featuredMatch =
      featuredFilter === ""
        ? true
        : featuredFilter === "featured"
        ? p.featured
        : !p.featured;

    return statusMatch && categoryMatch && featuredMatch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "20px" }}>
      {/* MAIN WRAPPER */}
      <div
        style={{
          background: "#c8d8e8",
          borderRadius: "20px",
          padding: "24px",
          minHeight: "calc(100vh - 40px)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
              Projects
            </h2>

            <p style={{ fontSize: "13px", color: "#555" }}>
              Manage all projects
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-project")}
            style={{
              background: "#4f46e5",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add Project
          </button>
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={filterStyle}
          >
            <option value="">All Status</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={filterStyle}
          >
            <option value="">All Categories</option>
            <option>AI</option>
            <option>IoT</option>
            <option>Research</option>
          </select>

          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            style={filterStyle}
          >
            <option value="">All Projects</option>
            <option value="featured">Featured</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* TABLE BOX */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "16px",
            overflow: "visible",
            position: "relative",
          }}
        >
          {filteredProjects.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No projects found
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              {/* FIXED COLUMN WIDTHS */}
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "36%" }} />
              </colgroup>

              {/* HEADER */}
              <thead
                style={{
                  background: "#e2e8f0",
                  textAlign: "left",
                }}
              >
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Status</th>

                  <th style={{ ...thStyle, textAlign: "center" }}>
                    Featured
                  </th>

                  <th style={{ ...thStyle, textAlign: "center" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {filteredProjects.map((p, index) => {
                  const isLastRows =
                    index >= filteredProjects.length - 3;

                  return (
                    <tr
                      key={p.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={tdStyle}>{p.title}</td>

                      <td style={tdStyle}>{p.category}</td>

                      <td style={tdStyle}>{p.status}</td>

                      {/* FEATURED */}
                      <td
                        style={{
                          ...tdStyle,
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() => toggleFeatured(p.id)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "18px",
                          }}
                        >
                          {p.featured ? "⭐" : "☆"}
                        </button>
                      </td>

                      {/* ACTIONS */}
                      <td
                        style={{
                          ...tdStyle,
                          textAlign: "center",
                          overflow: "visible",
                          position: "relative",
                        }}
                      >
                        <div
                          ref={menuRef}
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          {/* EDIT */}
                          <button
                            onClick={() =>
                              navigate(`/admin/edit-project/${p.id}`)
                            }
                            style={{
                              background: "#4f46e5",
                              color: "#fff",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "13px",
                              height: "32px",
                            }}
                          >
                            Edit
                          </button>

                          {/* 3 DOT */}
                          <button
                            onClick={() =>
                              setOpenMenu(
                                openMenu === p.id ? null : p.id
                              )
                            }
                            style={{
                              border: "none",
                              background: "transparent",
                              fontSize: "20px",
                              cursor: "pointer",
                              lineHeight: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            ⋮
                          </button>

                          {/* DROPDOWN */}
                          {openMenu === p.id && (
                            <div
                              style={{
                                position: "absolute",
                                right: "0",
                                background: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                boxShadow:
                                  "0 10px 25px rgba(0,0,0,0.08)",
                                zIndex: 9999,
                                width: "160px",
                                overflow: "hidden",

                                top: isLastRows
                                  ? "auto"
                                  : "38px",

                                bottom: isLastRows
                                  ? "38px"
                                  : "auto",
                              }}
                            >
                              {/* COPY */}
                              <div
                                onClick={() => {
                                  duplicateProject(p.id);
                                  toast.success(
                                    "Project duplicated"
                                  );
                                  setOpenMenu(null);
                                }}
                                style={menuItemStyle}
                              >
                                Copy Project
                              </div>

                              {/* PUBLISH */}
                              <div
                                onClick={() => {
                                  togglePublish(p.id);
                                  setOpenMenu(null);
                                }}
                                style={menuItemStyle}
                              >
                                {p.published
                                  ? "Unpublish"
                                  : "Publish"}
                              </div>

                              {/* FEATURE */}
                              <div
                                onClick={() => {
                                  toggleFeatured(p.id);
                                  setOpenMenu(null);
                                }}
                                style={menuItemStyle}
                              >
                                {p.featured
                                  ? "Remove Featured"
                                  : "Mark Featured"}
                              </div>

                              {/* DELETE */}
                              <div
                                onClick={() => {
                                  handleDelete(p.id);
                                  setOpenMenu(null);
                                }}
                                style={{
                                  ...menuItemStyle,
                                  color: "#dc2626",
                                  borderBottom: "none",
                                }}
                              >
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "14px",
  color: "#333",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const filterStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const menuItemStyle = {
  padding: "10px 14px",
  cursor: "pointer",
  fontSize: "14px",
  borderBottom: "1px solid #eee",
  background: "#fff",
};