'use client'

import { useEffect, useState } from 'react'
import SectionCard from '../../../components/admin/SectionCard'
import Cookies from 'js-cookie'

export default function PrivasiSection() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const token = Cookies.get('token')
  const slug = 'privasi-kami'

  const [pageId, setPageId] = useState(null)
  const [title, setTitle] = useState('Kebijakan Privasi')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API}/api/v1/admin/pages/slug/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()

        if (data.data) {
          setPageId(data.data.id)
          setTitle(data.data.title)
          setContent(data.data.content)
          setIsPublished(data.data.is_published)
        }
      } catch (err) {
        console.error('Gagal ambil halaman', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [API, token])

  const handleSave = async () => {
    try {
      await fetch(`${API}/api/v1/admin/pages/slug/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          is_published: isPublished,
        }),
      })

      alert('Berhasil disimpan')
    } catch (err) {
      console.error('Gagal simpan', err)
      alert('Gagal menyimpan')
    }
  }

  if (loading) return <SectionCard title="Kebijakan Privasi">Memuat...</SectionCard>

  return (
    <SectionCard title="Kebijakan Privasi">
      <input
        type="text"
        className="input mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul halaman"
      />

      <textarea
        rows={12}
        className="input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Isi kebijakan privasi (HTML diperbolehkan)"
      />

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label>Publish halaman</label>
      </div>

      <button
        onClick={handleSave}
        className="bg-green-500 text-black px-6 py-2 rounded-lg mt-4"
      >
        Simpan Perubahan
      </button>
    </SectionCard>
  )
}
