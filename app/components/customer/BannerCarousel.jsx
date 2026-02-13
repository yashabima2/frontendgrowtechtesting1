'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const GAP = 24
const SPRING = { type: 'spring', stiffness: 260, damping: 30 }
const VELOCITY_THRESHOLD = 500
const DRAG_BUFFER = 80

export default function BannerCarousel({
  banners = [],
  baseWidth = 320,
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
  const [animating, setAnimating] = useState(false)

  const x = useMotionValue(0)

  const rotateY = useTransform(
    x,
    [-trackOffset, 0, trackOffset],
    [35, 0, -35]
  )

  // ================= INIT POSITION =================
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

  // ================= HANDLE LOOP =================
  const handleAnimationComplete = () => {
    if (!loop) return setAnimating(false)

    if (position === itemsForRender.length - 1) {
      setJumping(true)
      setPosition(1)
      x.set(-1 * trackOffset)

      requestAnimationFrame(() => {
        setJumping(false)
        setAnimating(false)
      })
      return
    }

    if (position === 0) {
      setJumping(true)
      const target = banners.length
      setPosition(target)
      x.set(-target * trackOffset)

      requestAnimationFrame(() => {
        setJumping(false)
        setAnimating(false)
      })
      return
    }

    setAnimating(false)
  }

  // ================= DRAG END =================
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
    <section className="relative w-full overflow-hidden py-20">

      <div
        className="relative"
        onMouseEnter={() => pauseOnHover && setHovered(true)}
        onMouseLeave={() => pauseOnHover && setHovered(false)}
      >
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackOffset) }}
          transition={jumping ? { duration: 0 } : SPRING}
          style={{
            gap: GAP,
            perspective: 1200,
            x,
          }}
          onAnimationStart={() => setAnimating(true)}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((banner, i) => (
            <motion.div
              key={banner.id + '-' + i}
              className="relative shrink-0"
              style={{
                width: itemWidth,
                height: 260,
                rotateY,
              }}
            >
              <Link href={banner.link_url || '#'}>
                <Image
                  src={banner.image_url}
                  alt={banner.title || 'Banner'}
                  fill
                  className="object-cover rounded-xl"
                  unoptimized
                  priority
                />
              </Link>

              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-400/10 rounded-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* INDICATORS */}
        <div className="flex justify-center mt-8 gap-3">
          {banners.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setPosition(loop ? i + 1 : i)}
              animate={{
                scale: activeIndex === i ? 1.4 : 1,
                opacity: activeIndex === i ? 1 : 0.4,
              }}
              className={`h-2 rounded-full transition-all ${
                activeIndex === i
                  ? 'w-6 bg-purple-500'
                  : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
