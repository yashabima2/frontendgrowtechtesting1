'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import BannerCarousel from "../components/customer/BannerCarousel"

const normalizeSettings = (rows = []) =>
  rows.reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})

export default function HomePage() {
  const API = process.env.NEXT_PUBLIC_API_URL
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
    <main className="home-wrapper">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            {brand.site_name|| "Growtech Central"}
            <br />
            <span>{brand.home_subtitle || "Toko Digital Terpercaya"}</span>
          </h1>

          {brand.description && <p>{brand.description}</p>}

          <div className="hero-buttons">
            <Link href="/public/product" className="btn-primary">
              Jelajahi Katalog
            </Link>
            <button className="btn-outline">
              Informasi Lebih Lanjut
            </button>
          </div>
        </div>

        <div className="hero-right">
          <Image
            src="/logoherosection.png"
            alt="Growtech Logo"
            width={420}
            height={420}
            priority
          />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-inner">
          <div>
            <h3>10K+</h3>
            <span>Produk Tersedia</span>
          </div>
          <div>
            <h3>100%</h3>
            <span>Aman & Terpercaya</span>
          </div>
          <div>
            <h3>24/7</h3>
            <span>Dukungan Pelanggan</span>
          </div>
        </div>
      </section>

      <BannerCarousel
        banners={bannersFromAPI}
        baseWidth={340}
        autoplay
        loop
      />
    </main>
  )
}
