import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", error: "" });

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, message: "", error: "" });

    if (!validate()) return;

    try {
      setStatus({ loading: true, message: "", error: "" });

      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (!res.ok) throw new Error("Registration failed");

      await res.json();

      setStatus({ loading: false, message: "Registered successfully!", error: "" });
      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (err) {
      setStatus({ loading: false, message: "", error: err.message || "Something went wrong" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gap: 10 }}>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
          {errors.username && <p style={{ color: "crimson", margin: "6px 0 0" }}>{errors.username}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
          {errors.email && <p style={{ color: "crimson", margin: "6px 0 0" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
          {errors.password && <p style={{ color: "crimson", margin: "6px 0 0" }}>{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={status.loading}
          style={{
            padding: 10,
            borderRadius: 10,
            border: 0,
            background: "#5E6AD2",
            color: "white",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {status.loading ? "Submitting..." : "Register"}
        </button>

        {status.message && <p style={{ color: "green", margin: 0 }}>{status.message}</p>}
        {status.error && <p style={{ color: "crimson", margin: 0 }}>{status.error}</p>}
      </div>
    </form>
  );
}
