// src/components/Admin/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <nav className="mb-4">
        <ul className="flex gap-4">
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/profiles">Profiles</Link></li>
        </ul>
      </nav>
      <Outlet /> {/* ✅ Nested pages will render here */}
    </div>
  );
}
