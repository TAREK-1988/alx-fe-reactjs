import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails.jsx";
import ProfileSettings from "./ProfileSettings.jsx";
import { useAuth } from "./useAuth";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={logout}>Logout</button>

      <div style={{ marginTop: 12 }}>
        <Link to="/profile/details" style={{ marginRight: 10 }}>
          Details
        </Link>
        <Link to="/profile/settings">Settings</Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <Routes>
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
}
