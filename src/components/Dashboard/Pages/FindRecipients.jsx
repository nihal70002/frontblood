import React from "react";

export default function FindRecipients() {
  const recipients = [
    { id: 1, name: "Ali", blood: "A+", location: "City Hospital" },
    { id: 2, name: "Sara", blood: "B-", location: "Health Center" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Find Recipients</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {recipients.map((rec) => (
          <div key={rec.id} className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold">{rec.name}</h2>
            <p className="text-gray-600">Blood Group: {rec.blood}</p>
            <p className="text-sm text-gray-500">{rec.location}</p>
            <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
