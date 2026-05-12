const logos = [
  "/logos/iit.png",
  "/logos/iiit.png",
  "/logos/nielit.jpeg",
];

const PartnersSection = () => {
  return (
    <div className="py-28 bg-white overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Trusted by Leading Institutions
        </h2>

        <p className="text-gray-400 mt-3 text-sm">
          Collaborating with top institutes across India
        </p>

        <div className="w-16 h-[2px] bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Logo Strip */}
      <div className="relative">

        {/* Left Fade */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10"></div>

        {/* Logos */}
        <div className="flex justify-center items-center gap-28">

          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="logo"
              className="h-24 object-contain transition duration-300 hover:scale-110"
            />
          ))}

        </div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10"></div>

      </div>

    </div>
  );
};

export default PartnersSection;