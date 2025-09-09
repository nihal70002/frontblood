import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MessageCircle } from "lucide-react";

export default function MatchingBloodDonors() {
  const navigate = useNavigate();
  const [matchingDonors, setMatchingDonors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Blood compatibility rules - who can donate TO the logged-in user
  const getWhoCanDonateToMe = (receiverBloodGroup) => {
    const compatibility = {
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'A-': ['A-', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'B-': ['B-', 'O-'],
      'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal receiver
      'AB-': ['A-', 'B-', 'AB-', 'O-'],
      'O+': ['O+', 'O-'],
      'O-': ['O-']
    };
    return compatibility[receiverBloodGroup] || [];
  };

  useEffect(() => {
    const fetchMatchingDonors = async () => {
      try {
        setLoading(true);
        setError("");

        // Get current user info from localStorage
        const userInfo = localStorage.getItem("user");
        if (!userInfo) {
          setError("Please log in to view matching donors.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userInfo);
        setCurrentUser(user);

        // Check if user has blood group
        if (!user.bloodGroup) {
          setError("Blood group information not found. Please ensure your profile includes blood group data.");
          setLoading(false);
          return;
        }

        // Get token
        const token = user.token || localStorage.getItem("token");
        
        // Create config for API calls - only add Authorization header if token exists and is not empty
        const config = (token && token.trim() !== "") ? { 
          headers: { Authorization: `Bearer ${token}` } 
        } : {};

        try {
          // Fetch all users (donors and receivers)
          const [donorsRes, receiversRes] = await Promise.all([
            axios.get("http://localhost:5181/api/Donors", config),
            axios.get("http://localhost:5181/api/Receivers", config),
          ]);

          const donors = Array.isArray(donorsRes.data) ? donorsRes.data : [];
          const receivers = Array.isArray(receiversRes.data) ? receiversRes.data : [];

          // Find people who can donate blood to the logged-in user
          const compatibleBloodGroups = getWhoCanDonateToMe(user.bloodGroup);
          
          // Get all users (both donors and receivers) who have compatible blood groups
          const allUsers = [...donors, ...receivers];
          const compatibleDonors = allUsers.filter(person => 
            person.id !== user.id && // Exclude self
            compatibleBloodGroups.includes(person.bloodGroup)
          );

          // Remove duplicates and add user type info
          const uniqueDonors = compatibleDonors
            .map(person => {
              // Determine if they're a donor, receiver, or both based on which array they came from
              const isDonor = donors.some(d => d.id === person.id);
              const isReceiver = receivers.some(r => r.id === person.id);
              
              let userType = 'unknown';
              if (isDonor && isReceiver) userType = 'both';
              else if (isDonor) userType = 'donor';
              else if (isReceiver) userType = 'receiver';
              
              return { ...person, type: userType };
            })
            .filter((user, index, self) => 
              index === self.findIndex(u => u.id === user.id)
            );

          setMatchingDonors(uniqueDonors);

        } catch (apiError) {
          console.error("API fetch error:", apiError);
          if (apiError.response?.status === 401) {
            setError("Authentication failed. Please log in again.");
          } else if (apiError.code === "ERR_NETWORK") {
            setError("Cannot reach backend. Is it running at http://localhost:5181?");
          } else {
            setError(apiError.response?.data?.message || "An error occurred while fetching donors.");
          }
        }

      } catch (err) {
        console.error("General error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingDonors();
  }, []);

  if (loading) return <p className="text-center text-gray-600 text-lg">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">People Who Can Donate Blood to You</h1>
        {currentUser && (
          <div className="inline-block bg-green-50 px-6 py-3 rounded-lg">
            <p className="text-lg">
              <span className="font-semibold">{currentUser.name || currentUser.email}</span> | 
              Your Blood Group: <span className="font-bold text-red-600">{currentUser.bloodGroup}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Showing people who can safely donate blood to you
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-center text-red-600 text-lg mb-4">{error}</p>}

      {matchingDonors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {matchingDonors.map((person) => (
            <div
              key={`${person.id}-${person.type}`}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{person.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    person.type === 'donor' ? 'bg-green-100 text-green-800' : 
                    person.type === 'receiver' ? 'bg-purple-100 text-purple-800' :
                    person.type === 'both' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {person.type}
                  </span>
                </div>
                <p className="text-gray-600">Blood Group: {person.bloodGroup || "N/A"}</p>
                <p className="text-gray-600">Contact: {person.contact || "N/A"}</p>
                <div className="mt-2">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    Can donate to you
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-red-500 text-white font-medium">
                  {person.bloodGroup || "N/A"}
                </span>
                <button
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  title={`Contact ${person.name}`}
                  onClick={() => {
                    // Handle contact functionality here
                    // You can open a modal, redirect to messaging, etc.
                    alert(`Contacting ${person.name} at ${person.contact}`);
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🩸</div>
          <p className="text-xl text-gray-600 mb-2">No compatible donors found.</p>
          <p className="text-gray-500">
            No one with compatible blood groups is currently registered who can donate to your blood type ({currentUser?.bloodGroup}).
          </p>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}