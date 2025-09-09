import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";

function Card({ image }) {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  return (
    <div
      className={`w-[150px] h-[200px] lg:w-[200px] lg:h-[250px] bg-[#030326] rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/50 cursor-pointer hover:translate-y-2 hover:scale-[1.05] transition-all duration-300 ${selectedImage == image ? "border-4 border-white shadow-2xl shadow-cyan-500/50" : null}`}
      onClick={() => {
        setSelectedImage(image);
      }}
    >
      <img src={image} className="h-full object-cover rounded-2xl" />
    </div>
  );
}

export default Card;
