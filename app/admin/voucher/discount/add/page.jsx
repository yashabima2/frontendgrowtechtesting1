'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function AddDiscountPage() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    discount_type: 'percent',
    discount_value: '',
    starts_at: '',
    ends_at: '',
    enabled: true,
  })

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API}/api/v1/admin/discount-campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()

      router.push('/admin/voucher/discount')
    } catch {
      alert('Gagal menambahkan discount')
    }
  }

  return (
    <div className="p-10 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">Tambah Discount</h1>

      <div className="border border-purple-700 rounded-2xl p-8 bg-black/60">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm text-gray-400">Nama Discount</label>
            <input
              className="input w-full"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Nilai Discount</label>
            <input
              className="input w-full"
              onChange={e =>
                setForm({ ...form, discount_value: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Tipe</label>
            <select
              className="input w-full"
              onChange={e =>
                setForm({ ...form, discount_type: e.target.value })
              }
            >
              <option value="percent">Percent</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Tanggal Mulai</label>
            <input
              type="datetime-local"
              className="input w-full"
              onChange={e => setForm({ ...form, starts_at: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Tanggal Selesai</label>
            <input
              type="datetime-local"
              className="input w-full"
              onChange={e => setForm({ ...form, ends_at: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleSubmit} className="btn-primary">
            Tambah Discount
          </button>
        </div>
      </div>
    </div>
  )
}
