'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function AddDiscountPage() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  const [subcategories, setSubcategories] = useState([])
  const [products, setProducts] = useState([])

  const [form, setForm] = useState({
    name: '',
    enabled: true,
    starts_at: '',
    ends_at: '',
    discount_type: 'percent',
    discount_value: 0,
    min_order_amount: '',
    max_discount_amount: '',
    usage_limit_total: '',
    usage_limit_per_user: '',
    priority: 0,
    stack_policy: 'stackable',
    targets: [],
  })

  useEffect(() => {
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

  const addTarget = (type, id) => {
    if (!id) return
    setForm(prev => ({
      ...prev,
      targets: [...prev.targets, { type, id: Number(id) }],
    }))
  }

  const handleSubmit = async () => {
    const res = await fetch(`${API}/api/v1/admin/discount-campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) return alert('Gagal tambah discount')

    router.push('/admin/voucher/discount')
  }

  return (
    <div className="p-10 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">Tambah Discount</h1>

      <div className="grid grid-cols-2 gap-6">
        <Input label="Nama Discount" onChange={v => setForm({ ...form, name: v })} />
        <Input label="Discount Value" type="number" onChange={v => setForm({ ...form, discount_value: Number(v) })} />
        <Select label="Discount Type" options={['percent', 'amount']} onChange={v => setForm({ ...form, discount_type: v })} />
        <Input label="Priority" type="number" onChange={v => setForm({ ...form, priority: Number(v) })} />
        <Select label="Stack Policy" options={['stackable', 'exclusive']} onChange={v => setForm({ ...form, stack_policy: v })} />

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

        <button onClick={handleSubmit} className="btn-primary col-span-2">
          Simpan Discount
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
