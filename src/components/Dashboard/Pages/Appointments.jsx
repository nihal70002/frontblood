import React from "react";

export default function Appointments() {
  const appts = [
    { id: 1, date: "2025-09-10", location: "City Hospital", status: "Upcoming" },
    { id: 2, date: "2025-06-22", location: "Red Cross", status: "Completed" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Appointments</h1>

      <div className="bg-white shadow rounded-xl p-4">
        {appts.map((a) => (
          <div key={a.id} className="flex justify-between border-b py-2">
            <div>
              <p className="font-medium">{a.date}</p>
              <p className="text-sm text-gray-600">{a.location}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs ${
              a.status === "Upcoming"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
