import React from "react";

export default function Settings() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Settings</h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email Notifications</label>
          <select className="w-full border rounded-lg p-2">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <select className="w-full border rounded-lg p-2">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
