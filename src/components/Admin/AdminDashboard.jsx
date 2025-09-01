import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Heart,
  UserPlus,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <LayoutDashboard className="w-7 h-7" />
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-gray-700">
          <Link
            to="/admin/profiles"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <Users className="w-5 h-5" />
            Manage Admin Profiles
          </Link>

          <Link
            to="/admin/donors"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <Heart className="w-5 h-5" />
            Manage Donors
          </Link>

          <Link
            to="/admin/receivers"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <UserPlus className="w-5 h-5" />
            Manage Receivers
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome to Admin Dashboard 👋
        </h2>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-indigo-600">Admin Profiles</h3>
            <p className="text-gray-500 mt-2">Manage all admin users and their roles.</p>
            <Link
              to="/admin/profiles"
              className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
            >
              Go to Profiles →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-pink-600">Donors</h3>
            <p className="text-gray-500 mt-2">Track and manage all blood donors.</p>
            <Link
              to="/admin/donors"
              className="mt-4 inline-block text-pink-600 font-medium hover:underline"
            >
              Manage Donors →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-green-600">Receivers</h3>
            <p className="text-gray-500 mt-2">Handle receiver requests and matches.</p>
            <Link
              to="/admin/receivers"
              className="mt-4 inline-block text-green-600 font-medium hover:underline"
            >
              Manage Receivers →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-semibold text-gray-800">Reports & Logs</h3>
            <p className="text-gray-500 mt-2">
              Access system activity reports and performance analytics.
            </p>
            <Link
              to="/admin/reports"
              className="mt-4 inline-block text-gray-700 font-medium hover:underline"
            >
              View Reports →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
