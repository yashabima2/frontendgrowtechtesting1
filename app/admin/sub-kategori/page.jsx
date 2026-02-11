'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { motion } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL

export default function SubKategoriPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('create')
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    category_id: '',
    name: '',
    slug: '',
    provider: '',
    image_url: '',
    image_path: '',
    is_active: true,
    sort_order: 1
  })

  const authHeaders = () => {
    const token = Cookies.get('token')
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // ================= FETCH =================
  const fetchAll = async () => {
    setLoading(true)

    const [subRes, catRes] = await Promise.all([
      fetch(`${API}/api/v1/admin/subcategories`, { headers: authHeaders() }),
      fetch(`${API}/api/v1/admin/categories`, { headers: authHeaders() })
    ])

    const subJson = await subRes.json()
    const catJson = await catRes.json()

    setItems(subJson.data || [])
    setCategories(catJson.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const url =
      mode === 'edit'
        ? `${API}/api/v1/admin/subcategories/${selected.id}`
        : `${API}/api/v1/admin/subcategories`

    const method = mode === 'edit' ? 'PATCH' : 'POST'

    const payload = {
      category_id: Number(form.category_id),
      name: form.name,
      slug: form.slug,
      provider: form.provider,
      image_url: form.image_url,
      image_path: form.image_path,
      is_active: form.is_active,
      sort_order: Number(form.sort_order)
    }

    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })

    const json = await res.json()

    if (json.success) {
      fetchAll()
      closeModal()
    } else {
      alert('Gagal menyimpan sub kategori')
    }

    setSubmitting(false)
  }

  // ================= DELETE =================
  const handleDelete = async () => {
    setSubmitting(true)

    const res = await fetch(
      `${API}/api/v1/admin/subcategories/${selected.id}`,
      {
        method: 'DELETE',
        headers: authHeaders()
      }
    )

    const json = await res.json()

    if (json.success) {
      fetchAll()
      closeModal()
    } else {
      alert('Gagal menghapus sub kategori')
    }

    setSubmitting(false)
  }

  // ================= MODAL =================
  const openCreate = () => {
    setMode('create')
    setForm({
      category_id: '',
      name: '',
      slug: '',
      provider: '',
      image_url: '',
      image_path: '',
      is_active: true,
      sort_order: 1
    })
    setShowModal(true)
  }

  const openEdit = (item) => {
    setMode('edit')
    setSelected(item)
    setForm({
      category_id: item.category_id,
      name: item.name,
      slug: item.slug,
      provider: item.provider,
      image_url: item.image_url,
      image_path: item.image_path,
      is_active: item.is_active,
      sort_order: item.sort_order
    })
    setShowModal(true)
  }

  const openDelete = (item) => {
    setMode('delete')
    setSelected(item)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelected(null)
    setMode('create')
  }

  // ================= UI =================
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Manajemen Sub Kategori
      </h1>

      <motion.div
        className="rounded-2xl border border-purple-600/60 bg-black p-6 shadow-[0_0_25px_rgba(168,85,247,0.15)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-end mb-4">
          <button className="btn-add" onClick={openCreate}>
            + Tambah
          </button>
        </div>

        {loading ? (
          <p className="text-purple-300">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10">
                  <th>ID</th>
                  <th>Logo</th>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Provider</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-purple-900/20">
                    <td>{item.id}</td>

                    <td>
                      <div className="w-12 h-12 relative">
                        {item.image_url && (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-contain rounded"
                          />
                        )}
                      </div>
                    </td>

                    <td className="text-white">{item.name}</td>
                    <td>{item.category?.name || '-'}</td>
                    <td>{item.provider}</td>

                    <td>
                      <span className={item.is_active ? 'badge-ready' : 'badge-danger'}>
                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>

                    <td className="space-x-2">
                      <button className="btn-edit-sm" onClick={() => openEdit(item)}>
                        Edit
                      </button>
                      <button className="btn-delete-sm" onClick={() => openDelete(item)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-purple-300">
                      Data kosong
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-2xl border border-purple-600/60 bg-black p-6">

            {mode === 'delete' ? (
              <>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Hapus Sub Kategori
                </h3>
                <p className="text-gray-300 mb-6">
                  Yakin ingin menghapus <b>{selected?.name}</b>?
                </p>

                <div className="flex justify-end gap-2">
                  <button className="btn-cancel" onClick={closeModal}>
                    Batal
                  </button>
                  <button
                    className="btn-delete-sm"
                    onClick={handleDelete}
                    disabled={submitting}
                  >
                    {submitting ? 'Menghapus...' : 'Hapus'}
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {mode === 'edit' ? 'Edit' : 'Tambah'} Sub Kategori
                </h3>

                <select
                  className="input-primary mb-3"
                  value={form.category_id}
                  onChange={e => setForm({ ...form, category_id: e.target.value })}
                  required
                >
                  <option value="">Pilih kategori</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input className="input-primary mb-3" placeholder="Nama"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />

                <input className="input-primary mb-3" placeholder="Slug"
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  required
                />

                <input className="input-primary mb-3" placeholder="Provider"
                  value={form.provider}
                  onChange={e => setForm({ ...form, provider: e.target.value })}
                />

                <input className="input-primary mb-3" placeholder="Image URL"
                  value={form.image_url}
                  onChange={e => setForm({ ...form, image_url: e.target.value })}
                  required
                />

                <input className="input-primary mb-3" placeholder="Image Path"
                  value={form.image_path}
                  onChange={e => setForm({ ...form, image_path: e.target.value })}
                  required
                />

                <input type="number" className="input-primary mb-3"
                  placeholder="Sort Order"
                  value={form.sort_order}
                  onChange={e => setForm({ ...form, sort_order: e.target.value })}
                />

                <label className="flex items-center gap-2 text-sm text-purple-300 mb-4">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={e => setForm({ ...form, is_active: e.target.checked })}
                  />
                  Aktif
                </label>

                <div className="flex justify-end gap-2">
                  <button type="button" className="btn-cancel" onClick={closeModal}>
                    Batal
                  </button>
                  <button type="submit" className="btn-add" disabled={submitting}>
                    {submitting ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
