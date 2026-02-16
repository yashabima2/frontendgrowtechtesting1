// components/admin/modal/AddSaldoModal.jsx
"use client"
import { useState } from "react"
import Modal from "./Modal"

export default function AddSaldoModal({ open, onClose, user }) {
  const [tambah, setTambah] = useState("")

  const total = Number(user?.saldo || 0) + Number(tambah || 0)

  return (
    <Modal open={open} onClose={onClose} title="Tambah Saldo">
      <p className="text-gray-400 mb-4">
        Tambahkan saldo untuk <b>{user?.email}</b>
      </p>

      <div className="space-y-3">
        <input
          disabled
          value={user?.saldo}
          className="w-full bg-purple-900/40 text-white p-2 rounded"
        />

        <input
          placeholder="Masukkan jumlah saldo"
          className="w-full bg-purple-900/40 text-white p-2 rounded"
          onChange={(e) => setTambah(e.target.value)}
        />

        <div className="bg-green-600 text-black p-2 rounded font-semibold">
          Rp {total.toLocaleString()}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="bg-white px-4 py-1 rounded text-black">
          Batal
        </button>
        <button className="bg-purple-600 text-white px-4 py-1 rounded">
          Tambah
        </button>
      </div>
    </Modal>
  )
}
