import React, { useState } from "react";
import {
  Search,
  Filter,
  Activity,
} from "lucide-react";

const auditLogsData = [
  {
    admin: "Sanjana Admin",
    action: "Updated",
    module: "Projects",
    description: "Changed project status from Pending to Approved",
    ip: "192.168.1.1",
    date: "11 May 2026, 2:30 PM",
  },
  {
    admin: "Riya Admin",
    action: "Added",
    module: "Users",
    description: "Added new user account",
    ip: "192.168.1.10",
    date: "10 May 2026, 11:15 AM",
  },
  {
    admin: "Admin Team",
    action: "Deleted",
    module: "Certificates",
    description: "Removed invalid certificate entry",
    ip: "192.168.1.20",
    date: "09 May 2026, 6:40 PM",
  },
  {
    admin: "Super Admin",
    action: "Updated",
    module: "Settings",
    description: "Updated privacy policy content",
    ip: "192.168.1.5",
    date: "08 May 2026, 9:10 AM",
  },
];

const AuditLogs = () => {
  const [search, setSearch] = useState("");

  const filteredLogs = auditLogsData.filter((log) =>
    log.admin.toLowerCase().includes(search.toLowerCase()) ||
    log.module.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        flex: 1,
        background: "#c8d8ea",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        padding: "clamp(12px, 3vw, 24px)",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <div
        style={{
          marginBottom: "clamp(16px, 3vw, 22px)",
          paddingLeft: "4px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(28px, 4vw, 32px)",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          Audit Logs
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#64748b",
            fontWeight: "500",
          }}
        >
          Track all platform activities and admin actions
        </p>
      </div>

      {/* Main White Container */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: "clamp(18px, 3vw, 28px)",
          padding: "clamp(18px, 3vw, 28px)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Top Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              minWidth: "260px",
              position: "relative",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                top: "50%",
                left: "16px",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            />

            <input
              type="text"
              placeholder="Search audit logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "14px",
                border: "1px solid #dbe4ee",
                paddingLeft: "46px",
                paddingRight: "16px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                background: "#fff",
              }}
            />
          </div>

          {/* Filter Button */}
          <button
            style={{
              height: "48px",
              padding: "0 18px",
              borderRadius: "14px",
              border: "1px solid #dbe4ee",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Table */}
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            borderRadius: "18px",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "950px",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#eef2ff",
                }}
              >
                {[
                  "Admin",
                  "Action",
                  "Module",
                  "Description",
                  "IP Address",
                  "Date & Time",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "18px",
                      textAlign: "left",
                      fontSize: "14px",
                      color: "#334155",
                      fontWeight: "700",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredLogs.map((log, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td
                    style={{
                      padding: "18px",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {log.admin}
                  </td>

                  <td
                    style={{
                      padding: "18px",
                    }}
                  >
                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "700",
                        background:
                          log.action === "Added"
                            ? "#dcfce7"
                            : log.action === "Deleted"
                            ? "#fee2e2"
                            : "#dbeafe",
                        color:
                          log.action === "Added"
                            ? "#166534"
                            : log.action === "Deleted"
                            ? "#991b1b"
                            : "#1d4ed8",
                      }}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      fontSize: "15px",
                      color: "#334155",
                      fontWeight: "600",
                    }}
                  >
                    {log.module}
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      fontSize: "15px",
                      color: "#475569",
                      lineHeight: "24px",
                    }}
                  >
                    {log.description}
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    {log.ip}
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      fontSize: "14px",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {log.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#eef2ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#4f46e5",
              }}
            >
              <Activity size={32} />
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              No Audit Logs Found
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "15px",
              }}
            >
              No matching activity logs available right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;