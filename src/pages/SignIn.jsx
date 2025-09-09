import React, { useContext, useState } from "react";
import { GiBrassEye } from "react-icons/gi";
import { GiBeastEye } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const [pos, setPos] = useState(0);

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
      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setUserData(null);
      setErr(error.response.data.message);
      setLoading(false);
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
      <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row justify-center items-center p-6 gap-8">
        {/* Left side - Welcome message */}
        <div className="group flex-1 max-w-md">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-3xl opacity-15 blur bg-gradient-to-r from-blue-600/10 via-purple-600/8 to-blue-800/10 transition-all duration-1000" />

            <div className="relative backdrop-blur-xl bg-slate-900/40 border border-slate-700/20 rounded-3xl p-8 shadow-2xl transition-all duration-700 hover:shadow-blue-500/5 hover:shadow-3xl min-h-[500px] flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300/70 via-purple-300/70 to-blue-200/70 bg-clip-text text-transparent">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-cyan-300/80 to-sky-300/80 bg-clip-text text-transparent">
                  NEXA
                </span>
              </h2>
              <p className="text-slate-300/70 text-lg mb-6 leading-relaxed">
                Your Next Gen Virtual Assistant designed to help you manage
                tasks, get insights, and boost productivity with AI-powered
                assistance.
              </p>
              <ul className="space-y-3 text-slate-300/60">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                  <span>Smart task management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400/40" />
                  <span>Real-time insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400/40" />
                  <span>Seamless integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400/40" />
                  <span>24/7 virtual assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - Sign in form */}
        <div className="group flex-1 max-w-md">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-3xl opacity-15 blur bg-gradient-to-r from-purple-600/10 via-blue-600/8 to-purple-800/10 transition-all duration-1000" />

            <form
              className="relative backdrop-blur-xl bg-slate-900/40 border border-slate-700/20 rounded-3xl p-8 shadow-2xl transition-all duration-700 hover:shadow-purple-500/5 hover:shadow-3xl min-h-[500px] flex flex-col justify-center items-center gap-6"
              onSubmit={handleSignIn}
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300/80 via-purple-300/80 to-blue-200/80 bg-clip-text text-transparent">
                  Sign In to{" "}
                  <span className="bg-gradient-to-r from-cyan-300/90 to-sky-300/90 bg-clip-text text-transparent">
                    NEXA
                  </span>
                </h1>
                <p className="text-slate-400/60 text-sm md:text-base">
                  Your Next Gen Virtual Assistant
                </p>
              </div>

              {/* Form fields */}
              <div className="w-full space-y-4">
                {/* Email field */}
                <div className="relative group/field">
                  <div className="w-full h-14 border border-slate-600/20 bg-slate-800/20 backdrop-blur-sm rounded-xl transition-all duration-300 focus-within:border-cyan-400/40 focus-within:bg-slate-800/30 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
                    <MdEmail className="absolute top-4 left-4 text-slate-400/50 w-5 h-5 transition-colors duration-300 group-focus-within/field:text-cyan-400/70" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      className="w-full h-full outline-none bg-transparent text-slate-200/90 placeholder-slate-400/50 rounded-xl pl-12 pr-4 py-3"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="relative group/field">
                  <div className="w-full h-14 border border-slate-600/20 bg-slate-800/20 backdrop-blur-sm rounded-xl transition-all duration-300 focus-within:border-cyan-400/40 focus-within:bg-slate-800/30 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
                    <FaLock className="absolute top-4 left-4 text-slate-400/50 w-5 h-5 transition-colors duration-300 group-focus-within/field:text-cyan-400/70" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      className="w-full h-full outline-none bg-transparent text-slate-200/90 placeholder-slate-400/50 rounded-xl pl-12 pr-12 py-3"
                    />
                    {!showPassword && (
                      <GiBrassEye
                        className="absolute top-4 right-4 text-slate-400/50 w-5 h-5 cursor-pointer hover:text-cyan-400/70 transition-all duration-300"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                    {showPassword && (
                      <GiBeastEye
                        className="absolute top-4 right-4 text-slate-400/50 w-5 h-5 cursor-pointer hover:text-red-400/70 transition-all duration-300"
                        onClick={() => setShowPassword(false)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Error message */}
              {err.length > 0 && (
                <div className="w-full p-3 bg-red-900/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
                  <p className="text-red-300/80 text-sm text-center">{err}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                className="group/btn relative w-full h-12 bg-gradient-to-r from-blue-600/60 to-purple-600/60 hover:from-blue-500/70 hover:to-purple-500/70 rounded-xl text-white/90 font-medium transition-all duration-300 hover:scale-101 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-white/2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </button>

              {/* Sign up link */}
              <p className="text-slate-400/70 text-sm text-center">
                New to NEXA?{" "}
                <span
                  className="text-cyan-400/80 cursor-pointer hover:text-cyan-300/90 transition-colors duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
