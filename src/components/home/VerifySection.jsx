const VerifySection = () => {
  return (
    <section className="py-28 px-6 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Verify Certificates Instantly
          </h2>

          <p className="text-gray-500 mb-6">
            Ensure authenticity and credibility with our secure certificate
            verification system. Just enter the certificate ID to get started.
          </p>

          <div className="space-y-3 text-sm text-gray-600">
            <p>✔ Real-time verification</p>
            <p>✔ Secure & tamper-proof system</p>
            <p>✔ Trusted by 10,000+ users</p>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Enter Certificate ID
          </h3>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="e.g. TECH123"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none transition"
            />

            <button className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition">
              Verify
            </button>

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Try demo ID: <span className="text-blue-600">TECH123</span>
          </p>

        </div>

      </div>

    </section>
  );
};

export default VerifySection;