import { useProjects } from "../../provider/useProjects";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminProjects() {
  const { projects, deleteProject } = useProjects();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteProject(id);
      toast.success("Project deleted");
    }
  };

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
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Projects</h2>
            <p style={{ fontSize: "13px", color: "#555" }}>Manage all projects</p>
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

        {/* TABLE BOX */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "16px",
            overflowX: "auto",
          }}
        >
          {projects.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No projects found
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>

              {/* FIXED COLUMN WIDTHS */}
              <colgroup>
                <col style={{ width: "28%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              {/* HEADER */}
              <thead style={{background: "#e2e8f0", textAlign: "left"}}>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Featured</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid #eee" }}
                    className="table-row"
                  >

                    <td style={tdStyle}>{p.title}</td>
                    <td style={tdStyle}>{p.category}</td>
                    <td style={tdStyle}>{p.status}</td>

                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      {p.featured ? "✔️" : "—"}
                    </td>

                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>

                        {/* EDIT */}
                        <button
                          onClick={() => navigate(`/admin/edit-project/${p.id}`)}
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

                        {/* DELETE (FIXED LIKE USERS) */}
                        <span
                          className="delete-icon"
                          style={{
                            cursor: "pointer",
                            fontSize: "16px",
                            lineHeight: "32px",
                          }}
                          onClick={() => handleDelete(p.id)}
                        >
                          🗑
                        </span>

                      </div>
                    </td>
                  </tr>
                ))}
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