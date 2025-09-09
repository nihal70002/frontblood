import React from "react";

export default function ScheduleDonation() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Schedule Donation</h1>

      <form className="bg-white shadow rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter hospital/center"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
          Schedule
        </button>
      </form>
    </div>
  );
}
