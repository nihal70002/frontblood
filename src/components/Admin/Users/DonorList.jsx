import { useEffect, useState } from "react";
import { getDonors } from "../../../services/AdminService";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDonors()
      .then((res) => {
        setDonors(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Donors</h1>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">Loading donors...</div>
        ) : donors.length === 0 ? (
          <div className="p-6 text-gray-500">No donors found.</div>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-700">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Blood Group</th>
                <th className="p-4 font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((d, idx) => (
                <tr
                  key={d.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="p-4">{d.name}</td>
                  <td className="p-4 font-medium text-red-500">{d.bloodGroup}</td>
                  <td className="p-4">{d.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
