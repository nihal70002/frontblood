import React from "react";

export default function DonationHistory() {
  const records = [
    { id: 1, date: "2025-08-01", location: "City Hospital", status: "Completed" },
    { id: 2, date: "2025-05-20", location: "Red Cross Center", status: "Completed" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Donation History</h1>

      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="border-b">
                <td className="p-2">{rec.date}</td>
                <td className="p-2">{rec.location}</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
