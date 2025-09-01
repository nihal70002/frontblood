import React from "react";
import { Routes, Route } from "react-router-dom";

// User Components
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import LandingPage from './components/LandingPage.jsx';

// Admin Components
import AdminLayout from './components/Admin/AdminLayout.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AdminProfileList from './components/Admin/AdminProfileList.jsx';
import AdminProfileForm from './components/Admin/AdminProfileForm.jsx';
import AdminProfileDetails from './components/Admin/AdminProfileDetails.jsx';

function App() {
  return (
    <Routes>
      {/* Public/User Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> {/* /admin */}
        <Route path="profiles" element={<AdminProfileList />} /> {/* /admin/profiles */}
        <Route path="profiles/new" element={<AdminProfileForm />} /> {/* /admin/profiles/new */}
        <Route path="profiles/:id" element={<AdminProfileDetails />} /> {/* /admin/profiles/:id */}
      </Route>

      {/* Extra direct route for dashboard */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
