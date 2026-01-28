import axios from "axios"

const api = axios.create({
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
  const res = await api.get(`https://api.github.com/users/${encodeURIComponent(value)}`)
  return res.data
}

export async function fetchAdvancedUsers({ username, location, minRepos, page = 1, perPage = 10 }) {
  const u = (username || "").trim()
  const l = (location || "").trim()
  const r = String(minRepos ?? "").trim()

  const parts = []
  if (u) parts.push(u)
  if (l) parts.push(`location:${l}`)
  if (r && !Number.isNaN(Number(r))) parts.push(`repos:>=${Number(r)}`)

  const query = parts.join(" ").trim()
  if (!query) {
    throw new Error("query_required")
  }

  const q = encodeURIComponent(query)
  const url = `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${perPage}`
  const res = await api.get(url)
  return res.data
}

export async function fetchUsersDetails(users) {
  const items = Array.isArray(users) ? users : []
  const requests = items.map((u) => api.get(`https://api.github.com/users/${encodeURIComponent(u.login)}`))
  const results = await Promise.allSettled(requests)
  return results
    .map((r) => (r.status === "fulfilled" ? r.value.data : null))
    .filter(Boolean)
}
