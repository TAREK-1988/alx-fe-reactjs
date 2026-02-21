import { Link, Outlet } from "react-router-dom";

export default function Profile({ onLogout }) {
  return (
    <div>
      <h2>Profile</h2>
      <button onClick={onLogout}>Logout</button>

      <div style={{ marginTop: 12 }}>
        <Link to="details" style={{ marginRight: 10 }}>Details</Link>
        <Link to="settings">Settings</Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <Outlet />
      </div>
    </div>
  );
}
