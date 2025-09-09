import React from "react";

export default function BloodRequests() {
  const requests = [
    { id: 1, patient: "Rahul", blood: "O-", urgency: "High" },
    { id: 2, patient: "Meera", blood: "AB+", urgency: "Medium" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Blood Requests</h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white shadow rounded-xl p-4">
            <h2 className="font-semibold">{req.patient}</h2>
            <p>Blood Group: <span className="font-bold">{req.blood}</span></p>
            <p className="text-sm text-gray-500">Urgency: {req.urgency}</p>
            <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
              Donate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
