import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditCertificate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "AWS Cloud Practitioner",
    organization: "Amazon",
    category: "Cloud",
    issueDate: "2026-05-12",
    verificationUrl: "https://verify.aws.com/certificate",
    certificateId: "CERT-2026-001",
    verified: true,
  });

  const [preview, setPreview] = useState(
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove Error While Typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    // File Type Validation
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG and PDF files are allowed",
      }));

      toast.error("Invalid file type");

      return;
    }

    // File Size Validation
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "File size must be less than 10MB",
      }));

      toast.error("File too large");

      return;
    }

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));

    setPreview(URL.createObjectURL(file));

    toast.success("Certificate uploaded successfully");
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Certificate title is required";
    }

    if (!formData.organization.trim()) {
      newErrors.organization =
        "Issuing organization is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }

    if (!formData.certificateId.trim()) {
      newErrors.certificateId =
        "Certificate ID is required";
    }

    if (!formData.verificationUrl.trim()) {
      newErrors.verificationUrl =
        "Verification URL is required";
    }

    if (!preview) {
      newErrors.image =
        "Certificate image or PDF is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please fill all required fields");

      return;
    }

    toast.success("Certificate updated successfully");

    setTimeout(() => {
      navigate("/admin/certificates");
    }, 1000);
  };

  return (
    <div
      style={{
        background: "#c8d8e8",
        borderRadius: "28px",
        padding: "20px",
        margin: "14px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "6px",
          }}
        >
          Edit Certificate
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Update certificate details
        </p>
      </div>

      {/* White Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "30px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* First Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Title */}
            <div>
              <label style={labelStyle}>
                Certificate Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={inputStyle}
              />

              {errors.title && (
                <p style={errorStyle}>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Cloud</option>
                <option>Cybersecurity</option>
                <option>Design</option>
                <option>Development</option>
              </select>

              {errors.category && (
                <p style={errorStyle}>
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Organization */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>
              Issuing Organization
            </label>

            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              style={inputStyle}
            />

            {errors.organization && (
              <p style={errorStyle}>
                {errors.organization}
              </p>
            )}
          </div>

          {/* Second Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Issue Date */}
            <div>
              <label style={labelStyle}>
                Issue Date
              </label>

              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                style={inputStyle}
              />

              {errors.issueDate && (
                <p style={errorStyle}>
                  {errors.issueDate}
                </p>
              )}
            </div>

            {/* Certificate ID */}
            <div>
              <label style={labelStyle}>
                Certificate ID
              </label>

              <input
                type="text"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                style={inputStyle}
              />

              {errors.certificateId && (
                <p style={errorStyle}>
                  {errors.certificateId}
                </p>
              )}
            </div>
          </div>

          {/* Verification URL */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>
              Verification URL
            </label>

            <input
              type="text"
              name="verificationUrl"
              value={formData.verificationUrl}
              onChange={handleChange}
              style={inputStyle}
            />

            {errors.verificationUrl && (
              <p style={errorStyle}>
                {errors.verificationUrl}
              </p>
            )}
          </div>

          {/* Upload */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>
              Certificate Image / PDF
            </label>

            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "16px",
                padding: "24px",
                background: "#f8fafc",
              }}
            >
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleImage}
              />

              <p
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Allowed formats: JPG, PNG, PDF
              </p>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                Maximum upload size: 10MB
              </p>

              {errors.image && (
                <p style={errorStyle}>
                  {errors.image}
                </p>
              )}
            </div>

            {/* Preview */}
            {preview &&
              !preview.includes(".pdf") && (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "240px",
                    height: "160px",
                    objectFit: "cover",
                    marginTop: "18px",
                    borderRadius: "14px",
                    border: "1px solid #ddd",
                  }}
                />
              )}
          </div>

          {/* Verified */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "35px",
            }}
          >
            <input
              type="checkbox"
              checked={formData.verified}
              onChange={() =>
                setFormData({
                  ...formData,
                  verified: !formData.verified,
                })
              }
            />

            <label
              style={{
                fontWeight: "500",
              }}
            >
              Verified Certificate
            </label>
          </div>

          {/* Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              style={{
                background: "#4f46e5",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              Update Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontWeight: "600",
  color: "#1e293b",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #dbe2ea",
  outline: "none",
  fontSize: "15px",
  background: "#fff",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: "14px",
  marginTop: "6px",
  fontWeight: "500",
};

export default EditCertificate;