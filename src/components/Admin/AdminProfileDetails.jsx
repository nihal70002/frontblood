import { useEffect, useState } from "react";
import { getAdminProfileById } from "../../services/AdminService";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Briefcase, Calendar } from "lucide-react";

export default function AdminProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getAdminProfileById(id).then((res) => setProfile(res.data));
  }, [id]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Profile</h1>
          <Link
            to="/admin/profiles"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </Link>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <p className="text-gray-700">
              <strong>User ID:</strong> {profile.userId}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <p className="text-gray-700">
              <strong>Department:</strong> {profile.department}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <p className="text-gray-700">
              <strong>Joined Date:</strong>{" "}
              {new Date(profile.joinedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
