import { useQuery } from "react-query";
import { useState } from "react";

async function fetchPosts(page) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery(["posts", page], () => fetchPosts(page), {
    staleTime: 30000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
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

        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
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
          Prev
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
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
          Next
        </button>

        <span style={{ opacity: 0.8 }}>Page: {page}</span>
        <span style={{ opacity: 0.8 }}>{isFetching ? "Updating..." : "Cached data enabled"}</span>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "crimson" }}>{error?.message}</p>}

      {Array.isArray(data) && (
        <ul style={{ marginTop: 16, paddingLeft: 18 }}>
          {data.map((post) => (
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
