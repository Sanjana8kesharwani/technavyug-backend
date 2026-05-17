import { useState } from "react";
import CertificatesContext from "../context/CertificatesContext";

const CertificatesProvider = ({ children }) => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      certificateId: "CERT-2026-001",
      title: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      category: "Cloud",
      user: "Sanjana Kesharwani",
      issueDate: "2026-05-12",
      verified: true,
      preview:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

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
