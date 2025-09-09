import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>No user profile found. Please login.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">My Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Avatar */}
          <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{user.name || "User Name"}</h2>
            <p className="text-gray-600">{user.email || "user@email.com"}</p>
            <p className="mt-2 text-sm text-gray-500">
              Blood Group:{" "}
              <span className="font-semibold text-red-600">
                {user.bloodGroup || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
            Edit Profile
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
