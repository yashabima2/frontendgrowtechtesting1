export default function SectionCard({ title, children }) {
  return (
    <div className="border border-purple-700 rounded-2xl p-6 bg-black/50 space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  )
}
