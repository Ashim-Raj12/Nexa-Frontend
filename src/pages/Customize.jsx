
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
      className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden transition-all duration-700"
      onMouseMove={(e) => {
        setPos({ x: e.clientX, y: e.clientY });
      }}
      style={{
        background: `
  radial-gradient(
    circle 600px at ${pos.x}px ${pos.y}px,
    rgba(59, 130, 246, 0.07) 0%,
    rgba(88, 28, 135, 0.03) 30%,
    transparent 70%
  ),
  linear-gradient(to bottom right, rgb(2, 6, 23), rgb(15, 23, 42), rgb(0, 0, 0))
`
,
        transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full min-h-screen flex justify-center items-center p-6">
        <div className="group relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-3xl opacity-15 blur bg-gradient-to-r from-blue-600/10 via-purple-600/8 to-blue-800/10 transition-all duration-1000" />
          
          <div className="relative backdrop-blur-xl bg-slate-900/40 border border-slate-700/20 rounded-3xl p-8 shadow-2xl transition-all duration-700 hover:shadow-blue-500/5 hover:shadow-3xl max-w-4xl w-full min-h-[600px] flex flex-col justify-center items-center gap-10">
            
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300/70 via-purple-300/70 to-blue-200/70 bg-clip-text text-transparent mb-2">
                Select your <span className="bg-gradient-to-r from-cyan-300/80 to-sky-300/80 bg-clip-text text-transparent">Assistant Image</span>
              </h1>
              <p className="text-slate-400/60 text-sm">
                Choose from our collection or upload your own
              </p>
            </div>

            {/* Image selection grid */}
            <div className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-6">
              
              {/* Predefined images */}
              <Card image={image1} />
              <Card image={image2} />
              
              {/* Custom upload card */}
              <div className="group/card relative">
                {/* Card glow effect */}
                <div className={`
                  absolute -inset-1 rounded-2xl blur transition-all duration-500
                  ${selectedImage === "input" 
                    ? 'opacity-40 bg-gradient-to-r from-cyan-400/30 to-blue-400/30' 
                    : 'opacity-0 group-hover/card:opacity-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20'
                  }
                `} />
                
                <div
                  className={`
                    relative w-[150px] h-[200px] lg:w-[200px] lg:h-[250px] 
                    backdrop-blur-sm rounded-2xl cursor-pointer 
                    transition-all duration-500 flex justify-center items-center overflow-hidden
                    group-hover/card:scale-105 group-hover/card:-translate-y-2
                    ${selectedImage === "input"
                      ? 'bg-slate-800/40 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800/20 border border-slate-600/20 hover:bg-slate-800/30 hover:border-slate-500/30'
                    }
                  `}
                  onClick={() => {
                    inputImage.current.click();
                    setSelectedImage("input");
                  }}
                >
                  {!frontendImage && (
                    <div className="flex flex-col items-center gap-3">
                      <FiUploadCloud className="h-12 w-12 text-slate-400/60 group-hover/card:text-cyan-400/80 transition-colors duration-300" />
                      <span className="text-slate-400/60 text-sm font-medium group-hover/card:text-cyan-400/80 transition-colors duration-300">
                        Upload Image
                      </span>
                    </div>
                  )}
                  {frontendImage && (
                    <div className="relative w-full h-full">
                      <img
                        src={frontendImage}
                        alt="Custom upload"
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-xl" />
                    </div>
                  )}
                </div>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={inputImage}
                onChange={handleImage}
                hidden
              />
            </div>

            {/* Next button */}
            {selectedImage && (
              <div className="relative group/btn">
                <div className="absolute -inset-1 rounded-xl opacity-20 blur bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover/btn:opacity-30" />
                
                <button
                  className="relative w-[150px] h-12 bg-gradient-to-r from-blue-600/60 to-purple-600/60 hover:from-blue-500/70 hover:to-purple-500/70 rounded-xl text-white/90 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden cursor-pointer"
                  onClick={() => navigate("/customize2")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-white/2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Next</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customize;