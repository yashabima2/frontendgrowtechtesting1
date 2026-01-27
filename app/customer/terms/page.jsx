'use client'
import { useEffect, useState } from 'react'

export default function TermsPage() {
  const API = process.env.NEXT_PUBLIC_API_URL

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API}/api/v1/content/pages/ketentuan-layanan`)
        const data = await res.json()
        setPage(data.data || data)
      } catch (err) {
        console.error('Gagal ambil halaman Terms', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [API])

  return (
    <>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-purple-700 p-10">
          {loading ? (
            <div className="text-center text-gray-400">Memuat halaman...</div>
          ) : !page ? (
            <div className="text-center text-gray-400">Konten tidak ditemukan</div>
          ) : (
            <>
              <h1 className="text-4xl font-bold bg-purple-900 rounded-xl py-6 text-center mb-10">
                {page.title}
              </h1>

              <div
                className="prose prose-invert max-w-none text-gray-200"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </>
          )}
        </div>
      </section>
    </>
  )
}
