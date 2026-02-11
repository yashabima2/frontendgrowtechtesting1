'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { motion } from "framer-motion";
// import { supabase } from '../../lib/supabaseClient'

const API = process.env.NEXT_PUBLIC_API_URL
// const SUPABASE_BUCKET = 'subcategories'

export default function SubKategoriPage() {

  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('create')
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [preview, setPreview] = useState(null)

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

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

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

  // ================= HANDLE IMAGE UPLOAD =================
  const handleImageUpload = async (file) => {

    if (!file) return;

    const token = Cookies.get('token');

    const slug = generateSlug(form.name || 'logo');
    const ext = file.name.split('.').pop();
    const fileName = `${slug}-${Date.now()}.${ext}`;

    // 1️⃣ Minta signed URL ke backend
    const signRes = await fetch(
      `${API}/api/v1/admin/subcategories/logo/sign`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: fileName
        })
      }
    );

    const signJson = await signRes.json();

    if (!signJson.success) {
      alert('Gagal generate signed URL');
      return;
    }

    const { signedUrl, path, publicUrl } = signJson.data;

    // 2️⃣ Upload ke Supabase pakai signed URL
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });

    if (!uploadRes.ok) {
      alert('Upload gagal');
      return;
    }

    // 3️⃣ Set ke form
    setForm(prev => ({
      ...prev,
      image_url: publicUrl,
      image_path: path
    }));

    setPreview(publicUrl);
  };


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
      alert('Gagal menyimpan')
    }

    setSubmitting(false)
  }

  const handleDelete = async () => {
    setSubmitting(true)

    await fetch(`${API}/api/v1/admin/subcategories/${selected.id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })

    fetchAll()
    closeModal()
    setSubmitting(false)
  }

  const openCreate = () => {
    setMode('create')
    setPreview(null)
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
    setPreview(item.image_url)
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

  const closeModal = () => {
    setShowModal(false)
    setSelected(null)
    setMode('create')
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Manajemen Sub Kategori
      </h1>

      <motion.div
        className="
          rounded-2xl
          border border-purple-600/60
          bg-black
          p-6
          shadow-[0_0_25px_rgba(168,85,247,0.15)]
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-end mb-4">
          <button className="btn-add" onClick={openCreate}>
            + Tambah
          </button>
        </div>

        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-white/10">
              <th>ID</th>
              <th>Logo</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Provider</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {item.image_url && (
                    <Image src={item.image_url} width={40} height={40} alt="" />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.category?.name}</td>
                <td>{item.provider}</td>
                <td className="space-x-2">
                  <button onClick={() => openEdit(item)} className="btn-edit-sm">Edit</button>
                  <button onClick={() => setSelected(item)} className="btn-delete-sm">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="w-full max-w-md bg-black p-6 rounded-2xl border border-purple-600/60">

            <form onSubmit={handleSubmit}>
              <select
                className="input-primary mb-3"
                value={form.category_id}
                onChange={e => setForm({ ...form, category_id: e.target.value })}
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input
                className="input-primary mb-3"
                placeholder="Nama"
                value={form.name}
                onChange={e => {
                  const name = e.target.value
                  setForm({
                    ...form,
                    name,
                    slug: generateSlug(name)
                  })
                }}
                required
              />

              <input
                className="input-primary mb-3"
                placeholder="Slug"
                value={form.slug}
                readOnly
              />

              <input
                className="input-primary mb-3"
                placeholder="Provider"
                value={form.provider}
                onChange={e => setForm({ ...form, provider: e.target.value })}
              />

              <input
                type="file"
                className="mb-3"
                accept="image/*"
                onChange={e => handleImageUpload(e.target.files[0])}
              />

              {preview && (
                <div className="mb-3">
                  <Image src={preview} width={80} height={80} alt="preview" />
                </div>
              )}

              <button className="btn-add w-full" disabled={submitting}>
                {submitting ? 'Menyimpan...' : 'Simpan'}
              </button>

            </form>

          </div>
        </div>
      )}
    </div>
  )
}
