export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-semibold
      ${status === 'Aktif'
        ? 'bg-green-500 text-black'
        : 'bg-red-600 text-white'}`}
    >
      {status}
    </span>
  )
}
