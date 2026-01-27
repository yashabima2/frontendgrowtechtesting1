'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import SectionCard from '../../../components/admin/SectionCard'
import Toast from '../../../components/ui/Toast'
import useToast from '../../../hooks/useToast'

export default function PengumumanPage() {
  const API = process.env.NEXT_PUBLIC_API_URL

  /* ================= STATE ================= */
  const [popupId, setPopupId] = useState(null)
  const [initialData, setInitialData] = useState(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [ctaText, setCtaText] = useState('')
  const [ctaUrl, setCtaUrl] = useState('')
  const [status, setStatus] = useState(true)
  const [target, setTarget] = useState('all')

  const [loading, setLoading] = useState(false)
  const { toast, showToast } = useToast()

  /* ================= GET POPUP ================= */
  const fetchPopup = async () => {
    const token = Cookies.get('token')
    if (!token) return

    setLoading(true)
    try {
      const res = await fetch(`${API}/api/v1/admin/popups`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      const json = await res.json()
      const popup = json?.data?.[0]

      if (!popup) {
        setInitialData(null)
        return
      }

      setPopupId(popup.id)
      setTitle(popup.title || '')
      setContent(popup.content || '')
      setCtaText(popup.cta_text || '')
      setCtaUrl(popup.cta_url || '')
      setStatus(!!popup.is_active)
      setTarget(popup.target || 'all')

      setInitialData({
        title: popup.title || '',
        content: popup.content || '',
        ctaText: popup.cta_text || '',
        ctaUrl: popup.cta_url || '',
        status: !!popup.is_active,
        target: popup.target || 'all',
      })
    } catch (err) {
      console.error(err)
      showToast('Gagal mengambil data popup')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopup()
  }, [])

  /* ================= CHANGE DETECTION ================= */
  const hasChanges =
    initialData &&
    (
      title !== initialData.title ||
      content !== initialData.content ||
      ctaText !== initialData.ctaText ||
      ctaUrl !== initialData.ctaUrl ||
      status !== initialData.status ||
      target !== initialData.target
    )

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!title || !content) {
      showToast('Judul dan konten wajib diisi')
      return
    }

    const token = Cookies.get('token')
    const method = popupId ? 'PATCH' : 'POST'
    const url = popupId
      ? `${API}/api/v1/admin/popups/${popupId}`
      : `${API}/api/v1/admin/popups`

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          cta_text: ctaText || null,
          cta_url: ctaUrl || null,
          is_active: status,
          target,
        }),
      })

      showToast(popupId ? 'Popup diperbarui' : 'Popup berhasil dibuat')
      fetchPopup()
    } catch (err) {
      console.error(err)
      showToast('Gagal menyimpan popup')
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!popupId) return
    if (!confirm('Hapus popup pengumuman?')) return

    const token = Cookies.get('token')

    try {
      await fetch(`${API}/api/v1/admin/popups/${popupId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      showToast('Popup dihapus')

      setPopupId(null)
      setTitle('')
      setContent('')
      setCtaText('')
      setCtaUrl('')
      setStatus(true)
      setTarget('all')
      setInitialData(null)
    } catch (err) {
      console.error(err)
      showToast('Gagal menghapus popup')
    }
  }

  /* ================= RENDER ================= */
  return (
    <>
      {toast && <Toast message={toast} />}

      <SectionCard title="Pengumuman Popup Customer">
        {loading && <p className="text-gray-400 mb-4">Loading...</p>}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10">

          {/* FORM */}
          <div className="space-y-6">
            <FormGroup label="Judul Popup" hint="Tampilkan judul singkat pada popup">
              <input className="input" placeholder="Contoh: 🎉 Diskon 50% Spesial Hari Ini!" value={title} onChange={e => setTitle(e.target.value)} />
            </FormGroup>

            <FormGroup label="Konten Pengumuman" hint="Tulis penjelasan singkat. Bisa lebih dari satu baris.">
              <textarea
                rows={5}
                className="input"
                placeholder={`Contoh:
              Halo customer 👋

              Kami sedang mengadakan promo besar hari ini.
              Gunakan kode PROMO50 untuk mendapatkan diskon.`}
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </FormGroup>

            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Text Tombol (CTA)" hint="Opsional. Jika ingin menampilkan tombol pada popup.">
                <input className="input" placeholder="Contoh: Lihat Promo" value={ctaText} onChange={e => setCtaText(e.target.value)} />
              </FormGroup>

              <FormGroup label="Link Tombol (CTA)" hint="Link tujuan ketika tombol diklik.">
                <input className="input" placeholder="Contoh: https://domain.com/" value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} />
              </FormGroup>
            </div>

            <div className="flex items-center gap-4">
              <span>Status</span>
              <button
                onClick={() => setStatus(!status)}
                className={`px-6 py-2 rounded-full font-semibold
                  ${status ? 'bg-green-500 text-black' : 'bg-red-600 text-white'}`}
              >
                {status ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={initialData && !hasChanges}
                className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {popupId ? 'Update Popup' : 'Buat Popup'}
              </button>

              {popupId && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Hapus Popup
                </button>
              )}
            </div>
          </div>

          {/* PREVIEW */}
          <div className="sticky top-24">
            <PopupPreview title={title} content={content} ctaText={ctaText} />
          </div>

        </div>
      </SectionCard>
    </>
  )
}

/* ================= COMPONENTS ================= */

function FormGroup({ label, children }) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      {children}
    </div>
  )
}

function PopupPreview({ title, content, ctaText }) {
  return (
    <div className="w-[520px] rounded-2xl overflow-hidden border border-purple-700 shadow-xl">
      <div className="bg-purple-800 px-6 py-4 text-white font-semibold">
        📢 {title || 'Judul Popup'}
      </div>

      <div className="bg-white text-black px-8 py-10 text-center space-y-6">
        <p className="text-gray-700 whitespace-pre-line">
          {content || 'Isi pengumuman akan tampil di sini'}
        </p>

        {ctaText && (
          <button className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold">
            {ctaText}
          </button>
        )}
      </div>
    </div>
  )
}
