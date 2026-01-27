'use client'

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black border border-purple-700 rounded-2xl p-8 w-full max-w-md text-center">
        <div className="text-red-500 text-4xl mb-4">✖</div>
        <h2 className="text-xl font-bold mb-2">Yakin menghapus data?</h2>
        <p className="text-gray-400 mb-6">
          Data discount yang dihapus tidak bisa dikembalikan.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-purple-600"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
