'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function VoucherTabs() {
  const pathname = usePathname()

  const isVoucher = pathname === '/admin/voucher'
  const isDiscount = pathname.startsWith('/admin/voucher/discount')

  const base =
    "px-5 py-2 rounded-lg text-sm font-medium transition"

  const active =
    "bg-purple-700 text-white shadow-md"

  const inactive =
    "border border-purple-600 text-gray-300 hover:bg-purple-900/40"

  return (
    <div className="flex gap-3">
      <Link
        href="/admin/voucher"
        className={`${base} ${isVoucher ? active : inactive}`}
      >
        Voucher
      </Link>

      <Link
        href="/admin/voucher/discount"
        className={`${base} ${isDiscount ? active : inactive}`}
      >
        Discount
      </Link>
    </div>
  )
}
