import React from "react";

export default function BloodRecipients() {
  const recipients = [
    { id: 1, name: "Aisha", blood: "O+", hospital: "City Care Hospital", status: "Matched" },
    { id: 2, name: "Ravi", blood: "B-", hospital: "Community Health Center", status: "Pending" },
    { id: 3, name: "Maya", blood: "AB+", hospital: "Apollo Hospital", status: "Matched" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Blood Recipients</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipients.map((rec) => (
          <div
            key={rec.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{rec.name}</h2>
              <p className="text-gray-600">Blood Group: <span className="font-bold">{rec.blood}</span></p>
              <p className="text-sm text-gray-500">{rec.hospital}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  rec.status === "Matched"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {rec.status}
              </span>
              <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
