'use client'

import { motion } from "framer-motion";

export default function ProdukPage() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-white">
        Manajemen Produk
      </h1>

      {/* ================= DATA PRODUK ================= */}
      <motion.div
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Data Produk
        </h2>

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button className="btn-filter">
            Filter
          </button>

          <input
            type="text"
            placeholder="Cari produk..."
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
                <th className="py-3 px-2 text-left">Produk</th>
                <th className="py-3 px-2 text-left">Data Akun</th>
                <th className="py-3 px-2 text-center">Total</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map(i => (
                <motion.tr
                  key={i}
                  className="
                    border-b border-white/5
                    transition-all duration-200
                    hover:bg-purple-900/20
                    hover:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]
                  "
                >
                  <td className="py-3 px-2">1053{i}</td>

                  <td className="py-3 px-2 font-medium text-white">
                    RedFinger - VIP 30D
                  </td>

                  <td className="py-3 px-2 text-purple-300">
                    user{i}@gmail.com
                  </td>

                  <td className="py-3 px-2 text-center">
                    1
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className="badge-ready">
                      READY
                    </span>
                  </td>

                  <td className="py-3 px-2 text-center space-x-2">
                    <button className="btn-edit-sm">Edit</button>
                    <button className="btn-delete-sm">Hapus</button>
                  </td>
                </motion.tr>
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
      </motion.div>

      {/* ================= STOK PRODUK ================= */}
      <motion.div
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Stok Produk
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-2 text-left">Produk</th>
                <th className="py-3 px-2 text-center">Stok</th>
              </tr>
            </thead>

            <tbody>
              {["VIP 7D", "VIP 30D", "SVIP 30D"].map((item, i) => (
                <motion.tr
                  key={i}
                  className="
                    border-b border-white/5
                    transition-all duration-200
                    hover:bg-purple-900/20
                    hover:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]
                  "
                >
                  <td className="py-3 px-2 text-white">
                    RedFinger {item}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {48 - i * 10}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
