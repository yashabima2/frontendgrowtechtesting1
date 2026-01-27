'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function BannerCarousel() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const [banners, setBanners] = useState([])
  const [index, setIndex] = useState(0)
  const USE_UNOPTIMIZED = true

  useEffect(() => {
    fetch(`${API}/api/v1/content/banners`)
      .then(res => res.json())
      .then(res => {
      const active = (res.data || [])
        .sort((a, b) => a.sort_order - b.sort_order)


        setBanners(active)
      })
      .catch(console.error)
  }, [API])

  useEffect(() => {
    if (banners.length <= 1) return

    const i = setInterval(() => {
      setIndex(prev => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(i)
  }, [banners])

  useEffect(() => {
    setIndex(0)
  }, [banners])


  if (!banners.length) return null

  return (
    <section className="mx-auto max-w-7xl px-8 mt-20">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative w-full h-[260px] md:h-[340px]">
          {banners.map((b, i) => (
            <Link key={b.id} href={b.link_url || '#'}>
              <Image
                src={b.image_url}
                alt={b.title || 'Banner'}
                fill
                priority={i === index}
                unoptimized={USE_UNOPTIMIZED}
                className={`object-cover transition-opacity duration-700 ${
                  i === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? 'bg-purple-400' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
