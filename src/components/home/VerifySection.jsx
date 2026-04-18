const VerifySection = () => {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-white to-gray-100">

      <div className="max-w-4xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl font-bold mb-4">
          🔍 Verify Certificate
        </h2>

        <p className="text-gray-500 mb-10">
          Instantly check authenticity of certificates
        </p>

        {/* GLASS CARD */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-4 items-center justify-center">

          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. TECH123)"
            className="w-full md:w-[70%] px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:scale-105 transition">
            Verify
          </button>

        </div>

        {/* DEMO */}
        <p className="mt-4 text-sm text-gray-500">
          Try demo ID:
          <span className="text-blue-500 font-semibold ml-2 cursor-pointer">
            TECH123
          </span>
        </p>

      </div>

    </section>
  );
};

export default VerifySection;