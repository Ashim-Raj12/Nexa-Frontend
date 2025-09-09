import React, { useContext, useState } from "react";
import bg from "../assets/authBg.jpg";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Customize2() {
  const navigate = useNavigate();
  const userData = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || ""
  );
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-md w-full bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md shadow-2xl shadow-black/50 rounded-3xl p-8 text-white border border-white/20 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center items-center gap-6">
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
          onChange={(e) => {
            setAssistantName(e.target.value);
          }}
        />
        {assistantName && (
          <button
            className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-semibold cursor-pointer hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
            onClick={() => navigate("/customize2")}
          >
            Create Assistant
          </button>
        )}
      </div>
    </div>
  );
}

export default Customize2;
