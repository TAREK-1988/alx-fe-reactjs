import { useQuery } from "react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery(["posts"], fetchPosts, {
    staleTime: 30000,
    cacheTime: 300000,
    refetchOnWindowFocus: false
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            padding: 10,
            borderRadius: 10,
            border: 0,
            background: "#26C281",
            color: "white",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {isFetching ? "Refetching..." : "Refetch Posts"}
        </button>

        <span style={{ opacity: 0.8 }}>
          {isFetching ? "Updating..." : "Cache enabled (staleTime + cacheTime)"}
        </span>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "crimson" }}>{error?.message}</p>}

      {Array.isArray(data) && (
        <ul style={{ marginTop: 16, paddingLeft: 18 }}>
          {data.slice(0, 10).map((post) => (
            <li key={post.id} style={{ marginBottom: 10 }}>
              <b>{post.title}</b>
              <div style={{ opacity: 0.8 }}>{post.body}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
