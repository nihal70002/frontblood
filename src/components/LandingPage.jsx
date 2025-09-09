import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Users,
  ShieldCheck,
  Menu,
  X,
  MessageCircle,
  User,
  Calendar,
  ChevronRight,
  Settings,
  LogOut,
  Activity,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ChatBox Component
function ChatBox({ user }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim() && user) {
      setMessages((prev) => [...prev, { user: user.name, text: messageInput }]);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isChatOpen && (
        <div className="w-80 bg-white rounded-lg shadow-xl mt-2 flex flex-col">
          <div className="p-4 bg-red-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Lifeblood Chat</h3>
            <button onClick={() => setIsChatOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.user === user?.name ? "bg-red-100 ml-auto" : "bg-gray-200"
                } max-w-[80%]`}
              >
                <span className="text-sm font-semibold">{msg.user}</span>
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>
          {user ? (
            <div className="p-4 border-t">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={sendMessage}
                className="mt-2 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Send
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-600">
              Please{" "}
              <a href="/login" className="text-red-500 hover:underline">
                log in
              </a>{" "}
              to chat.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sidebar Component
function UserSidebar({ user, isOpen, onClose }) {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const bloodColors = {
    "O+": "bg-red-500",
    "O-": "bg-red-700",
    "A+": "bg-blue-500",
    "A-": "bg-blue-700",
    "B+": "bg-green-500",
    "B-": "bg-green-700",
    "AB+": "bg-yellow-500",
    "AB-": "bg-yellow-700",
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const menuItems = [
    { icon: User, title: "Profile", description: "View and edit profile", path: "/dashboard/profile", color: "text-blue-600" },
    { icon: Activity, title: "Donation History", description: "View your donation records", path: "/dashboard/donation-history", color: "text-green-600" },
    { icon: Heart, title: "Schedule Donation", description: "Book your next appointment", path: "/dashboard/schedule-donation", color: "text-red-600" },
    { icon: Users, title: "Find Recipients", description: "Connect with those in need", path: "/dashboard/find-recipients", color: "text-purple-600" },
    { icon: UserPlus, title: "Blood Requests", description: "View active blood requests", path: "/dashboard/blood-requests", color: "text-orange-600" },
    { icon: Calendar, title: "Appointments", description: "Manage your appointments", path: "/dashboard/appointments", color: "text-indigo-600" },
    { icon: Settings, title: "Settings", description: "Account settings", path: "/dashboard/settings", color: "text-gray-600" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <img
                src={
                  user?.avatar ||
                  `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.name || "random"}`
                }
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="text-xl font-bold mb-1">{user?.name || "User"}</h2>
            <p className="text-red-100 capitalize text-sm mb-3">{user?.role || "Member"}</p>
            {user?.bloodGroup && (
              <div className="mt-3">
                <span
                  className={`px-4 py-2 rounded-full text-white text-lg font-bold shadow-lg transform transition-all duration-200 hover:scale-105 ${
                    bloodColors[user.bloodGroup] || "bg-gray-500"
                  }`}
                >
                  {user.bloodGroup}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="w-full px-6 py-4 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 group hover:shadow-sm"
          >
            <div className={`p-2 rounded-lg bg-gray-100 ${item.color} group-hover:scale-110 transition-transform duration-200`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-700">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        ))}
      </div>
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

// Landing Page Component
export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const bloodColors = {
    "O+": "bg-red-500",
    "O-": "bg-red-700",
    "A+": "bg-blue-500",
    "A-": "bg-blue-700",
    "B+": "bg-green-500",
    "B-": "bg-green-700",
    "AB+": "bg-yellow-500",
    "AB-": "bg-yellow-700",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full z-20 fixed top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col justify-center items-center space-y-1 p-2 hover:text-red-500"
            >
              <span className="w-6 h-0.5 bg-gray-700 rounded"></span>
              <span className="w-6 h-0.5 bg-gray-700 rounded"></span>
              <span className="w-6 h-0.5 bg-gray-700 rounded"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">Lifeblood Connect</span>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-gray-700 font-semibold text-sm">
                      Hi,{" "}
                      <span className="capitalize">
                        {user.name ? (user.name.includes("@") ? user.name.split("@")[0] : user.name) : "User"}
                      </span>
                      !
                    </p>
                    <p className="text-gray-500 text-xs">
                      {user.role === "User" ? "Donor" : user.role}
                    </p>
                  </div>
                  {user.bloodGroup && (
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        bloodColors[user.bloodGroup] || "bg-gray-500"
                      }`}
                    >
                      {user.bloodGroup}
                    </span>
                  )}
                  <img
                    src={
                      user.avatar ||
                      `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.name || "random"}`
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-red-500 object-cover cursor-pointer"
                    onClick={() => navigate("/dashboard/profile")}
                  />
                </div>
              ) : (
                <>
                  <a
                    href="/register"
                    className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Register
                  </a>
                  <a
                    href="/login"
                    className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition-colors shadow-sm"
                  >
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-24 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')"}}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-red-700/50 to-black/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
              Give the Gift of Life
            </h1>
            <p className="mt-4 text-lg text-gray-100 max-w-3xl mx-auto">
              Connect with those in need and make a difference by donating blood
              through our secure messaging system.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/matching-blood")}
                className="px-10 py-4 bg-white text-red-600 rounded-full font-bold hover:bg-red-50 transition-all"
              >
                FIND MATCH
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">How Lifeblood Connect Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform simplifies the process of blood donation and requests, ensuring a safe and efficient experience for everyone.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Register</h3>
                <p className="text-gray-600">Sign up as a donor or recipient to get started.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Connect</h3>
                <p className="text-gray-600">Find donors and recipients based on blood type and location.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Donate & Save</h3>
                <p className="text-gray-600">Schedule donations and make a real difference in lives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blood Types Section */}
        <section className="py-24 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Blood Types</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {Object.keys(bloodColors).map((type, idx) => (
                <span
                  key={idx}
                  className={`px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg ${bloodColors[type]}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-600">"I was able to find a donor in just a few hours. Lifeblood Connect saved my brother's life!"</p>
                <h4 className="mt-4 font-bold text-gray-800">- Anil</h4>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-600">"Scheduling blood donations is so easy now. I recommend everyone to join!"</p>
                <h4 className="mt-4 font-bold text-gray-800">- Priya</h4>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-600">"The platform is intuitive and helped me manage multiple donation requests efficiently."</p>
                <h4 className="mt-4 font-bold text-gray-800">- Ravi</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-red-600 text-white py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Lifeblood Connect. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Sidebar */}
      <UserSidebar user={user} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ChatBox */}
      <ChatBox user={user} />
    </div>
  );
}
