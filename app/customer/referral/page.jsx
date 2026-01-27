'use client'

import { useState } from "react"
import {
  Copy,
  Search,
  Calendar,
  CheckCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

/* ================= DUMMY DATA ================= */

const STATS = [
  { label: "Kode Referral", value: "REF-USER123" },
  { label: "Total Referral", value: "8 User" },
  { label: "Total Omzet", value: "Rp 400.000" },
  { label: "Omzet Rate", value: "10%" },
]

const OMZET_HARIAN = [
  { date: "11/12", value: 180 },
  { date: "12/12", value: 140 },
  { date: "13/12", value: 200 },
  { date: "14/12", value: 300 },
  { date: "15/12", value: 170 },
  { date: "16/12", value: 120 },
  { date: "17/12", value: 190 },
]

const OMZET_BULANAN = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 320 },
  { month: "Mar", value: 350 },
  { month: "Apr", value: 90 },
  { month: "Mei", value: 320 },
  { month: "Jun", value: 350 },
  { month: "Jul", value: 90 },
  { month: "Agu", value: 320 },
  { month: "Sep", value: 350 },
  { month: "Okt", value: 90 },
  { month: "Nov", value: 320 },
  { month: "Des", value: 350 },
]

const REFERRAL_HISTORY = [
  { user: "User 1", email: "user1@gmail.com", status: "Pending", komisi: "Rp 100.000", tanggal: "20-12-2025" },
  { user: "User 2", email: "user2@gmail.com", status: "Valid", komisi: "Rp 100.000", tanggal: "20-12-2025" },
  { user: "User 3", email: "user3@gmail.com", status: "Valid", komisi: "Rp 50.000", tanggal: "20-12-2025" },
  { user: "User 4", email: "user4@gmail.com", status: "Valid", komisi: "Rp 50.000", tanggal: "20-12-2025" },
  { user: "User 5", email: "user5@gmail.com", status: "Valid", komisi: "Rp 80.000", tanggal: "20-12-2025" },
  { user: "User 6", email: "user6@gmail.com", status: "Valid", komisi: "Rp 20.000", tanggal: "20-12-2025" },
  { user: "User 7", email: "user7@gmail.com", status: "Valid", komisi: "Rp 40.000", tanggal: "20-12-2025" },
  { user: "User 8", email: "user8@gmail.com", status: "Valid", komisi: "Rp 60.000", tanggal: "20-12-2025" },
]

/* ================= PAGE ================= */

export default function ReferralPage() {
  const [tab, setTab] = useState("harian")

  return (
    <section className="max-w-7xl mx-auto px-8 py-10 text-white">

      <h1 className="text-3xl font-bold mb-8">Referral</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-purple-700 bg-black p-4"
          >
            <p className="text-sm text-gray-400">{s.label}</p>
            <p className="text-lg font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ================= KODE REFERRAL ================= */}
      <Card>
        <h3 className="font-semibold mb-4">Kode Referral</h3>

        <p className="text-sm text-gray-400 mb-1">Kode Referral Anda</p>
        <div className="flex gap-2 mb-4">
          <input
            readOnly
            value="REF-USER123"
            className="flex-1 rounded-lg bg-purple-900/40 border border-purple-700 px-4 py-2"
          />
          <button className="rounded-lg bg-purple-700 px-4">
            Update
          </button>
          <button className="rounded-lg border border-purple-700 px-3">
            <Copy size={16} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-1">Link Kode Referral</p>
        <div className="flex gap-2">
          <input
            readOnly
            value="https://growtechcentral.site?ref=REF-USER123"
            className="flex-1 rounded-lg bg-purple-900/40 border border-purple-700 px-4 py-2"
          />
          <button className="rounded-lg border border-purple-700 px-3">
            <Copy size={16} />
          </button>
        </div>
      </Card>

      {/* ================= GUNAKAN KODE ================= */}
      <Card className="mt-6">
        <h3 className="font-semibold mb-2">Gunakan Kode Referral</h3>
        <p className="text-sm text-gray-400 mb-4">
          Masukkan kode referral dari teman untuk mendapatkan bonus
        </p>

        <div className="flex gap-2 mb-3">
          <input
            placeholder="Contoh: REF-TEMAN123"
            className="flex-1 rounded-lg bg-purple-900/40 border border-purple-700 px-4 py-2"
          />
          <button className="rounded-lg bg-purple-700 px-4">
            Gunakan Kode
          </button>
        </div>

        <div className="text-sm text-gray-400 flex gap-6">
          <span>Kode Digunakan: <b>REF-FAREL123</b></span>
          <span>Bonus Diterima: <b>Rp 10.000</b></span>
          <span>Email Pemilik: <b>frel013@gmail.com</b></span>
        </div>
      </Card>

      {/* ================= OMZET ================= */}
      <div className="flex gap-3 mt-10 mb-4">
        <button
          onClick={() => setTab("harian")}
          className={`px-4 py-2 rounded-lg border ${
            tab === "harian"
              ? "bg-purple-700 border-purple-700"
              : "border-purple-700"
          }`}
        >
          Omzet Harian
        </button>
        <button
          onClick={() => setTab("bulanan")}
          className={`px-4 py-2 rounded-lg border ${
            tab === "bulanan"
              ? "bg-purple-700 border-purple-700"
              : "border-purple-700"
          }`}
        >
          Omzet Bulanan
        </button>
      </div>

      <Card>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {tab === "harian" ? (
              <LineChart data={OMZET_HARIAN}>
                <XAxis dataKey="date" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={OMZET_BULANAN}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="value" fill="#ffffff" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ================= TABEL BULANAN ================= */}
      <Card className="mt-6">
        <table className="w-full text-sm">
          <thead className="border-b border-purple-700 text-gray-400">
            <tr>
              <th className="py-3 text-left">Bulan</th>
              <th className="text-left">Omzet</th>
              <th className="text-left">Pesanan</th>
            </tr>
          </thead>
          <tbody>
            {OMZET_BULANAN.map((b) => (
              <tr key={b.month} className="border-b border-purple-800/40">
                <td className="py-3">{b.month}</td>
                <td>Rp 100.000</td>
                <td>2</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ================= RIWAYAT REFERRAL ================= */}
      <Card className="mt-10">
        <h3 className="font-semibold mb-4">Riwayat Referral Kode Anda</h3>

        <div className="flex gap-3 mb-4">
          <button className="flex items-center gap-2 border border-purple-700 px-3 py-1 rounded-lg">
            Status
          </button>
          <div className="flex items-center gap-2 border border-purple-700 px-3 py-1 rounded-lg flex-1">
            <Search size={16} />
            <input
              placeholder="Cari..."
              className="bg-transparent outline-none w-full"
            />
          </div>
          <button className="flex items-center gap-2 border border-purple-700 px-3 py-1 rounded-lg">
            <Calendar size={16} />
            HH/BB/TTTT
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b border-purple-700 text-gray-400">
            <tr>
              <th className="py-3 text-left">Pengguna</th>
              <th>Email</th>
              <th>Status</th>
              <th>Komisi</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {REFERRAL_HISTORY.map((r, i) => (
              <tr key={i} className="border-b border-purple-800/40">
                <td className="py-3">{r.user}</td>
                <td>{r.email}</td>
                <td
                  className={
                    r.status === "Pending"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {r.status}
                </td>
                <td>{r.komisi}</td>
                <td>{r.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </section>
  )
}

/* ================= COMPONENT ================= */

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-purple-700 bg-black p-6 ${className}`}>
      {children}
    </div>
  )
}
