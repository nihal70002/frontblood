import { useEffect, useState } from "react";
import { getAllAdminProfiles, deleteAdminProfile } from "../../services/adminService";
import { Link } from "react-router-dom";
import AdminProfileCard from "../../components/AdminProfileCard";

export default function AdminProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const response = await getAllAdminProfiles();
    setProfiles(response.data);
  };

  const handleDelete = async (id) => {
    await deleteAdminProfile(id);
    loadProfiles();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Profiles</h1>
      <Link to="/admin/profiles/new" className="text-blue-600 mb-4 inline-block">Add New</Link>
      <div>
        {profiles.map(profile => (
          <AdminProfileCard key={profile.id} profile={profile} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
