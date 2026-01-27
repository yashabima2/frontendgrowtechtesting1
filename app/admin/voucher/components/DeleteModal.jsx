'use client'


export default function DeleteModal({ open, onClose, onDelete }) {
if (!open) return null


return (
<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
<div className="bg-black border border-purple-600 rounded-xl p-6 w-[360px] text-center">
<div className="text-xl font-semibold mb-4">Yakin menghapus data?</div>
<div className="flex justify-center gap-4">
<button onClick={onClose} className="px-4 py-2 rounded bg-white text-black">Close</button>
<button onClick={onDelete} className="px-4 py-2 rounded bg-red-600">Delete</button>
</div>
</div>
</div>
)
}