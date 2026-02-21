import { useAuth } from "./useAuth";

export default function Login() {
  const { login } = useAuth();

  return (
    <div>
      <h2>Login</h2>
      <p>This is a simulated login.</p>
      <button onClick={login}>Login</button>
    </div>
  );
}
