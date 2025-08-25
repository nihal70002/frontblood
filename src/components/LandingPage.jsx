import React, { useState, useEffect } from "react";
import { Heart, Users, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name || "User");
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              <span className="text-2xl font-bold text-gray-800">
                Lifeblood Connect
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <span className="text-gray-600">Welcome, {userName}!</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setIsLoggedIn(false);
                      setUserName("");
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/register"
                    className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    Register
                  </a>
                  <a
                    href="/login"
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with full-width dddddd.jpg */}
      <main className="pt-24">
        <section
          className="relative py-20 bg-cover bg-center"
          style={{ backgroundImage: `url("/ddddd.jpg")` }}
        >
          <div className="absolute inset-0 bg-white/60"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                Give the Gift of Life
              </h1>
              <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                Connect with those in need and make a difference by donating
                blood or requesting a secure messaging system.
              </p>
              <div className="mt-8 flex space-x-4">
                <button className="px-8 py-3 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-600 transition-colors">
                  Donate Blood
                </button>
                <button className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors">
                  Request Blood
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800">
                How Lifeblood Connect Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform simplifies the process of blood donation and
                requests, ensuring a safe and efficient experience for everyone.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-red-100 rounded-full">
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Find a Match
                </h3>
                <p className="mt-4 text-gray-600">
                  Our advanced matching algorithm connects donors with
                  recipients based on blood type and location.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-red-100 rounded-full">
                    <Users className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Seamless Communication
                </h3>
                <p className="mt-4 text-gray-600">
                  Facilitate direct and secure communication between donors and
                  recipients through our secure messaging system.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-red-100 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Safe and Secure
                </h3>
                <p className="mt-4 text-gray-600">
                  Prioritize safety and security, ensuring all donations and
                  requests are verified and handled with utmost care.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white text-center">
        <p>&copy; 2024 Lifeblood Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}
