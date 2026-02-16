import { useMemo, useState } from "react";

function mockRegisterApi(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (String(payload.email || "").toLowerCase().includes("fail")) {
        reject(new Error("Mock API: Registration failed for this email."));
        return;
      }
      resolve({ ok: true, userId: Math.floor(Math.random() * 100000), ...payload });
    }, 700);
  });
}

export default function RegistrationForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [touched, setTouched] = useState({ username: false, email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setApiResult(null);
    setApiError("");
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true });
    setApiResult(null);
    setApiError("");
    if (hasErrors) return;

    try {
      setLoading(true);
      const res = await mockRegisterApi(form);
      setApiResult(res);
      setForm({ username: "", email: "", password: "" });
      setTouched({ username: false, email: false, password: false });
    } catch (err) {
      setApiError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={form.username}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="e.g. noah"
        autoComplete="username"
      />
      {touched.username && errors.username && <div className="error">{errors.username}</div>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        value={form.email}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="e.g. noah@mail.com"
        autoComplete="email"
      />
      {touched.email && errors.email && <div className="error">{errors.email}</div>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="••••••••"
        autoComplete="new-password"
      />
      {touched.password && errors.password && <div className="error">{errors.password}</div>}

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {apiError && <div className="error">{apiError}</div>}
      {apiResult?.ok && (
        <div className="success">
          Registered successfully. User ID: <b>{apiResult.userId}</b>
        </div>
      )}
    </form>
  );
}
