'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, Copy } from "lucide-react"

export default function PaymentProcessPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black px-4 py-16">
      <div className="mx-auto max-w-xl text-center">

        <h1 className="text-3xl font-bold text-white mb-2">
          Selesaikan Pembayaran
        </h1>
        <p className="text-gray-400 mb-8">
          Scan QR Code di bawah menggunakan aplikasi pembayaran Anda
        </p>

        {/* QR CARD */}
        <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-[#1a002e] to-black p-6 mb-6">
          <Image
            src="/qrcodedummy.png"
            alt="QRIS"
            width={240}
            height={240}
            className="mx-auto mb-6 rounded-xl bg-white p-4"
          />

          <p className="text-sm text-gray-400">Total Pembayaran</p>
          <p className="text-2xl font-bold text-white mb-4">Rp 48.000</p>

          <div className="flex items-center justify-between rounded-xl border border-purple-500/40 px-4 py-3 text-sm text-white">
            <span>ID Transaksi</span>
            <span className="flex items-center gap-2">
              TXN-20240115-987654321
              <Copy size={14} />
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-8">
          <Lock size={16} />
          Pembayaran aman & terenkripsi
        </div>

        {/* ACTION */}
        <button
          onClick={() => router.push("../methodpayment/success")}
          className="w-full rounded-xl bg-green-500 py-4 font-semibold text-black hover:bg-green-400 transition"
        >
          Saya Sudah Bayar
        </button>
      </div>
    </main>
  )
}
