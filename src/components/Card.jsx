import { useNavigate } from "react-router-dom";

const Card = ({ id, name, role, image }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/profile/${id}`)} className="group relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-lg border border-white/10 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
      
      
      <img src={image} alt={name}  className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"/>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

     
      <div className="absolute bottom-0 p-4">
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <p className="text-gray-300 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default Card;