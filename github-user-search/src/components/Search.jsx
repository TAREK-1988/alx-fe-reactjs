import { useMemo, useState } from "react"
import { fetchUserData, fetchUsersDetailsBatch, searchUsersAdvanced } from "../services/githubService.js"

export default function Search() {
  const [mode, setMode] = useState("basic")

  const [username, setUsername] = useState("")
  const [location, setLocation] = useState("")
  const [minRepos, setMinRepos] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [basicUser, setBasicUser] = useState(null)
  const [advancedUsers, setAdvancedUsers] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const perPage = 10

  const canSubmit = useMemo(() => {
    if (mode === "basic") return username.trim().length > 0
    return (
      username.trim().length > 0 ||
      location.trim().length > 0 ||
      (minRepos.trim().length > 0 && !Number.isNaN(Number(minRepos.trim())))
    )
  }, [mode, username, location, minRepos])

  async function onSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setError("")
    setBasicUser(null)
    setAdvancedUsers([])
    setPage(1)
    setHasMore(false)

    try {
      if (mode === "basic") {
        const data = await fetchUserData(username)
        setBasicUser(data)
      } else {
        const data = await searchUsersAdvanced({
          username,
          location,
          minRepos,
          page: 1,
          perPage
        })
        const items = Array.isArray(data.items) ? data.items : []
        const details = await fetchUsersDetailsBatch(items)
        setAdvancedUsers(details)
        setHasMore(items.length === perPage)
      }
    } catch {
      setError("Looks like we cant find the user")
    } finally {
      setLoading(false)
    }
  }

  async function loadMore() {
    if (loading) return
    const next = page + 1
    setLoading(true)
    setError("")

    try {
      const data = await searchUsersAdvanced({
        username,
        location,
        minRepos,
        page: next,
        perPage
      })
      const items = Array.isArray(data.items) ? data.items : []
      const details = await fetchUsersDetailsBatch(items)
      setAdvancedUsers((prev) => [...prev, ...details])
      setPage(next)
      setHasMore(items.length === perPage)
    } catch {
      setError("Looks like we cant find the user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Search</h2>
          <div className="flex rounded-lg border p-1">
            <button
              type="button"
              className={`rounded-md px-3 py-1 text-sm ${
                mode === "basic" ? "bg-slate-900 text-white" : "text-slate-700"
              }`}
              onClick={() => setMode("basic")}
            >
              Basic
            </button>
            <button
              type="button"
              className={`rounded-md px-3 py-1 text-sm ${
                mode === "advanced" ? "bg-slate-900 text-white" : "text-slate-700"
              }`}
              onClick={() => setMode("advanced")}
            >
              Advanced
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-slate-700">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="e.g. octocat"
              />
            </div>

            {mode === "advanced" && (
              <div className="grid gap-1">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="e.g. Egypt"
                />
              </div>
            )}
          </div>

          {mode === "advanced" && (
            <div className="grid gap-1 sm:max-w-xs">
              <label className="text-sm font-medium text-slate-700">Min Repositories</label>
              <input
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="e.g. 10"
                inputMode="numeric"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Search
            </button>

            {loading && <div className="text-sm text-slate-700">Loading...</div>}

            {error && !loading && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </form>
      </div>

      {basicUser && (
        <div className="rounded-xl border bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              src={basicUser.avatar_url}
              alt={basicUser.login}
              className="h-20 w-20 rounded-full border object-cover"
            />
            <div className="flex-1">
              <div className="text-lg font-semibold">{basicUser.name || basicUser.login}</div>
              <div className="text-sm text-slate-600">{basicUser.bio || ""}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-700">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Repos: {basicUser.public_repos ?? 0}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Location: {basicUser.location || "N/A"}
                </span>
              </div>
            </div>
            <a
              href={basicUser.html_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              View Profile
            </a>
          </div>
        </div>
      )}

      {mode === "advanced" && advancedUsers.length > 0 && (
        <div className="space-y-3">
          <div className="rounded-xl border bg-white p-4">
            <div className="text-sm text-slate-600">
              Showing {advancedUsers.length} result{advancedUsers.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {advancedUsers.map((u) => (
              <div key={u.id} className="rounded-xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <img src={u.avatar_url} alt={u.login} className="h-12 w-12 rounded-full border" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{u.name || u.login}</div>
                    <div className="truncate text-sm text-slate-600">{u.login}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                  <span className="rounded-full bg-slate-100 px-3 py-1">Repos: {u.public_repos ?? 0}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    Location: {u.location || "N/A"}
                  </span>
                </div>

                <div className="mt-4">
                  <a
                    href={u.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="rounded-lg border bg-white px-5 py-2 text-sm font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
