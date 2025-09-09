import React from "react";
import { Routes, Route } from "react-router-dom";

// User Components
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import LandingPage from "./components/LandingPage.jsx";
import MatchingBloodGroups from "./components/Matching/MatchingBloodGroups.jsx";
import Chat from "./components/Chat.jsx";

// User Dashboard Components
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import UserDashboard from "./components/Dashboard/UserDashboard.jsx";
import ProfilePage from "./components/Dashboard/ProfilePage.jsx";
import DonationHistory from "./components/Dashboard/Pages/DonationHistory.jsx";
import ScheduleDonation from "./components/Dashboard/Pages/ScheduleDonation.jsx";
import FindRecipients from "./components/Dashboard/Pages/FindRecipients.jsx";
import BloodRequests from "./components/Dashboard/Pages/BloodRequests.jsx";
import BloodRecipients from "./components/Dashboard/Pages/BloodRecipients.jsx";
import Appointments from "./components/Dashboard/Pages/Appointments.jsx";
import Settings from "./components/Dashboard/Pages/Settings.jsx";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminProfileList from "./components/Admin/AdminProfileList.jsx";
import AdminProfileForm from "./components/Admin/AdminProfileForm.jsx";
import AdminProfileDetails from "./components/Admin/AdminProfileDetails.jsx";
import DonorList from "./components/Admin/Users/DonorList.jsx";
import RecieverList from "./components/Admin/Users/RecieverList.jsx";

function App() {
  return (
    <Routes>
      {/* Public/User Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/matching-blood" element={<MatchingBloodGroups />} />

      {/* User Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} /> {/* default inside dashboard */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="donation-history" element={<DonationHistory />} />
        <Route path="schedule-donation" element={<ScheduleDonation />} />
        <Route path="find-recipients" element={<FindRecipients />} />
        <Route path="blood-requests" element={<BloodRequests />} />
        <Route path="blood-recipients" element={<BloodRecipients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="profiles" element={<AdminProfileList />} />
        <Route path="profiles/new" element={<AdminProfileForm />} />
        <Route path="profiles/:id" element={<AdminProfileDetails />} />
        <Route path="donors" element={<DonorList />} />
        <Route path="receivers" element={<RecieverList />} />
      </Route>
    </Routes>
  );
}

export default App;
