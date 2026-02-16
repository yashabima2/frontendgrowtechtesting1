'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function EditDiscountPage() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState(null)
  const [subcategories, setSubcategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${API}/api/v1/admin/discount-campaigns/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
      .then(res => res.json())
      .then(json => setForm(json.data))

    fetch(`${API}/api/v1/admin/subcategories`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
      .then(res => res.json())
      .then(json => setSubcategories(json.data || []))

    fetch(`${API}/api/v1/admin/products`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
      .then(res => res.json())
      .then(json => setProducts(json.data || []))
  }, [])

  const addTarget = async (type, targetId) => {
    await fetch(`${API}/api/v1/admin/discount-campaigns/${id}/targets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        targets: [{ type, id: Number(targetId) }],
      }),
    })

    location.reload()
  }

  const removeTarget = async (type, targetId) => {
    await fetch(`${API}/api/v1/admin/discount-campaigns/${id}/targets`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        targets: [{ type, id: Number(targetId) }],
      }),
    })

    location.reload()
  }

  const handleUpdate = async () => {
    const res = await fetch(`${API}/api/v1/admin/discount-campaigns/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) return alert('Gagal update')

    router.push('/admin/voucher/discount')
  }

  if (!form) return <div className="p-10 text-white">Loading...</div>

  return (
    <div className="p-10 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">Edit Discount</h1>

      <div className="grid grid-cols-2 gap-6">
        <Input label="Nama Discount" value={form.name}
          onChange={v => setForm({ ...form, name: v })} />

        <Input label="Discount Value" type="number"
          value={form.discount_value}
          onChange={v => setForm({ ...form, discount_value: Number(v) })} />

        <Input label="Priority" type="number"
          value={form.priority}
          onChange={v => setForm({ ...form, priority: Number(v) })} />

        <Select
          label="Tambah Target Subcategory"
          options={subcategories.map(s => ({ label: s.name, value: s.id }))}
          onChange={v => addTarget('subcategory', v)}
        />

        <Select
          label="Tambah Target Product"
          options={products.map(p => ({ label: p.name, value: p.id }))}
          onChange={v => addTarget('product', v)}
        />

        <div className="col-span-2">
          <p className="text-sm text-purple-300 mb-2">Existing Targets</p>
          {form.targets?.map(t => (
            <div key={`${t.type}-${t.id}`} className="flex justify-between">
              <span>{t.type} #{t.id}</span>
              <button onClick={() => removeTarget(t.type, t.id)}>❌</button>
            </div>
          ))}
        </div>

        <button onClick={handleUpdate} className="btn-primary col-span-2">
          Simpan Perubahan
        </button>
      </div>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input className="input w-full" {...props}
        onChange={e => props.onChange?.(e.target.value)} />
    </div>
  )
}

function Select({ label, options, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <select className="input w-full" onChange={e => onChange(e.target.value)}>
        <option value="">Pilih</option>
        {options.map(o =>
          <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
    </div>
  )
}
