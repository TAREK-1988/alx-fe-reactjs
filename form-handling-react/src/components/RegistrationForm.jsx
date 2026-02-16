import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    let hasError = false;
    const newErrors = { username: "", email: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      hasError = true;
    }

    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setMessage("Form submitted successfully!");
    setUsername("");
    setEmail("");
    setPassword("");
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
          Register
        </button>

        {message && <p style={{ color: "green", margin: 0 }}>{message}</p>}
      </div>
    </form>
  );
}
