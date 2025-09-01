import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
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

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser({ Email: email, Password: password });

      const message = response.Message || response.message;
      const user = response.user || {};
      const token = response.token || "";
      console.log(response.role);

      if (message?.toLowerCase().includes("success")) {
        const userData = {
          name: user.name || email,
          email,
          role: user.role || "User",
          token,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Login successful!");

        // ✅ Role-based redirect
        const role = response.role.toLowerCase();
        console.log(role)
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "donor") {
          navigate("/donor-dashboard");
        } else if (role === "receiver") {
          navigate("/receiver-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(message || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37,99,235,0.08) 0%, rgba(191,219,254,0.05) 30%, transparent 60%), linear-gradient(135deg,#eff6ff 0%,#fff 20%,#dbeafe 40%,#fff 60%,#eff6ff 80%,#dbeafe 100%)`,
        }}
      />

      {/* Card */}
      <div className="flex items-center justify-center w-full h-full relative z-10 p-4">
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                BloodBank Pro
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                LOGIN PANEL
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className={`block text-xs font-semibold transition-all ${
                  focusedField === "email" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className={`block text-xs font-semibold transition-all ${
                  focusedField === "password" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 text-base font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Navigate to Register */}
            <div className="text-center pt-2">
              <span className="text-xs text-gray-600">Don’t have an account? </span>
              <Link
                to="/register"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
