'use client'

import React from "react"
import { cn } from "../../lib/utils"

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  const variants = {
    default: "bg-white text-black hover:bg-gray-200",
    ghost: "bg-transparent hover:bg-white/10 text-white",
    outline: "border border-white/20 text-white hover:bg-white/10",
  }

  const sizes = {
    default: "h-9 px-4 py-2",
    icon: "h-9 w-9 p-0",
    sm: "h-8 px-3",
    lg: "h-10 px-6",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className
      )}
      {...props}
    />
  )
}
