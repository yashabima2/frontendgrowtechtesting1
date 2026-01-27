'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Clock,
  Download
} from "lucide-react"

export default function InvoicePage() {
  const { invoiceId } = useParams()

  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [expired, setExpired] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 menit

  const STORAGE_KEY = `invoice-onetime-${invoiceId}`

  /* ===== ONE TIME VIEW CHECK ===== */
  useEffect(() => {
    const used = localStorage.getItem(STORAGE_KEY)
    if (used === "used") {
      setRevealed(true)
      setExpired(true)
    }
  }, [])

  /* ===== TIMER ===== */
  useEffect(() => {
    if (expired || !revealed) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setExpired(true)
          localStorage.setItem(STORAGE_KEY, "used")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [revealed, expired])

  const revealCredential = () => {
    setRevealed(true)
  }

  const copyCredential = () => {
    navigator.clipboard.writeText("asd-fgh-jkl")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-black px-4 py-16">
      <div className="mx-auto max-w-4xl text-white">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Invoice {invoiceId}
        </h1>

        {/* INFO CARD */}
        <Card>
          <Info label="Nomor Invoice" value={invoiceId} />
          <Info label="Order Dibuat" value="20 December 2024" />
          <Info label="Status Pesanan">
            <span className="flex items-center gap-2 text-green-400">
              <CheckCircle size={16} /> Completed
            </span>
          </Info>
        </Card>

        {/* DETAIL PESANAN */}
        <Card title="Detail Pesanan">
          <Info label="Nama Produk" value="VIP 7D Android 15/12/10" />
          <Info label="Tier" value="Member" />
          <Info label="Harga" value="Rp 50.000" />
          <Info label="Metode Pembayaran">
            <span className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Saldo Wallet
            </span>
          </Info>
        </Card>

        {/* AKSES PRODUK DIGITAL */}
        <Card title="Akses Produk Digital">
          <p className="mb-4 text-sm text-gray-300">
            Kredensial hanya bisa dilihat <b>1 kali</b> dan akan kadaluarsa otomatis.
          </p>

          {!revealed && (
            <button
              onClick={revealCredential}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500 py-3 hover:bg-purple-500/10"
            >
              <Eye size={18} />
              Tampilkan Kredensial (One Time View)
            </button>
          )}

          {revealed && (
            <div className="rounded-xl border border-purple-500/40 bg-purple-900/30 p-4">

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-gray-300">Data Produk</span>
                {!expired && (
                  <span className="flex items-center gap-1 text-xs text-yellow-400">
                    <Clock size={14} />
                    {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-lg bg-black px-4 py-3">
                <span className="font-mono text-lg">
                  {expired ? "••••-••••-••••" : "asd-fgh-jkl"}
                </span>

                {!expired && (
                  <button onClick={copyCredential}>
                    <Copy size={18} />
                  </button>
                )}
              </div>

              {copied && (
                <p className="mt-2 text-sm text-green-400">
                  ✓ Berhasil dicopy!
                </p>
              )}

              {expired && (
                <p className="mt-2 text-sm text-red-400">
                  Kredensial sudah tidak dapat diakses kembali
                </p>
              )}

              <button
                disabled={expired}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3 disabled:opacity-40"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          )}
        </Card>

      </div>
    </main>
  )
}

/* ===== COMPONENTS ===== */

function Card({ title, children }) {
  return (
    <div className="mb-6 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-[#1a002e] to-black p-6">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  )
}

function Info({ label, value, children }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span>{value || children}</span>
    </div>
  )
}
