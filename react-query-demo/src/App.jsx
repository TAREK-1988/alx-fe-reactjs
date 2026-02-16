import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent.js";

const queryClient = new QueryClient();

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        <h1>React Query Demo</h1>

        <button
          onClick={() => setShowPosts((v) => !v)}
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
          {showPosts ? "Hide Posts (Unmount)" : "Show Posts (Mount)"}
        </button>

        <div style={{ marginTop: 16 }}>
          {showPosts ? (
            <PostsComponent />
          ) : (
            <p>PostsComponent is unmounted. Toggle it back to see cache behavior.</p>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
