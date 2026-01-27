'use client'

import { cn } from "../../../lib/utils"

const variantStyles = {
  default: "bg-[#2d1b4e] border-[#3d2b5e]",
  success: "bg-[#1a3d2e] border-[#2d5e4b]",
  warning: "bg-[#3d3d1a] border-[#5e5e2d]",
  info: "bg-[#1a2d3d] border-[#2d4b5e]",
  danger: "bg-[#3d1a1a] border-[#5e2d2d]",
}

export default function StatCard({
  title,
  value,
  label,
  icon: Icon,
  variant = "default",
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border p-4",
        variantStyles[variant] || variantStyles.default
      )}
    >
      <div className="space-y-1">
        <p className="text-lg font-bold text-white">{title}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
        {Icon && <Icon className="h-5 w-5 text-white" />}
      </div>
    </div>
  )
}
