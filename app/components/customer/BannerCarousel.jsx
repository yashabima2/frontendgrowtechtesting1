'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const GAP = 28
const SPRING = { type: 'spring', stiffness: 220, damping: 26 }
const DRAG_BUFFER = 80
const VELOCITY_THRESHOLD = 500

export default function BannerCarousel({
  banners = [],
  baseWidth = 360,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
}) {
  const itemWidth = baseWidth
  const trackOffset = itemWidth + GAP

  const itemsForRender = useMemo(() => {
    if (!loop || banners.length === 0) return banners
    return [banners[banners.length - 1], ...banners, banners[0]]
  }, [banners, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const [hovered, setHovered] = useState(false)
  const [jumping, setJumping] = useState(false)

  const x = useMotionValue(0)

  // ================= INIT =================
  useEffect(() => {
    const start = loop ? 1 : 0
    setPosition(start)
    x.set(-start * trackOffset)
  }, [banners.length, loop])

  // ================= AUTOPLAY =================
  useEffect(() => {
    if (!autoplay || banners.length <= 1) return
    if (pauseOnHover && hovered) return

    const timer = setInterval(() => {
      setPosition(prev => prev + 1)
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [hovered, autoplay, autoplayDelay, banners.length])

  // ================= LOOP FIX =================
  const handleAnimationComplete = () => {
    if (!loop) return

    if (position === itemsForRender.length - 1) {
      setJumping(true)
      setPosition(1)
      x.set(-1 * trackOffset)

      requestAnimationFrame(() => setJumping(false))
    }

    if (position === 0) {
      setJumping(true)
      const target = banners.length
      setPosition(target)
      x.set(-target * trackOffset)

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

  const activeIndex = loop
    ? (position - 1 + banners.length) % banners.length
    : position

  if (!banners.length) return null

  return (
    <section className="relative w-full overflow-hidden py-24">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)]" />

      <div
        className="relative"
        onMouseEnter={() => pauseOnHover && setHovered(true)}
        onMouseLeave={() => pauseOnHover && setHovered(false)}
      >
        <motion.div
          className="flex justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackOffset) }}
          transition={jumping ? { duration: 0 } : SPRING}
          style={{
            gap: GAP,
            x,
            perspective: 1600,
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((banner, i) => {
            const isActive =
              (loop ? i - 1 : i) === activeIndex

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
                  rotateY: isActive ? 0 : i < position ? 18 : -18,
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

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-purple-500/10" />

                    {/* Soft glow */}
                    <div className="absolute inset-0 shadow-[0_0_40px_rgba(168,85,247,0.25)]" />

                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

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
