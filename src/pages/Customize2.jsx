import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function Customize2() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading, setLoading] = useState(false);

  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      setUserData(result.data);
    } catch (error) {
      console.log(error);
    }
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
        `,
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
          
          <div className="relative backdrop-blur-xl bg-slate-900/40 border border-slate-700/20 rounded-3xl p-8 shadow-2xl transition-all duration-700 hover:shadow-blue-500/5 hover:shadow-3xl max-w-md w-full min-h-[500px] flex flex-col justify-center items-center gap-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300/80 via-purple-300/80 to-blue-200/80 bg-clip-text text-transparent">
                Enter your{" "}
                <span className="bg-gradient-to-r from-cyan-300/90 to-sky-300/90 bg-clip-text text-transparent">
                  Assistant Name
                </span>
              </h1>
              <p className="text-slate-400/60 text-sm md:text-base">
                Your Next Gen Virtual Assistant
              </p>
            </div>

            {/* Back button */}
            <button
              className="group/btn relative w-full h-12 bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-slate-700/70 hover:to-slate-600/70 rounded-xl text-slate-200/90 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/10 border border-slate-600/20 overflow-hidden cursor-pointer"
              onClick={() => navigate("/customize")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaArrowLeft className="w-4 h-4" />
                Back to Select Image
              </span>
            </button>

            {/* Name input field */}
            <div className="relative group/field w-full">
              <div className="w-full h-14 border border-slate-600/20 bg-slate-800/20 backdrop-blur-sm rounded-xl transition-all duration-300 focus-within:border-cyan-400/40 focus-within:bg-slate-800/30 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
                <FaUser className="absolute top-4 left-4 text-slate-400/50 w-5 h-5 transition-colors duration-300 group-focus-within/field:text-cyan-400/70" />
                <input
                  type="text"
                  placeholder="e.g., NEXA"
                  className="w-full h-full outline-none bg-transparent text-slate-200/90 placeholder-slate-400/50 rounded-xl pl-12 pr-4 py-3"
                  required
                  value={assistantName}
                  disabled={loading}
                  onChange={(e) => {
                    setAssistantName(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Create button */}
            {assistantName && (
              <button
                className="group/btn relative w-full h-12 bg-gradient-to-r from-blue-600/60 to-purple-600/60 hover:from-blue-500/70 hover:to-purple-500/70 rounded-xl text-white/90 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await handleUpdateAssistant();
                  setLoading(false);
                  navigate("/");
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-white/2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                      <span>Creating Assistant...</span>
                    </>
                  ) : (
                    "Create Assistant"
                  )}
                </span>
              </button>
            )}

            {/* Optional preview text */}
            {assistantName && (
              <div className="text-center space-y-2">
                <p className="text-slate-400/50 text-xs">Preview</p>
                <p className="text-slate-300/80 text-lg">
                  I am{" "}
                  <span className="bg-gradient-to-r from-cyan-300/80 to-sky-300/80 bg-clip-text text-transparent font-semibold">
                    {assistantName}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customize2;