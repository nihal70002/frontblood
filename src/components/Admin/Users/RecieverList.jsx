import { useEffect, useState } from "react";
import { getReceivers } from "../../../services/AdminService"; 

export default function ReceiverList() {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    getReceivers().then((res) => setReceivers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Receivers</h1>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Contact</th>
            </tr>
          </thead>
          <tbody>
            {receivers.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.bloodGroup}</td>
                <td className="p-3">{r.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
