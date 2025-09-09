import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userData, serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [pos, setPos] = useState(0);

  const handleLogout = async () => {
    try {
      const result = axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };
  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-gray-800 hover:via-gray-700 hover:to-black transition-all duration-500 flex justify-center items-center p-4 cursor-pointer"
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
      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 max-w-md w-full transition-transform transform hover:scale-105 hover:bg-white/20 hover:shadow-3xl">
        <div className="flex gap-4 w-full justify-center">
          <button
            className="w-[120px] h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-semibold cursor-pointer hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="w-[120px] h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-semibold cursor-pointer hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
            onClick={() => {
              navigate("/customize");
            }}
          >
            Customize
          </button>
        </div>
        <div className="w-64 h-80 flex justify-center items-center flex-col overflow-hidden rounded-3xl">
          <img
            src={userData?.assistantImage}
            alt="Assistant"
            className="h-full object-cover rounded-3xl"
          />
        </div>
        <h1 className="text-white text-2xl font-extrabold text-center">
          I am {userData?.assistantName}
        </h1>
      </div>
    </div>
  );
}

export default Home;
