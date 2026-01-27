'use client'

import { useRouter } from "next/navigation"
import { PERMISSIONS } from "../../../../lib/permissions"

export default function EditAdminPage({ params }) {
  const router = useRouter()
  const { id } = params

  return (
    <div className="px-6 py-8 text-white max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Admin #{id}
      </h1>

      <div className="rounded-2xl border border-purple-700 bg-black p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input className="input" defaultValue="growtech@central.id" />
          <input className="input" defaultValue="Ono Suno" />
          <input className="input" defaultValue="ono" />

          <select className="input">
            <option selected>Admin</option>
            <option>Super Admin</option>
          </select>
        </div>

        <h3 className="font-semibold mb-3">Hak Akses</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {PERMISSIONS.map(p => (
            <label key={p} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              {p}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg bg-white text-black"
          >
            Batal
          </button>
          <button className="px-6 py-2 rounded-lg bg-purple-700">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
