'use client'

import { CheckCircle, Clock, Eye, X } from "lucide-react"
import { cn } from "../../../lib/utils"

const statusConfig = {
  berhasil: {
    label: "Berhasil",
    icon: CheckCircle,
    bg: "bg-[#1a3d2e]",
    border: "border-[#2d5e4b]",
    iconColor: "text-green-400",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-[#2d1b4e]",
    border: "border-[#3d2b5e]",
    iconColor: "text-purple-400",
  },
  proses: {
    label: "Proses",
    icon: Eye,
    bg: "bg-[#2d1b4e]",
    border: "border-[#3d2b5e]",
    iconColor: "text-purple-400",
  },
  gagal: {
    label: "Gagal",
    icon: X,
    bg: "bg-[#3d1a1a]",
    border: "border-[#5e2d2d]",
    iconColor: "text-red-400",
  },
}

export default function TransactionCard({
  count,
  amount,
  status,
}) {
  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border p-4",
        config.bg,
        config.border
      )}
    >
      <div className="space-y-1">
        <p className="text-lg font-bold text-white">{count}</p>
        <p className="text-base font-semibold text-white">{amount}</p>
        <p className="text-xs text-gray-400">{config.label}</p>
      </div>

      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center",
          config.iconColor
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
    </div>
  )
}
