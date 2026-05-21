import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CertificatesContext from "../context/CertificatesContext";

const CertificatesProvider = ({ children }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch(`${process.env.VITE_BACKEND_URL || ""}/api/certificates`);
        if (!res.ok) {
          throw new Error("Failed to load certificates from server");
        }
        const data = await res.json();
        // Assuming ApiResponse structure { success, data }
        const certs = data?.data || [];
        setCertificates(certs);
      } catch (err) {
        // Show toast only on certificates page; provider is scoped globally but this will only run when provider mounts (i.e., on any admin route). To avoid global toast, check if document.title includes "Certificates"
        if (document.title.includes("Certificates")) {
          toast.error(err.message || "Failed to load certificates from server");
        }
      }
    };
    fetchCertificates();
  }, []);

  const addCertificate = (certificate) => {
    setCertificates((prev) => [...prev, certificate]);
  };

  const deleteCertificate = (id) => {
    setCertificates((prev) =>
      prev.filter((certificate) => certificate.id !== id),
    );
  };

  const updateCertificate = (updatedCertificate) => {
    setCertificates((prev) =>
      prev.map((certificate) =>
        certificate.id === updatedCertificate.id
          ? updatedCertificate
          : certificate,
      ),
    );
  };

  return (
    <CertificatesContext.Provider
      value={{
        certificates,
        addCertificate,
        deleteCertificate,
        updateCertificate,
      }}
    >
      {children}
    </CertificatesContext.Provider>
  );
};

export default CertificatesProvider;
