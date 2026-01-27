'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "../../app/hooks/useAuth"

const normalizeSettings = (rows = []) =>
  rows.reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})

export default function Navbar() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const { user, logout } = useAuth()

  const [brand, setBrand] = useState({})

  useEffect(() => {
    fetch(`${API}/api/v1/content/settings?group=website`)
      .then(res => res.json())
      .then(res => {
        const data = normalizeSettings(res?.data)
        setBrand(data.brand || {})
      })
      .catch(console.error)
  }, [API])

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LEFT */}
        <div className="nav-left">
          <Image
            src="/logoherosection.png"
            alt="Growtech"
            width={42}
            height={42}
          />
          <span className="brand-text">
            {brand.site_name || "Growtech Central"}
          </span>
        </div>

        {/* RIGHT */}
        <div className="nav-right flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/product">Product</Link>

          {!user ? (
            <Link href="/login" className="text-purple-300 hover:underline">
              Login
            </Link>
          ) : (
            <>
              <span className="text-sm text-purple-300">{user.name}</span>
              <Link href="/customer" className="text-sm hover:underline">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm text-red-400 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
