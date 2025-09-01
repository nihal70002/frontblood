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

  // Fetch profile data if editing
  useEffect(() => {
    if (editId) {
      getAdminProfileById(editId)
        .then(res => setProfile(res.data))
        .catch(err => console.error("Error fetching profile:", err));
    }
  }, [editId]);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAdminProfile(editId, profile);
      } else {
        await createAdminProfile(profile);
      }
      navigate("/admin/profiles");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{editId ? "Edit" : "Add"} Admin Profile</h1>

      <div className="mb-2">
        <label className="block font-semibold">User ID</label>
        <input
          type="text"
          name="userId"
          value={profile.userId}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Department</label>
        <input
          type="text"
          name="department"
          value={profile.department}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Joined Date</label>
        <input
          type="date"
          name="joinedDate"
          value={profile.joinedDate?.split("T")[0] || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
