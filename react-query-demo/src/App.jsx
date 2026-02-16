import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent.jsx";

const queryClient = new QueryClient();

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>React Query: Posts</h1>
          <p className="muted">
            Toggle mount/unmount to see caching behavior, and use Refetch to update on demand.
          </p>

          <div className="row">
            <button className="secondary" onClick={() => setShowPosts((p) => !p)}>
              {showPosts ? "Hide Posts (Unmount)" : "Show Posts (Mount)"}
            </button>
          </div>

          <div style={{ marginTop: 16 }}>
            {showPosts ? <PostsComponent /> : <p className="muted">PostsComponent is unmounted.</p>}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
