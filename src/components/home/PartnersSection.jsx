const PartnersSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-center">

      <h2 className="text-3xl font-bold mb-10">🤝 Our Partners</h2>

      <div className="flex justify-center gap-10 flex-wrap">
        {["NIELIT", "IIT", "IIIT"].map((p, i) => (
          <div key={i} className="px-6 py-3 border rounded-lg shadow-sm">
            {p}
          </div>
        ))}
      </div>

    </section>
  );
};

export default PartnersSection;