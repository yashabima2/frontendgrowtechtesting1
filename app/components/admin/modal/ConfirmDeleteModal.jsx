import Modal from "./Modal"

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="text-center">
        <p className="text-white text-lg mb-6">
          Yakin menghapus data?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-black px-4 py-1 rounded"
          >
            Close
          </button>

          <button
            onClick={onConfirm}   // 🔥 INI YANG PENTING
            className="bg-red-600 px-4 py-1 rounded text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}
