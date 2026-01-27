'use client'

export default function AddDiscountPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Tambah Discount</h1>

      <div className="border border-purple-700 rounded-2xl p-8 bg-black/60">
        <div className="grid grid-cols-2 gap-6">
          {/* Nama */}
          <div className="col-span-2">
            <label className="text-sm text-gray-400">Nama Discount</label>
            <input className="input w-full" placeholder="Contoh: Diskon Natal" />
          </div>

          {/* Nominal */}
          <div>
            <label className="text-sm text-gray-400">Nominal Discount</label>
            <input className="input w-full" placeholder="Rp / %" />
          </div>

          {/* Kategori */}
          <div>
            <label className="text-sm text-gray-400">Kategori Produk</label>
            <select className="input w-full">
              <option>Pilih Kategori</option>
              <option>Cloud Phone</option>
              <option>VPN</option>
            </select>
          </div>

          {/* Sub */}
          <div>
            <label className="text-sm text-gray-400">Sub Kategori</label>
            <select className="input w-full">
              <option>Pilih Sub Kategori</option>
              <option>Premium</option>
            </select>
          </div>

          {/* Tanggal */}
          <div>
            <label className="text-sm text-gray-400">Tanggal Mulai</label>
            <input type="date" className="input w-full" />
          </div>

          <div>
            <label className="text-sm text-gray-400">Tanggal Selesai</label>
            <input type="date" className="input w-full" />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="btn-primary">Tambah Discount</button>
        </div>
      </div>
    </div>
  )
}
