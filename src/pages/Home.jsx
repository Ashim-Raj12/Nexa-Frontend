import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [pos, setPos] = useState(0);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

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

  const speak = (text) => {
    setSpeaking(true);
    const utterence = new SpeechSynthesisUtterance(text);
    utterence.onend = () => setSpeaking(false);
    synth.speak(utterence);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type == "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type == "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
      speak(`Searching YouTube for ${userInput}`);
    }

    if (type == "calculator_open") {
      window.open(`https://www.google.com/search?q=calculator`);
    }

    if (type == "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    }

    if (type == "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    }

    if (type == "weather_show") {
      window.open(
        `https://www.google.com/search?q=weather+${encodeURIComponent(
          userInput
        )}`,
        "_blank"
      );
    }

    if (type == "whatsapp_open") {
      window.open("https://web.whatsapp.com", "_blank");
    }

    if (type == "telegram_open") {
      window.open("https://web.telegram.org", "_blank");
    }

    if (type == "twitter_open") {
      window.open("https://x.com", "_blank");
    }
    if (type == "gmail_open") {
      window.open("https://mail.google.com", "_blank");
    }

    if (type == "maps_open") {
      window.open("https://maps.google.com", "_blank");
    }
    if (type == "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type == "calculator_open") {
      window.open("calculator://", "_blank"); // might not work in browser
      speak("Opening calculator.");
    }

    if (type == "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
      speak("Opening Instagram.");
    }

    if (type == "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
      speak("Opening Facebook.");
    }

    if (type == "weather_show") {
      window.open(
        `https://www.google.com/search?q=weather+${encodeURIComponent(
          userInput
        )}`,
        "_blank"
      );
      speak("Showing weather.");
    }

    if (type == "whatsapp_open") {
      window.open("https://web.whatsapp.com", "_blank");
      speak("Opening WhatsApp.");
    }

    if (type == "telegram_open") {
      window.open("https://web.telegram.org", "_blank");
      speak("Opening Telegram.");
    }

    if (type == "twitter_open") {
      window.open("https://x.com", "_blank");
      speak("Opening Twitter.");
    }

    if (type == "gmail_open") {
      window.open("https://mail.google.com", "_blank");
      speak("Opening Gmail.");
    }

    if (type == "maps_open") {
      window.open("https://maps.google.com", "_blank");
      speak("Opening Google Maps.");
    }

    if (type == "notes_open") {
      window.open("/notes", "_blank");
      speak("Opening your notes.");
    }

    if (type == "reminder_set") {
      speak("Reminder feature coming soon.");
    }

    if (type == "alarm_set") {
      speak("Setting alarms is not supported in the browser yet.");
    }

    if (type == "timer_set") {
      const text = userInput.toLowerCase();

      const match = text.match(/(\d+)\s*(second|seconds|minute|minutes)/);

      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2];

        let seconds = value;
        if (unit.includes("minute")) {
          seconds = value * 60;
        }

        speak(`Timer started for ${value} ${unit}.`);

        setTimeout(() => {
          speak("⏰ Time's up!");
          alert("⏰ Time's up!");
        }, seconds * 1000);
      } else {
        speak(
          "Please say a time, like 'set timer for 10 seconds' or '2 minutes'."
        );
      }
    }

    if (type == "news_show") {
      window.open("https://news.google.com", "_blank");
      speak("Here are the latest headlines.");
    }

    if (type == "sports_score") {
      window.open("https://www.espn.com", "_blank");
      speak("Here are the latest sports scores.");
    }

    if (type == "joke_tell") {
      speak(
        "Why don't skeletons fight each other? Because they don't have the guts!"
      );
    }

    if (type == "quote_tell") {
      speak(
        "The best way to get started is to quit talking and begin doing. — Walt Disney"
      );
    }

    if (type == "music_play") {
      window.open("https://open.spotify.com", "_blank");
      speak("Playing music on Spotify.");
    }

    if (type == "call_contact") {
      speak("Calling contacts is not supported in browser.");
    }

    if (type == "message_send") {
      speak("Messaging is not supported in browser.");
    }

    if (
      type == "wifi_toggle" ||
      type == "bluetooth_toggle" ||
      type == "flashlight_toggle" ||
      type == "volume_change" ||
      type == "settings_open"
    ) {
      speak("Sorry, I cannot control system settings from the browser.");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-us";

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log(transcript);
      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
      }
    };
    recognition.onend = () => {
      setTimeout(() => recognition.start(), 100);
    };
    recognition.start();
    return () => {
      recognition.stop();
    };
  }, []);

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
        transition: "background 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center p-6">
        {/* Status indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div
            className={`
            px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-500
            ${
              listening
                ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                : speaking
                ? "bg-blue-500/20 border-blue-400/50 text-blue-300"
                : "bg-slate-800/50 border-slate-600/50 text-slate-300"
            }
          `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  listening
                    ? "bg-emerald-400 animate-pulse"
                    : speaking
                    ? "bg-blue-400 animate-pulse"
                    : "bg-slate-500"
                }
              `}
              />
              <span className="text-sm font-medium">
                {listening
                  ? "Listening..."
                  : speaking
                  ? "Speaking..."
                  : "Ready"}
              </span>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="group relative">
          {/* Glow effect */}
          <div
            className={`
            absolute -inset-1 rounded-3xl opacity-75 blur transition-all duration-1000
            ${
              listening
                ? "bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 animate-pulse"
                : speaking
                ? "bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-pulse"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
            }
          `}
          />

          <div className="relative backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-3xl p-8 shadow-2xl transition-all duration-700 hover:shadow-blue-500/20 hover:shadow-3xl max-w-md w-full">
            {/* Action buttons */}
            <div className="flex gap-4 mb-8 w-full justify-center">
              <button
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl text-slate-200 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/25 border border-slate-600/50 overflow-hidden cursor-pointer"
                onClick={handleLogout}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Log Out</span>
              </button>
              <button
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 overflow-hidden cursor-pointer"
                onClick={() => navigate("/customize")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Customize</span>
              </button>
            </div>

            {/* Assistant image container */}
            <div className="relative mb-8">
              {/* Animated rings */}
              <div
                className={`
                absolute inset-0 rounded-3xl transition-all duration-1000
                ${
                  listening
                    ? "animate-ping bg-emerald-400/20"
                    : speaking
                    ? "animate-ping bg-blue-400/20"
                    : ""
                }
              `}
              />
              <div
                className={`
                absolute inset-2 rounded-3xl transition-all duration-700 delay-100
                ${
                  listening
                    ? "animate-ping bg-emerald-400/10"
                    : speaking
                    ? "animate-ping bg-blue-400/10"
                    : ""
                }
              `}
              />

              <div className="relative w-72 h-80 mx-auto overflow-hidden rounded-3xl group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 cursor-pointer" />
                <img
                  src={userData?.assistantImage}
                  alt="Assistant"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                />

                {/* Voice visualization overlay */}
                {(listening || speaking) && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`
                            w-1 rounded-full transition-all duration-150
                            ${listening ? "bg-emerald-400" : "bg-blue-400"}
                          `}
                          style={{
                            height: `${
                              20 + Math.sin(Date.now() / (200 + i * 50)) * 15
                            }px`,
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assistant name */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent mb-2">
                I am {userData?.assistantName}
              </h1>
              <p className="text-slate-400 text-sm">Your AI Assistant</p>
            </div>

            {/* Subtle animation indicator */}
            <div className="mt-6 flex justify-center">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${
                        listening
                          ? "bg-emerald-400 animate-bounce"
                          : speaking
                          ? "bg-blue-400 animate-bounce"
                          : "bg-slate-600"
                      }
                    `}
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hint text */}
        <div className="mt-8 text-center">
          <p className="text-slate-400/50 text-sm max-w-md">
            Say "{userData?.assistantName}" followed by your command to interact
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
