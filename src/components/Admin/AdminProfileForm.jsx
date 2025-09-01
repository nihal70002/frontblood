import { useState, useEffect } from "react";
import { createAdminProfile, getAdminProfileById, updateAdminProfile } from "../../services/AdminService";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function AdminProfileForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const [profile, setProfile] = useState({
    userId: "",
    department: "",
    joinedDate: ""
  });

  useEffect(() => {
    if (editId) {
      getAdminProfileById(editId).then((res) => setProfile(res.data));
    }
  }, [editId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateAdminProfile(editId, profile);
    } else {
      await createAdminProfile(profile);
    }
    navigate("/admin/profiles");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      <h1 className="text-xl font-bold mb-4">{editId ? "Edit" : "Add"} Admin Profile</h1>
      <div className="mb-2">
        <label className="block">User ID</label>
        <input name="userId" value={profile.userId} onChange={handleChange} className="border p-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">Department</label>
        <input name="department" value={profile.department} onChange={handleChange} className="border p-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">Joined Date</label>
        <input type="date" name="joinedDate" value={profile.joinedDate?.split("T")[0]} onChange={handleChange} className="border p-1 w-full" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
        Save
      </button>
    </form>
  );
}
