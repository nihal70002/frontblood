import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // Your API call

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Background animation
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "";
    };
  }, []);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Submit login
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      if (response && response.message === "Login successful") {
        if (response.user) localStorage.setItem("user", JSON.stringify(response.user));
        if (response.token) localStorage.setItem("token", response.token);

        navigate("/"); // redirect after login
      } else {
        setError(response?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => navigate("/register");
  const handleKeyPress = (e) => e.key === "Enter" && handleSubmit();

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(220,38,38,0.08) 0%, rgba(255,182,193,0.05) 30%, transparent 60%), linear-gradient(135deg,#fef2f2 0%,#fff 20%,#fdf2f8 40%,#fff 60%,#fef2f2 80%,#fdf2f8 100%)`,
        }}
      ></div>

      <div className="flex items-center justify-center w-full h-full relative z-10 p-4">
        <div className="w-full max-w-lg p-8 bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl">
          <div className="space-y-4">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl shadow-lg relative overflow-hidden">
                  <div className="absolute inset-2.5 bg-white rounded-md shadow-inner"></div>
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                BloodBank Pro
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                MEDICAL CENTER
              </p>
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-base text-gray-600 max-w-sm mx-auto">
                Sign in to continue your life-saving journey.
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3">
              {["email", "password"].map((field) => (
                <div key={field} className="space-y-1.5">
                  <label
                    htmlFor={field}
                    className={`block text-xs font-semibold transition-all ${
                      focusedField === field ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {field === "email" ? "Email Address" : "Password"}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === "password" ? "password" : "email"}
                    value={formData[field]}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField("")}
                    required
                    disabled={isLoading}
                    placeholder={
                      field === "email"
                        ? "Enter your email address"
                        : "Enter your password"
                    }
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-200 focus:outline-none transition-all shadow-sm disabled:opacity-50"
                  />
                </div>
              ))}

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-base font-bold text-white bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200">
                <span className="text-xs text-gray-600">Don't have an account?</span>
                <button
                  type="button"
                  onClick={navigateToRegister}
                  className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
