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
    isFetching,
    isError,
    error,
    refetch,
    dataUpdatedAt
  } = useQuery(["posts"], fetchPosts, {
    staleTime: 30_000,
    cacheTime: 5 * 60_000,
    refetchOnWindowFocus: false
  });

  return (
    <div>
      <div className="row">
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refetching..." : "Refetch"}
        </button>
        <span className="muted">
          {dataUpdatedAt ? `Last updated: ${new Date(dataUpdatedAt).toLocaleTimeString()}` : ""}
        </span>
      </div>

      {isLoading && <p className="muted">Loading...</p>}
      {isError && <p className="error">{error?.message || "Error"}</p>}

      {Array.isArray(data) && (
        <div className="list">
          {data.slice(0, 12).map((p) => (
            <div className="post" key={p.id}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                #{p.id} — {p.title}
              </div>
              <div className="muted">{p.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
