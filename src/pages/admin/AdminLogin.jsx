import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("token", "dummy");

      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        background: "linear-gradient(to right, #0f2747 50%, #c7d8ef 50%)",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: "1 1 500px",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          boxSizing: "border-box",
          background:
            "linear-gradient(135deg, #061b3a 0%, #0f2747 60%, #0ea5e9 140%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Effect */}
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(6,182,212,0.15)",
            top: "-120px",
            left: "-120px",
            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(14,165,233,0.15)",
            bottom: "-100px",
            right: "-80px",
            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <img
            src={logo}
            alt="TechNavyug Logo"
            style={{
              maxWidth: "320px",
              objectFit: "contain",
              marginBottom: "28px",
              mixBlendMode: "screen",
              filter:
                "brightness(0) invert(1) drop-shadow(0 10px 25px rgba(0,0,0,0.25))",
            }}
          />

          <h1
            style={{
              color: "#fff",
              fontSize: "64px",
              fontWeight: "800",
              marginTop: "8px",
              marginBottom: "8px",
              letterSpacing: "-2px",
              lineHeight: "1",
            }}
          >
            TechNavyug
          </h1>

          <p
            style={{
              color: "#dbeafe",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "1.5",
              marginTop: "0px",
            }}
          >
            Empowering Future-Ready Tech Education
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: "1 1 420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            maxWidth: "480px",
            background: "#fff",
            borderRadius: "30px",
            padding: "45px 35px",
            boxShadow: "0 15px 45px rgba(0,0,0,0.15)",
            boxSizing: "border-box",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: "800",
              color: "#0f2747",
              marginBottom: "35px",
              textAlign: "center",
            }}
          >
            Login Account
          </h3>

          {/* Email */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Email ID
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Forgot */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginBottom: "18px",
            }}
          >
            <span
              onClick={() => navigate("/admin/forgot-password")}
              style={{
                fontSize: "14px",
                color: "#4f46e5",
                fontWeight: "500",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Forgot Password?
            </span>
          </div>

          
          {/* Error */}
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "18px",
              }}
            >
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#0f2747",
              color: "#fff",
              border: "none",
              padding: "16px",
              borderRadius: "14px",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              marginTop: "30px",
              textAlign: "center",
              color: "#64748b",
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            Powered by TechNavyug
          </p>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #dbe2ea",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};
