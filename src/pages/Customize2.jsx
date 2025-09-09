import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

function Customize2() {
  const navigate = useNavigate();
  const [pos, setPos] = useState(0);
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || ""
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
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-gray-800 hover:via-gray-700 hover:to-black transition-all duration-500 flex justify-center items-center p-4 gap-10 animate-fadeIn"
      onMouseMove={(e) => {
        setPos({ x: e.clientX, y: e.clientY });
      }}
      style={{
  background: `
    radial-gradient(
      circle at ${pos.x}px ${pos.y}px,
      rgba(54, 83, 201, 0.08) 0%,   /* very soft deep blue glow */
      rgba(15, 23, 42, 0.95) 65%,  /* rich dark navy */
      rgba(0, 0, 0, 1) 100%        /* pure black edges */
    )
  `,
  transition: "background 0.25s ease-out",
}}
    >
      <div className="max-w-md w-full bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md shadow-2xl shadow-black/50 rounded-3xl p-8 text-white border border-white/20 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center items-center gap-6 animate-slideInLeft">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            Enter your <span className="text-sky-400">Assistant Name</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Your Next Gen Virtual Assistant
          </p>
        </div>
        <button
          className="w-full h-10 bg-transparent border border-white/50 text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-white/10 transition-all duration-300"
          onClick={() => navigate("/customize")}
        >
          ← Back to Select Image
        </button>
        <input
          type="text"
          placeholder="eg : NEXA"
          className="w-full h-14 outline-none border-2 border-white/50 bg-white/10 text-white placeholder-gray-300 rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
          required
          value={assistantName}
          disabled={loading}
          onChange={(e) => {
            setAssistantName(e.target.value);
          }}
        />
        {assistantName && (
          <button
            className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-semibold cursor-pointer hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await handleUpdateAssistant();
              setLoading(false);
              navigate("/");
            }}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                Creating Assistant...
              </>
            ) : (
              "Create Assistant"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Customize2;
