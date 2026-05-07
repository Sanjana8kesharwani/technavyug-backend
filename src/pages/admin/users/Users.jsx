import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../context/useUsers";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Users() {
  const navigate = useNavigate();
  const { users, deleteUser } = useUsers();

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "20px" }}>
      <div
        style={{
          background: "#c8d8e8",
          borderRadius: "28px",
          minHeight: "calc(100vh - 40px)",
          padding: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "6px",
              }}
            >
              Users
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                margin: 0,
              }}
            >
              Manage all users
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={() => navigate("/admin/add-user")}
              style={{
                background: "#4f46e5",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 18px",
                borderRadius: "12px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              + Add User
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
                <th
                  style={{ padding: "12px", cursor: "pointer" }}
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  Name {sortAsc ? "↑" : "↓"}
                </th>
                <th style={{ padding: "12px" }}>Designation</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Phone</th>
                <th style={{ padding: "12px" }}>LinkedIn</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <td style={{ padding: "12px", fontWeight: "500" }}>
                      {user.name}
                    </td>

                    <td style={{ padding: "12px" }}>{user.designation}</td>

                    <td style={{ padding: "12px", color: "#555" }}>
                      {user.email || "—"}
                    </td>

                    <td style={{ padding: "12px" }}>{user.phone || "—"}</td>

                    <td style={{ padding: "12px" }}>
                      {user.linkedin ? (
                        <a href={user.linkedin} target="_blank">
                          View
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td style={{ padding: "12px" }}>
                      <div className="action-box">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-user/${user.id}`)
                          }
                          style={{
                            background: "#4f46e5",
                            color: "#fff",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure you want to delete?")
                            ) {
                              deleteUser(user.id);
                              toast.success("User deleted successfully");
                            }
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS */}
      <style>
        {`
        .action-box {
          display: flex;
          gap: 14px;
        }

        .delete-btn {
          opacity: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 16px;
        }

        .action-box:hover .delete-btn {
          opacity: 1;
        }
        `}
      </style>
    </div>
  );
}
