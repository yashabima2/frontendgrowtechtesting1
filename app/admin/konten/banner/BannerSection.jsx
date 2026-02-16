'use client'

import { useEffect, useState } from 'react'
import SectionCard from '../../../components/admin/SectionCard'
import ActionButtons from '../../../components/admin/ActionButtons'
import StatusBadge from '../../../components/admin/StatusBadge'
import Modal from '../../../components/ui/Modal'
import Cookies from 'js-cookie'

export default function BannerSection() {
  const API = process.env.NEXT_PUBLIC_API_URL

  const [banners, setBanners] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [newImageUploaded, setNewImageUploaded] = useState(false)

  const SUPABASE_PUBLIC_BASE =
    'https://jleoptqwzrkqtklhmpdc.supabase.co/storage/v1/object/public/banners'

  const getBannerImageUrl = (image_path) => {
    if (!image_path) return ''
    return `${SUPABASE_PUBLIC_BASE}/${image_path}`
  }

  const [form, setForm] = useState({
    image_path: '',
    sort_order: 0,
    is_active: true,
    image_url: '',
  })

  /* ================= LOAD ================= */
  const loadBanners = async () => {
    try {
      const res = await fetch(`${API}/api/v1/admin/banners`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      const json = await res.json()

      const list = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json.data?.data)
        ? json.data.data
        : []

      setBanners(list)
    } catch (err) {
      console.error('LOAD BANNERS ERROR:', err)
    }
  }

  useEffect(() => {
    loadBanners()
  }, [])

  /* ================= SIGNED UPLOAD ================= */
  const handleImageUpload = async (file) => {
    if (!file) return
    setUploading(true)

    try {
      const res = await fetch(`${API}/api/v1/admin/banners/image/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ mime: file.type }),
      })

      if (!res.ok) throw new Error('Gagal mendapatkan signed URL')

      const { data } = await res.json()

      const upload = await fetch(data.signed_url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })

      if (!upload.ok) throw new Error('Upload gambar gagal')

      // Jika edit banner → update image_path di BE
      if (editing?.id) {
        const patch = await fetch(
          `${API}/api/v1/admin/banners/${editing.id}/image`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({ image_path: data.path }),
          }
        )

        if (!patch.ok)
          throw new Error('Gagal menyimpan image_path ke database')
      }

      setForm((prev) => ({
        ...prev,
        image_path: data.path,
        image_url: URL.createObjectURL(file),
      }))

      setNewImageUploaded(true)
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!editing && !form.image_path) {
      alert('Gambar wajib diupload')
      return
    }

    const url = editing
      ? `${API}/api/v1/admin/banners/${editing.id}`
      : `${API}/api/v1/admin/banners`

    const method = editing ? 'PATCH' : 'POST'

    const payload = {
      sort_order: form.sort_order,
      is_active: form.is_active,
    }

    if (!editing || newImageUploaded) {
      payload.image_path = form.image_path
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        console.error(await res.text())
        alert('Gagal menyimpan banner')
        return
      }

      setModalOpen(false)
      setEditing(null)
      setNewImageUploaded(false)
      loadBanners()
    } catch (err) {
      console.error('SUBMIT ERROR:', err)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm('Hapus banner ini?')) return

    try {
      await fetch(`${API}/api/v1/admin/banners/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })

      loadBanners()
    } catch (err) {
      console.error('DELETE ERROR:', err)
    }
  }

  const openEdit = (b) => {
    setEditing(b)
    setNewImageUploaded(false)

    setForm({
      image_path: b.image_path || '',
      sort_order: b.sort_order,
      is_active: b.is_active,
      image_url: b.image_path ? getBannerImageUrl(b.image_path) : '',
    })

    setModalOpen(true)
  }

  return (
    <>
      <SectionCard title="Manajemen Banner">
        <div
          className="
            rounded-2xl
            border border-purple-600/60
            bg-black
            p-6
            shadow-[0_0_25px_rgba(168,85,247,0.15)]
          "
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Daftar Banner</h2>

            <button
              onClick={() => {
                setEditing(null)
                setNewImageUploaded(false)
                setForm({
                  image_path: '',
                  sort_order: 0,
                  is_active: true,
                  image_url: '',
                })
                setModalOpen(true)
              }}
              className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:scale-105 transition"
            >
              + Tambah Banner
            </button>
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b border-purple-700 text-gray-300">
                <tr>
                  <th className="py-3 text-center">Preview</th>
                  <th className="py-3 text-center">Urutan</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {banners.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-purple-800/40 hover:bg-purple-700/10 transition"
                  >
                    <td className="py-3">
                      <img
                        src={getBannerImageUrl(b.image_path)}
                        className="h-14 mx-auto rounded-lg object-cover"
                      />
                    </td>

                    <td className="text-center font-medium">
                      {b.sort_order}
                    </td>

                    <td className="text-center">
                      <StatusBadge
                        status={b.is_active ? 'Aktif' : 'Nonaktif'}
                      />
                    </td>

                    <td className="text-center">
                      <ActionButtons
                        onEdit={() => openEdit(b)}
                        onDelete={() => handleDelete(b.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARD ================= */}
          <div className="md:hidden space-y-4">
            {banners.map((b) => (
              <div
                key={b.id}
                className="border border-purple-700 rounded-xl p-4 bg-purple-900/10"
              >
                <img
                  src={getBannerImageUrl(b.image_path)}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />

                <div className="flex justify-between text-sm">
                  <span>Urutan:</span>
                  <span className="font-semibold">{b.sort_order}</span>
                </div>

                <div className="flex justify-between text-sm mt-1">
                  <span>Status:</span>
                  <StatusBadge
                    status={b.is_active ? 'Aktif' : 'Nonaktif'}
                  />
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(b)}
                    className="flex-1 bg-yellow-400 text-black py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="flex-1 bg-red-600 py-2 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ================= MODAL ================= */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Banner' : 'Tambah Banner'}
      >
        <div className="space-y-4">
          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-400">Gambar Banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />

            {uploading && (
              <p className="text-sm text-purple-300">Uploading...</p>
            )}

            {form.image_url && (
              <img
                src={form.image_url}
                className="mt-3 rounded-xl max-h-40"
              />
            )}
          </div>

          {/* SORT ORDER */}
          <div>
            <label className="text-sm text-purple-300 mb-1 block">
              Urutan ke
            </label>

            <input
              type="number"
              className="input"
              placeholder="Masukkan urutan tampil"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
            />
          </div>

          {/* STATUS */}
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
            />
            Aktif
          </label>

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-black px-4 py-2 rounded-lg w-full"
            disabled={uploading}
          >
            Simpan
          </button>
        </div>
      </Modal>
    </>
  )
}
