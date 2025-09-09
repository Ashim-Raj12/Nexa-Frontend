import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.png";
import { FiUploadCloud } from "react-icons/fi";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Customize() {
  const navigate = useNavigate();
  const inputImage = useRef();

  const [pos, setPos] = useState(0);

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center p-4 animate-fadeIn"
      onMouseMove={(e) => {
        setPos({ x: e.clientX, y: e.clientY });
      }}
      style={{
        background: `
    radial-gradient(
      circle at ${pos.x}px ${pos.y}px,
      rgba(79, 70, 229, 0.2) 0%,    /* soft indigo glow */
      rgba(17, 24, 39, 0.92) 65%,  /* dark slate */
      rgba(0, 0, 0, 1) 100%        /* deep black edges */
    )
  `,
        transition: "background 0.25s ease-out",
      }}
    >
      <div className="max-w-4xl min-h-[600px] bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md shadow-2xl shadow-black/50 rounded-3xl p-8 text-white border border-white/20 flex flex-col justify-center items-center gap-[40px] hover:shadow-cyan-500/50 hover:scale-[1.02] transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-center">
          Select your <span className="text-sky-400">Assistant Image</span>
        </h1>
        <div className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[20px]">
          <Card image={image1} />
          <Card image={image2} />
          <div
            className={`w-[150px] h-[200px] lg:w-[200px] lg:h-[250px] bg-white/10 border-2 border-white/20 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500 cursor-pointer hover:translate-y-2 hover:scale-105 transition-all duration-300 flex justify-center items-center ${
              selectedImage == "input"
                ? "border-4 border-cyan-400 shadow-2xl shadow-cyan-500"
                : null
            }`}
            onClick={() => {
              inputImage.current.click();
              setSelectedImage("input");
            }}
          >
            {!frontendImage && (
              <FiUploadCloud className="h-[50px] w-[50px] text-white" />
            )}
            {frontendImage && (
              <img
                src={frontendImage}
                className="h-full object-cover overflow-hidden rounded-2xl"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={inputImage}
            onChange={handleImage}
            hidden
          />
        </div>
        {selectedImage && (
          <button
            className="w-[150px] h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-semibold cursor-pointer hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
            onClick={() => navigate("/customize2")}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Customize;
