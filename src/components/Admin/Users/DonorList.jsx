import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5181/api/Donors"; // 👈 change if your API endpoint differs

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [newDonor, setNewDonor] = useState({ name: "", bloodGroup: "A+", contact: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchDonors();
  }, []);

  // ✅ Fetch donors
  const fetchDonors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add donor
  const handleAddDonor = async () => {
    if (!newDonor.name.trim() || !newDonor.contact.trim()) return;

    setAdding(true);
    try {
      const res = await axios.post(API_URL, newDonor);
      setDonors((prev) => [...prev, res.data]);
      setNewDonor({ name: "", bloodGroup: "A+", contact: "" });
    } catch (err) {
      console.error("Error adding donor:", err);
    } finally {
      setAdding(false);
    }
  };

  // ✅ Delete donor
  const handleDeleteDonor = async (id) => {
    if (!confirm("Are you sure you want to delete this donor?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setDonors((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Error deleting donor:", err);
    }
  };

  const bloodGroupColor = (group) => {
    switch (group.toUpperCase()) {
      case "A+": return "bg-gradient-to-br from-red-50 to-red-100 text-red-700 border border-red-200";
      case "A-": return "bg-gradient-to-br from-red-100 to-red-200 text-red-800 border border-red-300";
      case "B+": return "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border border-amber-200";
      case "B-": return "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 border border-amber-300";
      case "O+": return "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200";
      case "O-": return "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300";
      case "AB+": return "bg-gradient-to-br from-violet-50 to-violet-100 text-violet-700 border border-violet-200";
      case "AB-": return "bg-gradient-to-br from-violet-100 to-violet-200 text-violet-800 border border-violet-300";
      default: return "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 border border-slate-200";
    }
  };

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const filteredDonors =
    selectedBloodGroup === "All"
      ? donors
      : donors.filter((d) => d.bloodGroup === selectedBloodGroup);

  const bloodGroupCounts = donors.reduce((acc, donor) => {
    acc[donor.bloodGroup] = (acc[donor.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const totalDonors = donors.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Blood Donor Registry
          </h1>
          <p className="text-slate-600 text-lg">
            Managing {totalDonors} registered donors across all blood groups
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {bloodGroups.slice(1).map((bg) => (
            <div
              key={bg}
              className={`${bloodGroupColor(bg)} p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1`}
              onClick={() => setSelectedBloodGroup(bg)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{bloodGroupCounts[bg] || 0}</div>
                <div className="text-sm font-medium opacity-80">{bg}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Donor Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
            Add New Donor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter donor name"
                value={newDonor.name}
                onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              />
            </div>
            

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Blood Group</label>
              <select
                value={newDonor.bloodGroup}
                onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              >
                {bloodGroups.slice(1).map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contact</label>
              <input
                type="text"
                placeholder="Phone or email"
                value={newDonor.contact}
                onChange={(e) => setNewDonor({ ...newDonor, contact: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleAddDonor}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={adding || !newDonor.name.trim() || !newDonor.contact.trim()}
              >
                {adding ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  "Add Donor"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <label className="font-medium text-slate-700">Filter by Blood Group:</label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg === "All" ? "All Blood Groups" : bg}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-slate-600">
            Showing {filteredDonors.length} of {totalDonors} donors
          </div>
        </div>

        {/* Donors Grid/Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg">Loading donors...</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-slate-600 text-lg">No donors found for the selected criteria</p>
              <p className="text-slate-500 mt-2">Try adjusting your filter or add a new donor</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-6 font-semibold text-slate-700">Donor Information</th>
                    <th className="text-left p-6 font-semibold text-slate-700">Blood Group</th>
                    <th className="text-left p-6 font-semibold text-slate-700">Contact Details</th>
                    <th className="text-center p-6 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((donor, index) => (
                    <tr
                      key={donor.id}
                      className={`${
                        index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
                      } hover:bg-blue-50/50 transition-colors duration-200 border-b border-slate-100 last:border-b-0`}
                    >
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {donor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{donor.name}</div>
                            <div className="text-sm text-slate-500">Donor ID: {donor.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex px-4 py-2 rounded-full font-semibold text-sm ${bloodGroupColor(donor.bloodGroup)}`}>
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="text-slate-700">{donor.contact}</div>
                      </td>
                      <td className="p-6 text-center">
                        <button
                          onClick={() => handleDeleteDonor(donor.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 font-medium shadow-md"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
