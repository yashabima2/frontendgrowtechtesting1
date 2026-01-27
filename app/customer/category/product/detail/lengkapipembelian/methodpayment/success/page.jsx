'use client'

import { CheckCircle, Copy } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-20">
      <div className="mx-auto max-w-5xl">

        {/* SUCCESS CARD */}
        <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-[#1a002e] to-black p-10 text-center mb-10">
          <CheckCircle className="mx-auto mb-4 text-green-400" size={64} />
          <h1 className="text-4xl font-bold text-white mb-2">
            Pembayaran Berhasil
          </h1>
          <p className="text-gray-300">
            Terima kasih atas pembelian Anda. Produk akan segera dikirim ke email Anda.
          </p>
        </div>

        {/* DETAIL */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* LEFT */}
          <InfoCard title="Informasi Pemesanan">
            <InfoRow label="Nomor Pemesanan">
              <span className="flex items-center gap-2">
                GTC-2024-001452 <Copy size={14} />
              </span>
            </InfoRow>
            <InfoRow label="Tanggal Pemesanan" value="1/1/2026" />
            <InfoRow label="Waktu Pemesanan" value="11:01:44 WIB" />
            <InfoRow label="ID Transaksi" value="TXN-20240115-987654321" />
            <InfoRow label="Metode Pembayaran" value="QRIS" />
          </InfoCard>

          {/* RIGHT */}
          <InfoCard title="Informasi Produk">
            <InfoRow label="Produk" value="Red Finger VIP 7D Android 15/12/10 (2x)" />
            <InfoRow label="Sub Total" value="Rp 48.000" />
            <InfoRow label="Total" value="Rp 48.000" />
            <InfoRow label="Email Penerima" value="user@email.com" />

            <div className="mt-4 rounded-xl bg-green-600/20 p-3 text-sm text-green-400">
              ✓ Produk digital akan otomatis dikirim setelah verifikasi pembayaran
            </div>
          </InfoCard>
        </div>

        {/* ACTION */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/orders"
            className="rounded-xl bg-purple-700 py-4 text-center font-semibold text-white hover:bg-purple-600"
          >
            Lihat Semua Pemesanan
          </Link>
          <Link
            href="./invoice"
            className="rounded-xl border border-purple-500 py-4 text-center font-semibold text-white hover:bg-purple-500/10"
          >
            Lihat Detail Produk
          </Link>
        </div>

      </div>
    </main>
  )
}

/* ===== COMPONENTS ===== */

function Step({ done, label, title }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="text-green-400" />
      <div>
        <p className="text-sm text-purple-400">{label}</p>
        <p className="font-semibold">{title}</p>
      </div>
    </div>
  )
}

function Divider() {
  return <div className="flex-1 mx-4 h-1 rounded-full bg-green-400" />
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-[#1a002e] to-black p-6 text-white">
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
      <div className="space-y-3 text-sm text-gray-300">{children}</div>
    </div>
  )
}

function InfoRow({ label, value, children }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span className="text-white">{value || children}</span>
    </div>
  )
}
