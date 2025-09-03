import { useEffect, useState } from "react";
import { getReceivers, createReceiver, deleteReceiver } from "../../../services/AdminService";

export default function ReceiverList() {
  const [receivers, setReceivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [newReceiver, setNewReceiver] = useState({ name: "", bloodGroup: "A+", contact: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchReceivers();
  }, []);

  const fetchReceivers = () => {
    setLoading(true);
    getReceivers()
      .then((res) => setReceivers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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

  const filteredReceivers =
    selectedBloodGroup === "All"
      ? receivers
      : receivers.filter((r) => r.bloodGroup === selectedBloodGroup);

  const handleAddReceiver = async () => {
    if (!newReceiver.name.trim() || !newReceiver.contact.trim()) return;

    setAdding(true);
    try {
      const res = await createReceiver(newReceiver);
      setReceivers((prev) => [...prev, res.data]);
      setNewReceiver({ name: "", bloodGroup: "A+", contact: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteReceiver = async (id) => {
    if (!confirm("Are you sure you want to delete this receiver?")) return;
    try {
      await deleteReceiver(id);
      setReceivers((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const bloodGroupCounts = receivers.reduce((acc, receiver) => {
    acc[receiver.bloodGroup] = (acc[receiver.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const totalReceivers = receivers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Blood Receiver Registry
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Managing {totalReceivers} registered receivers across all blood groups
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {bloodGroups.slice(1).map((bg) => (
            <div
              key={bg}
              className={`${bloodGroupColor(bg)} p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1`}
              onClick={() => setSelectedBloodGroup(bg)}
            >
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">{bloodGroupCounts[bg] || 0}</div>
                <div className="text-xs sm:text-sm font-medium opacity-80">{bg}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Receiver Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4 flex items-center">
            <div className="w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 sm:mr-3"></div>
            Add New Receiver
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter receiver name"
                value={newReceiver.name}
                onChange={(e) => setNewReceiver({ ...newReceiver, name: e.target.value })}
                className="w-full p-2 sm:p-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-slate-700">Blood Group</label>
              <select
                value={newReceiver.bloodGroup}
                onChange={(e) => setNewReceiver({ ...newReceiver, bloodGroup: e.target.value })}
                className="w-full p-2 sm:p-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              >
                {bloodGroups.slice(1).map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-slate-700">Contact</label>
              <input
                type="text"
                placeholder="Phone or email"
                value={newReceiver.contact}
                onChange={(e) => setNewReceiver({ ...newReceiver, contact: e.target.value })}
                className="w-full p-2 sm:p-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddReceiver}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={adding || !newReceiver.name.trim() || !newReceiver.contact.trim()}
              >
                {adding ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1 sm:mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  "Add Receiver"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <label className="text-xs sm:text-sm font-medium text-slate-700">Filter by Blood Group:</label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="px-2 sm:px-4 py-1 sm:py-2 border border-slate-200 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg === "All" ? "All Blood Groups" : bg}</option>
              ))}
            </select>
          </div>
          <div className="text-xs sm:text-sm text-slate-600">
            Showing {filteredReceivers.length} of {totalReceivers} receivers
          </div>
        </div>

        {/* Receivers Grid/Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="p-6 sm:p-12 text-center">
              <div className="w-10 sm:w-16 h-10 sm:h-16 border-2 sm:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2 sm:mb-4"></div>
              <p className="text-slate-600 text-base sm:text-lg">Loading receivers...</p>
            </div>
          ) : filteredReceivers.length === 0 ? (
            <div className="p-6 sm:p-12 text-center">
              <div className="w-16 sm:w-24 h-16 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <svg className="w-8 sm:w-12 h-8 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-slate-600 text-base sm:text-lg">No receivers found for the selected criteria</p>
              <p className="text-slate-500 text-sm mt-1 sm:mt-2">Try adjusting your filter or add a new receiver</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 sm:p-6 font-semibold text-slate-700">Receiver Information</th>
                      <th className="text-left p-4 sm:p-6 font-semibold text-slate-700">Blood Group</th>
                      <th className="text-left p-4 sm:p-6 font-semibold text-slate-700">Contact Details</th>
                      <th className="text-center p-4 sm:p-6 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReceivers.map((receiver, index) => (
                      <tr
                        key={receiver.id}
                        className={`${
                          index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
                        } hover:bg-blue-50/50 transition-colors duration-200 border-b border-slate-100 last:border-b-0`}
                      >
                        <td className="p-4 sm:p-6">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                              {receiver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800 text-sm sm:text-base">{receiver.name}</div>
                              <div className="text-sm text-slate-500">Receiver ID: {receiver.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 sm:p-6">
                          <span className={`inline-flex px-2 sm:px-4 py-1 sm:py-2 rounded-full font-semibold text-xs sm:text-sm ${bloodGroupColor(receiver.bloodGroup)}`}>
                            {receiver.bloodGroup}
                          </span>
                        </td>
                        <td className="p-4 sm:p-6">
                          <div className="text-slate-700 text-sm sm:text-base">{receiver.contact}</div>
                        </td>
                        <td className="p-4 sm:p-6 text-center">
                          <button
                            onClick={() => handleDeleteReceiver(receiver.id)}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 font-medium shadow-md text-xs sm:text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="sm:hidden space-y-4">
                {filteredReceivers.map((receiver) => (
                  <div key={receiver.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {receiver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{receiver.name}</div>
                        <div className="text-sm text-slate-500">Receiver ID: {receiver.id}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`inline-flex px-2 py-1 rounded-full font-semibold text-sm ${bloodGroupColor(receiver.bloodGroup)}`}>
                        {receiver.bloodGroup}
                      </span>
                      <div className="text-slate-700 text-sm">{receiver.contact}</div>
                      <button
                        onClick={() => handleDeleteReceiver(receiver.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 font-medium shadow-md"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}