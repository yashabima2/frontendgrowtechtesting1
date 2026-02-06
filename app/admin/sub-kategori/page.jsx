'use client'

import Image from "next/image";

export default function SubKategoriPage() {
  return (
    <div className="space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-white">
        Manajemen Produk
      </h1>

      {/* CARD */}
      <div
        className="
          rounded-2xl
          border border-purple-600/60
          bg-black
          p-6
          transition-all duration-300
          shadow-[0_0_25px_rgba(168,85,247,0.15)]
          hover:shadow-[0_0_45px_rgba(168,85,247,0.35)]
          hover:border-purple-500
        "
      >
        {/* CARD TITLE */}
        <h2 className="text-lg font-semibold text-white mb-4">
          Data Sub Kategori
        </h2>

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button className="btn-filter">
            Filter
          </button>

          <input
            type="text"
            placeholder="Cari sub kategori..."
            className="
              flex-1 min-w-[200px]
              h-10
              rounded-full
              bg-purple-900/40
              px-4
              text-sm
              text-white
              placeholder-purple-300
              outline-none
              focus:ring-2 focus:ring-purple-500
            "
          />

          <div className="flex gap-2">
            <button className="btn-add">+ Tambah</button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-2 text-left">ID</th>
                <th className="py-3 px-2 text-left">Gambar</th>
                <th className="py-3 px-2 text-left">Sub Kategori</th>
                <th className="py-3 px-2 text-left">Kategori</th>
                <th className="py-3 px-2 text-center">Total Produk</th>
                <th className="py-3 px-2 text-left">Provider</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map(id => (
                <tr
                  key={id}
                  className="
                    border-b border-white/5
                    transition-all duration-200
                    hover:bg-purple-900/20
                    hover:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]
                  "
                >
                  {/* ID */}
                  <td className="py-3 px-2">{id}</td>

                  {/* IMAGE */}
                  <td className="py-3 px-2">
                    <div
                      className="
                        group
                        w-12 h-12
                        rounded-lg
                        bg-purple-900/40
                        flex items-center justify-center
                        overflow-hidden
                        border border-purple-700/40
                        transition-all duration-300
                        hover:border-purple-500
                        hover:shadow-[0_0_18px_rgba(168,85,247,0.7)]
                      "
                    >
                      <Image
                        src="/placeholder.png"
                        alt="Sub Kategori"
                        width={40}
                        height={40}
                        className="
                          object-contain
                          transition-transform duration-300
                          group-hover:scale-110
                        "
                      />
                    </div>
                  </td>

                  {/* SUB CATEGORY */}
                  <td className="py-3 px-2 font-medium text-white">
                    Amazon Prime Video
                  </td>

                  {/* CATEGORY */}
                  <td className="py-3 px-2 text-purple-300">
                    Jangan Dibeli
                  </td>

                  {/* TOTAL PRODUCT */}
                  <td className="py-3 px-2 text-center">
                    3
                  </td>

                  {/* PROVIDER */}
                  <td className="py-3 px-2">
                    VIP Reseller
                  </td>

                  {/* STATUS */}
                  <td className="py-3 px-2 text-center">
                    <span className="badge-ready">
                      Aktif
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-3 px-2 text-center space-x-2">
                    <button className="btn-edit-sm">Edit</button>
                    <button className="btn-delete-sm">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 mt-4">
          {[1, 2, 3, 4, 5].map(p => (
            <button
              key={p}
              className="
                w-8 h-8
                rounded
                bg-purple-900/50
                text-sm
                transition-all duration-200
                hover:bg-purple-600
                hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]
              "
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
