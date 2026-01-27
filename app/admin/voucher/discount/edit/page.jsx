'use client'

export default function EditDiscountPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Edit Discount</h1>

      <div className="border border-purple-700 rounded-2xl p-8 bg-black/60">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm text-gray-400">Nama Discount</label>
            <input className="input w-full" defaultValue="Diskon Natal" />
          </div>

          <div>
            <label className="text-sm text-gray-400">Nominal Discount</label>
            <input className="input w-full" defaultValue="2%" />
          </div>

          <div>
            <label className="text-sm text-gray-400">Kategori Produk</label>
            <select className="input w-full">
              <option>Cloud Phone</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Sub Kategori</label>
            <select className="input w-full">
              <option>Premium</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Tanggal Mulai</label>
            <input type="date" className="input w-full" defaultValue="2025-12-01" />
          </div>

          <div>
            <label className="text-sm text-gray-400">Tanggal Selesai</label>
            <input type="date" className="input w-full" defaultValue="2025-12-31" />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="btn-primary">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  )
}
