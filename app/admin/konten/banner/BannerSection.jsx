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

  const SUPABASE_PUBLIC_BASE = "https://jleoptqwzrkqtklhmpdc.supabase.co/storage/v1/object/public/banners";

  const getBannerImageUrl = (image_path) => {
    if (!image_path) return '';
    return `${SUPABASE_PUBLIC_BASE}/${image_path}`;
  };

  

  const [form, setForm] = useState({
    image_path: '',
    sort_order: 0,
    is_active: true,
  })
  

  /* ================= LOAD ================= */
  const loadBanners = async () => {
    const res = await fetch(`${API}/api/v1/admin/banners`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
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
          'Accept': 'application/json',
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

      // kalau sedang edit banner existing, langsung simpan ke BE
      if (editing?.id) {
        const patch = await fetch(`${API}/api/v1/admin/banners/${editing.id}/image`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify({ image_path: data.path }),
        });

        if (!patch.ok) throw new Error('Gagal menyimpan image_path ke database');
      }

      if (!upload.ok) throw new Error('Upload gambar gagal')

      setForm(prev => ({
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

    // 🔥 Payload dibedakan
    const payload = {
      sort_order: form.sort_order,
      is_active: form.is_active,
    }

    // Kirim image_path hanya kalau create ATAU upload baru
    if (!editing || newImageUploaded) {
      payload.image_path = form.image_path
    }

    // // Hanya kirim image_path kalau ada upload baru
    // if (form.image_path) {
    //   payload.image_path = form.image_path
    // }

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

  }


  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm('Hapus banner ini?')) return

    await fetch(`${API}/api/v1/admin/banners/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })

    loadBanners()
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
        <button
          onClick={() => {
            setEditing(null)
            setNewImageUploaded(false)
            setForm({
              image_path: '',
              sort_order: 0,
              is_active: true,
            })
            setModalOpen(true)
          }}
          className="bg-purple-700 px-4 py-2 rounded-lg mb-4"
        >
          + Tambah Banner
        </button>

        <table className="w-full text-sm">
          <thead className="bg-purple-900">
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Urutan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((b, i) => (
              <tr key={b.id} className="text-center">
                <td>{i + 1}</td>
                <td>
                  <img src={getBannerImageUrl(b.image_path)} className="h-12 mx-auto rounded" />
                </td>
                <td>{b.sort_order}</td>
                <td>
                  <StatusBadge status={b.is_active ? 'Aktif' : 'Nonaktif'} />
                </td>
                <td>
                  <ActionButtons
                    onEdit={() => openEdit(b)}
                    onDelete={() => handleDelete(b.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      {/* MODAL */}
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
            {uploading && <p className="text-sm">Uploading...</p>}
            {form.image_url && (
              <img src={form.image_url} className="mt-3 rounded-xl max-h-40" />
            )}
          </div>

          {/* SORT ORDER */}
          <input
            type="number"
            className="input"
            placeholder="Urutan tampil"
            value={form.sort_order}
            onChange={(e) =>
              setForm({ ...form, sort_order: Number(e.target.value) })
            }
          />

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
