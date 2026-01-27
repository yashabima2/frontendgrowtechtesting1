'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

const normalizeSettings = (rows = []) =>
  rows.reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})

export default function Footer() {
  const API = process.env.NEXT_PUBLIC_API_URL

  const [brand, setBrand] = useState({})
  const [footer, setFooter] = useState({})

  useEffect(() => {
    fetch(`${API}/api/v1/content/settings?group=website`)
      .then(res => res.json())
      .then(res => {
        const data = normalizeSettings(res?.data)
        setBrand(data.brand || {})
        setFooter(data.footer || {})
      })
      .catch(console.error)
  }, [API])

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* LEFT */}
        <div className="footer-left">
          <h3>{brand.site_name || "Growtech Central"}</h3>

          {footer.footer_desc && <p>{footer.footer_desc}</p>}
          {brand.version && <p>{brand.version}</p>}
        </div>

        {/* RIGHT */}
        <div className="footer-links">
          <div>
            <h4>Informasi Kami</h4>
            <Link href="/customer/faq">FAQ</Link>
            <Link href="/customer/contact">Contact Us</Link>
            <Link href="/customer/terms">Ketentuan Layanan</Link>
            <Link href="/customer/privacy">Kebijakan Privasi</Link>
          </div>

          <div>
            <h4>Kontak</h4>

            {brand.phone && (
              <a href={brand.phone} target="_blank">
                {brand.phone}
              </a>
            )}

            {brand.email && (
              <a href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  )
}
