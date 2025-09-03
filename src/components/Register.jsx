import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService"; // Axios API call

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodType: "",
    age: "",
    contactNumber: "",
    userRole: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { fullName, email, password, bloodType, age, contactNumber, userRole } = formData;
    if (!fullName || !email || !password || !bloodType || !age || !contactNumber || !userRole) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    // ✅ FIXED: Changed UserRole to Role and ensure proper capitalization
    const backendData = {
      FullName: fullName,
      Email: email,
      Password: password,
      BloodType: bloodType,
      Age: parseInt(age),
      ContactNumber: contactNumber,
      Role: userRole, // ✅ Changed from "UserRole" to "Role"
    };

    try {
      console.log("Sending data to backend:", backendData); // ✅ Debug log
      const response = await registerUser(backendData);

      if (response.Message === "Registration successful" || response.message === "Registration successful") {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError(response.Message || response.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err); // ✅ Better error logging
      setError(err.Message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37,99,235,0.08) 0%, rgba(191,219,254,0.05) 30%, transparent 60%), linear-gradient(135deg,#eff6ff 0%,#fff 20%,#dbeafe 40%,#fff 60%,#eff6ff 80%,#dbeafe 100%)`,
        }}
      ></div>

      <div className="flex items-center justify-center w-full h-full relative z-10 p-4">
        <div className="w-full max-w-lg p-8 bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                BloodBank Pro
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                MEDICAL CENTER
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3">
              {["fullName", "email", "password", "bloodType", "age", "contactNumber", "userRole"].map((field) => (
                <div key={field} className="space-y-1.5">
                  <label
                    htmlFor={field}
                    className={`block text-xs font-semibold transition-all ${
                      focusedField === field ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {field === "userRole" ? "User Role" : field.replace(/^./, (str) => str.toUpperCase())}
                  </label>

                  {field === "bloodType" ? (
                    <select
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField("")}
                      className="w-full px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
                      required
                    >
                      <option value="">Select Blood Type</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  ) : field === "userRole" ? (
                    <select
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField("")}
                      className="w-full px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
                      required
                    >
                      <option value="">Select User Role</option>
                      <option value="Donor">Donor</option>        {/* ✅ Fixed: "donor" → "Donor" */}
                      <option value="Receiver">Receiver</option>   {/* ✅ Fixed: "recipient" → "Receiver" */}
                    </select>
                  ) : (
                    <input
                      id={field}
                      name={field}
                      type={field === "password" ? "password" : field === "age" ? "number" : field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField("")}
                      placeholder={`Enter your ${field === "userRole" ? "role" : field}`}
                      className="w-full px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all shadow-sm disabled:opacity-50"
                      required
                      {...(field === "age" && { min: "18", max: "100" })}
                      {...(field === "contactNumber" && { pattern: "[0-9]{10}" })}
                    />
                  )}
                </div>
              ))}

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-base font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-xs text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}