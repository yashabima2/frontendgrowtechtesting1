import { Pencil, Trash2 } from 'lucide-react'

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={onEdit}
        className="bg-orange-500 p-2 rounded-lg"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={onDelete}
        className="bg-red-600 p-2 rounded-lg"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

