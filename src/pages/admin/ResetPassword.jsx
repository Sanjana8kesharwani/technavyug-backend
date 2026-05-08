import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password reset successful");

    navigate("/admin/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #041c4a 0%, #082b6b 50%, #0f5ea8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow Effect */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(0,255,255,0.08)",
          filter: "blur(80px)",
          top: "-80px",
          left: "-80px",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(255,255,255,0.96)",
          borderRadius: "28px",
          padding: "38px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Back */}
        <div
          onClick={() => navigate("/admin/login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            marginBottom: "28px",
            color: "#0f172a",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          <ArrowLeft size={18} />
          Back to Login
        </div>

        {/* Icon */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #06b6d4, #2563eb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <LockKeyhole size={34} color="#fff" />
        </div>

        {/* Heading */}
        <h1
          style={{
            margin: 0,
            fontSize: "48px",
            color: "#0f172a",
            fontWeight: "800",
            lineHeight: "56px",
          }}
        >
          Reset Password
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
            lineHeight: "30px",
            marginTop: "18px",
            marginBottom: "34px",
          }}
        >
          Create a new secure password for your admin account.
        </p>

        {/* Form */}
        <form onSubmit={handleResetPassword}>
          {/* New Password */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid #dbe4f0",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid #dbe4f0",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: "14px",
              border: "none",
              background:
                "linear-gradient(135deg, #06b6d4, #2563eb)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}