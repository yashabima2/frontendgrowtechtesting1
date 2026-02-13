'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const GAP = 28
const SPRING = { type: 'spring', stiffness: 220, damping: 26 }
const DRAG_BUFFER = 80
const VELOCITY_THRESHOLD = 500

export default function BannerCarousel({
  banners = [],
  baseWidth = 400,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
}) {
  const itemWidth = baseWidth
  const trackOffset = itemWidth + GAP

  // ✅ FIX: Duplikasi jika banner terlalu sedikit
  const extendedBanners = useMemo(() => {
    if (banners.length >= 3) return banners
    return [...banners, ...banners, ...banners]
  }, [banners])

  const itemsForRender = useMemo(() => {
    if (!loop || extendedBanners.length === 0) return extendedBanners
    return [
      extendedBanners[extendedBanners.length - 1],
      ...extendedBanners,
      extendedBanners[0],
    ]
  }, [extendedBanners, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const [hovered, setHovered] = useState(false)
  const [jumping, setJumping] = useState(false)

  // ================= INIT =================
  useEffect(() => {
    const start = loop ? 1 : 0
    setPosition(start)
  }, [extendedBanners.length, loop])

  // ================= AUTOPLAY =================
  useEffect(() => {
    if (!autoplay || extendedBanners.length <= 1) return
    if (pauseOnHover && hovered) return

    const timer = setInterval(() => {
      setPosition(prev => prev + 1)
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [hovered, autoplay, autoplayDelay, extendedBanners.length])

  // ================= LOOP FIX =================
  const handleAnimationComplete = () => {
    if (!loop) return

    if (position === itemsForRender.length - 1) {
      setJumping(true)
      setPosition(1)
      requestAnimationFrame(() => setJumping(false))
    }

    if (position === 0) {
      setJumping(true)
      const target = extendedBanners.length
      setPosition(target)
      requestAnimationFrame(() => setJumping(false))
    }
  }

  // ================= DRAG =================
  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info

    if (offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD) {
      setPosition(prev => prev + 1)
    } else if (offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD) {
      setPosition(prev => prev - 1)
    }
  }

  const activeIndex =
    (position - 1 + extendedBanners.length) % extendedBanners.length

  if (!banners.length) return null

  return (
    <section className="relative w-full overflow-hidden py-24">

      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)]" />

      <div
        className="relative"
        onMouseEnter={() => pauseOnHover && setHovered(true)}
        onMouseLeave={() => pauseOnHover && setHovered(false)}
      >
        {/* ✅ Wrapper center */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: -(position * trackOffset) }}
            transition={jumping ? { duration: 0 } : SPRING}
            style={{ gap: GAP }}
            onAnimationComplete={handleAnimationComplete}
          >
            {itemsForRender.map((banner, i) => {
              const isActive =
                (i - 1 + extendedBanners.length) %
                  extendedBanners.length === activeIndex

              return (
                <motion.div
                  key={banner.id + '-' + i}
                  className="relative shrink-0"
                  animate={{
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                    y: isActive ? 0 : 18,
                  }}
                  transition={{ duration: 0.45 }}
                  style={{
                    width: itemWidth,
                    height: 260,
                  }}
                >
                  <Link href={banner.link_url || '#'}>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">

                      <Image
                        src={banner.image_url}
                        alt={banner.title || 'Banner'}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-purple-500/10" />
                      <div className="absolute inset-0 shadow-[0_0_40px_rgba(168,85,247,0.25)]" />

                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* INDICATORS */}
        <div className="flex justify-center mt-10 gap-3">
          {banners.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setPosition(loop ? i + 1 : i)}
              animate={{
                width: activeIndex === i ? 28 : 10,
                opacity: activeIndex === i ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
              className={`h-[10px] rounded-full ${
                activeIndex === i
                  ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
