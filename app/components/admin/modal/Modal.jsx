// components/admin/modal/Modal.jsx
"use client"

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-black border border-purple-600 rounded-xl w-[500px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
