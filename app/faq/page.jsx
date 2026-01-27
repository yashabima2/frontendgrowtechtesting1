'use client'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FAQPage() {
  const API = process.env.NEXT_PUBLIC_API_URL

  const [faqs, setFaqs] = useState([])
  const [open, setOpen] = useState(-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${API}/api/v1/content/faqs`)
        const data = await res.json()

        let list = data.data || data || []
        list = list.filter(f => f.is_active)
        list.sort((a, b) => a.sort_order - b.sort_order)

        setFaqs(list)
      } catch (err) {
        console.error('Gagal ambil FAQ', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqs()
  }, [API])

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-3">
          Pertanyaan Umum (FAQ)
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Temukan jawaban atas pertanyaan yang sering diajukan
        </p>

        {loading ? (
          <div className="text-center text-gray-400">Memuat FAQ...</div>
        ) : !faqs.length ? (
          <div className="text-center text-gray-400">Belum ada FAQ tersedia.</div>
        ) : (
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div
                key={f.id}
                className="border border-purple-700 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div>
                    {f.tag && (
                      <span className="text-xs px-3 py-1 rounded-full bg-white text-black mr-3">
                        {f.tag}
                      </span>
                    )}
                    <span className="text-xl font-semibold">{f.question}</span>
                  </div>
                  <span className="text-xl">{open === i ? '˄' : '˅'}</span>
                </button>

                {open === i && (
                  <div className="bg-gradient-to-b from-purple-900/60 to-black p-6 text-gray-200">
                    {f.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
