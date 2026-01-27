'use client'

export default function VoucherCard({ data }) {
  return (
    <div className="border border-purple-700 rounded-2xl p-6 mb-6 bg-black/60 shadow-lg">
      {/* HEADER */}
      <div className="grid grid-cols-5 gap-4 items-center">
        <div>
          <p className="text-sm text-gray-400">Kode</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{data.code}</span>
            📋
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400">Diskon</p>
          <p className="font-semibold">Rp {data.discount}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Min. Transaksi</p>
          <p className="font-semibold">Rp {data.min}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Penggunaan</p>
          <p className="font-semibold">
            {data.used}/{data.limit} Digunakan
          </p>
        </div>

        <div className="flex items-center gap-4 justify-end">
          <span
            className={`flex items-center gap-2 ${
              data.active ? 'text-green-400' : 'text-red-500'
            }`}
          >
            ● {data.active ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-purple-800 my-4"></div>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <span className="badge bg-red-600">Maks 1x/user</span>
          <span className="badge bg-blue-600">
            Tidak untuk yang punya referral
          </span>
        </div>

        <div className="flex gap-3">
          <button className="bg-orange-500 hover:bg-orange-400 p-3 rounded-lg">
            ✏
          </button>
          <button className="bg-red-600 hover:bg-red-500 p-3 rounded-lg">
            🗑
          </button>
        </div>
      </div>
    </div>
  )
}
