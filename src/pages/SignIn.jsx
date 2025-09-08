import React, { useContext, useState } from "react";
import bg from "../assets/authBg.jpg";
import { GiBrassEye } from "react-icons/gi";
import { GiBeastEye } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(userDataContext);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col md:flex-row justify-center items-center p-4 gap-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex-1 max-w-md min-h-[500px] bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md shadow-2xl shadow-black/50 rounded-3xl p-8 text-white border border-white/20 flex flex-col justify-center hover:shadow-cyan-500/50 hover:scale-[1.02] transition-transform duration-300">
        <h2 className="text-4xl font-extrabold mb-4">
          Welcome to <span className="text-sky-400">NEXA</span>
        </h2>
        <p className="text-lg mb-6">
          Your Next Gen Virtual Assistant designed to help you manage tasks, get insights, and boost productivity with AI-powered assistance.
        </p>
        <ul className="list-disc list-inside space-y-2 text-cyan-300">
          <li>Smart task management</li>
          <li>Real-time insights</li>
          <li>Seamless integration</li>
          <li>24/7 virtual assistance</li>
        </ul>
      </div>
      <form
        className="flex-1 max-w-md min-h-[500px] bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md shadow-2xl shadow-black/50 rounded-3xl p-8 border border-white/20 flex flex-col justify-center items-center gap-6 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-transform duration-300"
        onSubmit={handleSignIn}
      >
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            Sign In to <span className="text-sky-400">NEXA</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Your Next Gen Virtual Assistant
          </p>
        </div>
        <div className="w-full h-14 border-2 border-white/50 bg-white/10 text-white rounded-xl text-lg relative focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-cyan-400 transition-all duration-300">
          <MdEmail className="absolute top-4 left-4 text-white w-6 h-6" />
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full h-full outline-none bg-transparent text-white placeholder-gray-300 rounded-xl pl-12 pr-4 py-3"
          />
        </div>
        <div className="w-full h-14 border-2 border-white/50 bg-white/10 text-white rounded-xl text-lg relative focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-cyan-400 transition-all duration-300">
          <FaLock className="absolute top-3 left-4 text-white w-6 h-6" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full h-full outline-none bg-transparent text-white placeholder-gray-300 rounded-xl pl-12 pr-4 py-3"
          />
          {!showPassword && (
            <GiBrassEye
              className="absolute top-3 right-4 text-white w-6 h-6 cursor-pointer hover:text-green-400 transition-all duration-200"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <GiBeastEye
              className="absolute top-3 right-4 text-white w-6 h-6 cursor-pointer hover:text-red-400 transition-all duration-200"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {err.length > 0 && (
          <p className="text-red-400 text-sm bg-red-900/20 px-3 py-2 rounded-lg border border-red-500/50 animate-bounce">
            {err}
          </p>
        )}
        <button
          className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-semibold cursor-pointer hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
        <p className="text-white text-base">
          New to NEXA?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors duration-200"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
