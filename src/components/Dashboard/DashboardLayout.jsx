import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { User, Heart, History, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({ user }) {
  const navigate = useNavigate();

  // Sign Out function
  const handleSignOut = () => {
    localStorage.removeItem("token"); // remove auth token
    localStorage.removeItem("user");  // remove user info
    navigate("/login");                // redirect to login page
  };

  const menuItems = [
    { to: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "requests", label: "Requests", icon: <Heart className="w-5 h-5" /> },
    { to: "history", label: "History", icon: <History className="w-5 h-5" /> },
    { to: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
    { to: "logout", label: "Sign Out", icon: <LogOut className="w-5 h-5" />, onClick: handleSignOut },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-300">Welcome, {user?.name || "User"}</p>

        <nav className="mt-6 space-y-3">
          {menuItems.map((item, i) => (
            item.onClick ? (
              // Use button for Sign Out
              <button
                key={i}
                onClick={item.onClick}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-700 transition w-full text-left"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={i}
                to={item.to}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-700 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Nested pages */}
      </main>
    </div>
  );
}
