import { useParams, Link } from "react-router-dom";

export default function BlogPost() {
  const { postId } = useParams();

  return (
    <div>
      <h2>Blog Post</h2>
      <p>Post ID: {postId}</p>
      <Link to="/blog">Back to Blog</Link>
    </div>
  );
}
