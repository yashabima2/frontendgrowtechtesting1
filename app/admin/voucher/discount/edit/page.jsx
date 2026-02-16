'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function EditDiscountPage() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState(null)

  const loadDetail = async () => {
    const res = await fetch(
      `${API}/api/v1/admin/discount-campaigns/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    )

    const json = await res.json()
    setForm(json.data)
  }

  useEffect(() => {
    loadDetail()
  }, [])

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${API}/api/v1/admin/discount-campaigns/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) throw new Error()

      router.push('/admin/voucher/discount')
    } catch {
      alert('Gagal update discount')
    }
  }

  if (!form) return <div className="p-10 text-white">Loading...</div>

  return (
    <div className="p-10 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">Edit Discount</h1>

      <div className="border border-purple-700 rounded-2xl p-8 bg-black/60">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm text-gray-400">Nama Discount</label>
            <input
              className="input w-full"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Nilai Discount</label>
            <input
              className="input w-full"
              value={form.discount_value}
              onChange={e =>
                setForm({ ...form, discount_value: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Tipe</label>
            <select
              className="input w-full"
              value={form.discount_type}
              onChange={e =>
                setForm({ ...form, discount_type: e.target.value })
              }
            >
              <option value="percent">Percent</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleUpdate} className="btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  )
}
