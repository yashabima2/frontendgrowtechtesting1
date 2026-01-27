'use client'

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-purple-600 p-1">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-6 py-2 rounded-full text-sm transition
            ${active === tab.value
              ? 'bg-purple-700 text-white'
              : 'text-gray-400 hover:text-white'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
