import React, { useContext, useState } from "react";
import bg from "../assets/authBg.jpg";
import { GiBrassEye } from "react-icons/gi";
import { GiBeastEye } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(userDataContext);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[500px] max-w-[400px] bg-[#0000003a] backdrop-blur shadow-lg shadow-sky-950 flex flex-col justify-center items-center gap-[20px] px-[24px] rounded-2xl"
        onSubmit={handleSignup}
      >
        <div className="flex flex-col justify-center items-center text-center mb-[10px] gap-[2px]">
          <h1 className="text-white text-[30px] font-semibold">
            Register to <span className="text-sky-700">NEXA</span>
          </h1>
          <p className="text-[#ffffff7c] text-[14px]">
            Your Next Gen Virtual Assistant
          </p>
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[20px] py-[20px] rounded-2xl text-[18px]"
        />
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[20px] py-[20px] rounded-2xl text-[18px]"
        />
        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white  rounded-2xl text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full h-full outline-none bg-transparent text-white placeholder-gray-400 rounded-2xl  px-[20px] py-[20px]"
          />
          {!showPassword && (
            <GiBrassEye
              className="absolute top-[15px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer hover:text-green-500 transition-all duration-100"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <GiBeastEye
              className="absolute top-[15px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer hover:text-red-500 transition-all duration-100"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {err.length > 0 && <p className="text-red-500">*{err}</p>}
        <button
          className="min-w-[140px] h-[50px] bg-[#ffffff] rounded-2xl text-[20px] font-semibold cursor-pointer hover:bg-sky-400 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Signing Up" : "Sign Up"}
        </button>
        <p className="text-[white] text-[18px]">
          Already have an account?{" "}
          <span
            className="text-[blue] cursor-pointer"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
