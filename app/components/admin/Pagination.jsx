'use client'

export default function Pagination({ page, total, limit, onChange }) {
  const totalPage = Math.ceil(total / limit)

  if (totalPage <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i)
  }

  return (
    <div className="mt-4 flex justify-end gap-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        className="h-8 w-8 rounded border border-purple-700 hover:bg-purple-700/30"
      >
        ‹
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-8 w-8 rounded border
            ${p === page
              ? "bg-purple-600 border-purple-500 text-white"
              : "border-purple-700 hover:bg-purple-700/30"}
          `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPage, page + 1))}
        className="h-8 w-8 rounded border border-purple-700 hover:bg-purple-700/30"
      >
        ›
      </button>
    </div>
  )
}
