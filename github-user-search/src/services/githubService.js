import axios from "axios"

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json"
  }
})

const token = import.meta.env.VITE_APP_GITHUB_API_KEY

if (token && token.trim().length > 0) {
  api.defaults.headers.common.Authorization = `Bearer ${token.trim()}`
}

export async function fetchUserData(username) {
  const value = (username || "").trim()
  if (!value) {
    throw new Error("username_required")
  }
  const res = await api.get(`/users/${encodeURIComponent(value)}`)
  return res.data
}

export async function searchUsersAdvanced({ username, location, minRepos, page, perPage }) {
  const u = (username || "").trim()
  const l = (location || "").trim()
  const r = String(minRepos ?? "").trim()

  const parts = []
  if (u) parts.push(u)
  if (l) parts.push(`location:${l}`)
  if (r && !Number.isNaN(Number(r))) parts.push(`repos:>=${Number(r)}`)

  const q = parts.join(" ").trim()
  if (!q) {
    throw new Error("query_required")
  }

  const params = new URLSearchParams()
  params.set("q", q)
  params.set("page", String(page || 1))
  params.set("per_page", String(perPage || 10))

  const res = await api.get(`/search/users?${params.toString()}`)
  return res.data
}

export async function fetchUsersDetailsBatch(users) {
  const items = Array.isArray(users) ? users : []
  const requests = items.map((u) => api.get(`/users/${encodeURIComponent(u.login)}`))
  const results = await Promise.allSettled(requests)
  return results
    .map((r) => (r.status === "fulfilled" ? r.value.data : null))
    .filter(Boolean)
}
