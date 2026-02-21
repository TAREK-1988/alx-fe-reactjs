import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Advanced Routing Demo</p>

      <ul>
        <li><Link to="/profile">Profile (Protected)</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </div>
  );
}
