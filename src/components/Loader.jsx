const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[999]">

      <div className="flex flex-col items-center gap-4">

       
        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20 animate-pulse">
          <img src="/Technavyug Logo.jpeg" className="w-full h-full object-cover"/>
        </div>


        <p className="text-white text-sm tracking-wide">Loading Technavyug...</p>
      </div>

    </div>
  );
};

export default Loader;