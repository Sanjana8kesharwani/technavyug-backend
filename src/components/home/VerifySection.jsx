import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { CheckCircle, XCircle, ScanLine } from "lucide-react";

const VerifySection = () => {
  const [certificateId, setCertificateId] = useState("");
  const [mode, setMode] = useState("id");
  const [status, setStatus] = useState(""); // success | error
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const scannerRef = useRef(null);

  const handleVerify = async () => {
    if (!certificateId) return;

    setLoading(true);
    setStatus("");
    setMessage("");

    // fake delay (replace with API)
    setTimeout(() => {
      if (certificateId === "TECH123") {
        setStatus("success");
        setMessage("Valid Certificate ✅");
      } else {
        setStatus("error");
        setMessage("Invalid Certificate ❌");
      }
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (mode === "qr") {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 220 },
        false
      );

      scanner.render(
        (decodedText) => {
          setCertificateId(decodedText);
          setStatus("success");
          setMessage(`Scanned: ${decodedText}`);
          scanner.clear();
        },
        () => {}
      );

      scannerRef.current = scanner;
    }

    return () => {
      scannerRef.current?.clear().catch(() => {});
    };
  }, [mode]);

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Verify Certificates Instantly
          </h2>

          <p className="text-gray-500 mb-6">
            Use ID or scan QR code for instant verification.
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>✔ Real-time verification</p>
            <p>✔ QR-based scanning</p>
            <p>✔ Secure system</p>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl">

          {/* glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

          {/* TOGGLE */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode("id")}
              className={`flex-1 py-2 rounded-xl font-medium transition ${
                mode === "id"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Enter ID
            </button>

            <button
              onClick={() => setMode("qr")}
              className={`flex-1 py-2 rounded-xl font-medium transition ${
                mode === "qr"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Scan QR
            </button>
          </div>

          {/* ID MODE */}
          {mode === "id" && (
            <div className="flex gap-3">
              <input
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter Certificate ID"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                onClick={handleVerify}
                className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition"
              >
                {loading ? "Checking..." : "Verify"}
              </button>
            </div>
          )}

          {/* QR MODE */}
          {mode === "qr" && (
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">

              <ScanLine className="mx-auto mb-2 text-gray-400" />

              <div id="qr-reader" className="w-full"></div>

              <p className="text-sm text-gray-400 mt-2">
                Align QR inside the frame
              </p>
            </div>
          )}

          {/* RESULT */}
          {message && (
            <div
              className={`mt-6 flex items-center gap-2 justify-center p-3 rounded-xl text-sm font-medium ${
                status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {status === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <XCircle size={18} />
              )}
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifySection;