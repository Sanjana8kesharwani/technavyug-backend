import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError(
        "Enter a valid email address"
      );
      return;
    }

    setError("");
    setSuccess(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background:
          "linear-gradient(135deg, #061b3a 0%, #0f2747 60%, #0ea5e9 140%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "30px",
          padding: "40px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.18)",
          boxSizing: "border-box",
        }}
      >
        {/* Back */}
        <button
          onClick={() =>
            navigate("/admin/login")
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            border: "none",
            color: "#0f2747",
            cursor: "pointer",
            marginBottom: "25px",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        {/* Icon */}
        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #06b6d4, #2563eb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <ShieldCheck
            size={38}
            color="#fff"
          />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "12px",
          }}
        >
          Forgot Password
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
            lineHeight: "1.7",
            marginBottom: "32px",
          }}
        >
          Enter your registered email
          address and we’ll send you a
          password reset link.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "#334155",
                }}
              >
                Email Address
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border:
                    "1px solid #dbe2ea",
                  borderRadius: "14px",
                  padding: "0 14px",
                }}
              >
                <Mail
                  size={20}
                  color="#64748b"
                />

                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    background:
                      "transparent",
                  }}
                />
              </div>

              {error && (
                <p
                  style={{
                    color: "red",
                    marginTop: "8px",
                    fontSize: "14px",
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, #06b6d4, #2563eb)",
                color: "#fff",
                border: "none",
                padding: "16px",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div
            style={{
              background: "#f0fdf4",
              border:
                "1px solid #bbf7d0",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <h3
              style={{
                color: "#166534",
                marginTop: 0,
                marginBottom: "10px",
              }}
            >
              Reset Link Sent
            </h3>

            <p
              style={{
                color: "#166534",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              A password reset link has
              been sent to your email
              address.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}