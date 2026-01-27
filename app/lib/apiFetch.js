import Cookies from "js-cookie"

export async function apiFetch(url, options = {}) {
  const token = Cookies.get("token")

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}${url}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    }
  )

  const json = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(json?.message || `HTTP ${res.status}`)
  }

  return json
}
