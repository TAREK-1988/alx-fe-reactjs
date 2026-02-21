import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    { id: "1", title: "First Post" },      
    { id: "2", title: "Second Post" },
    { id: "3", title: "Third Post" }
  ];

  return (
    <div>
      <h2>Blog</h2>
      <p>Dynamic route: /blog/:postId</p>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
