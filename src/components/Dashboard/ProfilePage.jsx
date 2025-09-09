import React, { useState, useEffect } from "react";
import { Heart, User, Activity, Edit, Save, ArrowLeft, Shield, Users } from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setEditForm({
          name: userData.FullName || userData.name,
          email: userData.Email || userData.email,
          phone: userData.ContactNumber || userData.phone,
          location: userData.Location || userData.location,
          bloodGroup: userData.BloodGroup || userData.bloodGroup,
          weight: userData.Weight || userData.weight,
          height: userData.Height || userData.height,
          medicalConditions: userData.MedicalConditions || userData.medicalConditions,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const bloodColors = {
    "O+": "bg-red-500",
    "O-": "bg-red-700",
    "A+": "bg-blue-500",
    "A-": "bg-blue-700",
    "B+": "bg-green-500",
    "B-": "bg-green-700",
    "AB+": "bg-yellow-500",
    "AB-": "bg-yellow-700",
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Map frontend fields to backend DTO
      const updateDto = {
        FullName: editForm.name,
        Email: editForm.email,
        ContactNumber: editForm.phone,
        BloodGroup: editForm.bloodGroup,
        Location: editForm.location,
        Weight: editForm.weight,
        Height: editForm.height,
        MedicalConditions: editForm.medicalConditions,
      };

      // Call backend PUT endpoint
      const response = await axios.put(
        `http://localhost:5181/api/Accounts/${user.id}`,
        updateDto
      );

      // Use backend response or fallback to updateDto
      const updatedUser = response.data || { ...user, ...updateDto };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="ml-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Landing Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-red-500" />
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-xl font-bold text-center w-full border rounded px-2 py-1 mb-2"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{user.FullName || user.name}</h2>
                )}

                <p className="text-gray-600 capitalize mb-4">{user.Role || user.role}</p>

                <div className="mb-6">
                  <span
                    className={`px-6 py-3 rounded-full text-white text-xl font-bold ${
                      bloodColors[user.BloodGroup || user.bloodGroup] || "bg-gray-500"
                    }`}
                  >
                    {user.BloodGroup || user.bloodGroup || "N/A"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{user.DonationsCount || user.donationsCount || 0}</p>
                    <p className="text-sm text-gray-600">Donations</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{user.TotalHelpedLives || user.totalHelpedLives || 0}</p>
                    <p className="text-sm text-gray-600">Lives Helped</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Personal Information */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-red-500" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["email", "phone", "location"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm[field] || user[field] || ""}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user[field]}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900">
                      {user.JoinDate || user.joinDate
                        ? new Date(user.JoinDate || user.joinDate).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  Medical Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["weight", "height"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm[field] || user[field] || ""}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user[field]}</p>
                      )}
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medical Conditions
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editForm.medicalConditions || user.MedicalConditions || user.medicalConditions || ""}
                        onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.MedicalConditions || user.medicalConditions}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Donation Status */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-500" />
                  Donation Status
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Donation
                    </label>
                    <p className="text-gray-900">
                      {user.LastDonation || user.lastDonation
                        ? new Date(user.LastDonation || user.lastDonation).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Next Eligible Date
                    </label>
                    <p className="text-green-600 font-medium">
                      {user.NextEligibleDate || user.nextEligibleDate
                        ? new Date(user.NextEligibleDate || user.nextEligibleDate).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => (window.location.href = "/schedule-donation")}
            className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Heart className="w-5 h-5" />
            <span>Schedule Donation</span>
          </button>

          <button
            onClick={() => (window.location.href = "/donation-history")}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Activity className="w-5 h-5" />
            <span>View History</span>
          </button>

          <button
            onClick={() => (window.location.href = "/find-recipients")}
            className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Find Recipients</span>
          </button>
        </div>

        {/* Bottom Back to Landing Page Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}
