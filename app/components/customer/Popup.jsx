'use client'

export default function Popup({
  title,
  content,
  image,
  ctaText,
  ctaUrl,
  onClose,
}) {
  // Jangan render kalau tidak ada isi
  if (!title && !content && !image) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-[520px] mx-4 rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* HEADER */}
        {title && (
          <div className="flex items-center justify-between bg-purple-800 px-6 py-4 text-white">
            <div className="font-semibold text-lg uppercase">
              📢 {title}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition text-xl"
              aria-label="Tutup popup"
            >
              ✕
            </button>
          </div>
        )}

        {/* BODY */}
        <div className="px-8 py-10 text-center space-y-6 text-black">

          {/* IMAGE */}
          {image && (
            <img
              src={image}
              alt="Popup"
              className="mx-auto max-h-48 object-contain rounded-lg"
            />
          )}

          {/* CONTENT */}
          {content && (
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {content}
            </p>
          )}

          {/* CTA */}
          {ctaText && (
            <a
              href={ctaUrl || '#'}
              target={ctaUrl ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="inline-flex justify-center bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg text-white font-semibold text-lg"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
