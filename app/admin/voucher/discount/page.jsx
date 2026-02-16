'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import ConfirmDeleteModal from '../../../components/admin/ConfirmDeleteModal'
import VoucherTabs from '../components/VoucherTabs'
import { motion } from 'framer-motion'

export default function DiscountPage() {
  const API = process.env.NEXT_PUBLIC_API_URL

  const [discounts, setDiscounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)

  const loadDiscounts = async () => {
    try {
      setLoading(true)

      const res = await fetch(`${API}/api/v1/admin/discount-campaigns`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      const json = await res.json()

      const list = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json.data?.data)
        ? json.data.data
        : []

      setDiscounts(list)
    } catch (err) {
      console.error('LOAD DISCOUNTS ERROR:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDiscounts()
  }, [])

  const handleDelete = async () => {
    try {
      await fetch(
        `${API}/api/v1/admin/discount-campaigns/${selectedId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )

      setOpenDelete(false)
      setSelectedId(null)
      loadDiscounts()
    } catch {
      alert('Gagal menghapus discount')
    }
  }

  const toggleEnabled = async (d) => {
    try {
      const res = await fetch(
        `${API}/api/v1/admin/discount-campaigns/${d.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify({
            enabled: !d.enabled,
          }),
        }
      )

      if (!res.ok) throw new Error()

      setDiscounts(prev =>
        prev.map(x =>
          x.id === d.id ? { ...x, enabled: !x.enabled } : x
        )
      )
    } catch {
      alert('Gagal update status')
    }
  }

  return (
    <div className="p-10 text-white">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold">Manajemen Discount</h1>

        <Link href="/admin/voucher/discount/add" className="btn-primary">
          + Tambah Discount
        </Link>
      </motion.div>

      <div className="mb-6">
        <VoucherTabs />
      </div>

      <div className="rounded-2xl border border-purple-900/40 overflow-hidden">
        <div className="grid grid-cols-6 bg-purple-900/20 px-6 py-3 text-sm text-gray-300 font-medium">
          <div>Nama Discount</div>
          <div>Nominal</div>
          <div>Kategori</div>
          <div>Sub</div>
          <div>Status</div>
          <div className="text-right">Aksi</div>
        </div>

        {loading && (
          <div className="p-6 text-gray-400">Loading...</div>
        )}

        {!loading && discounts.length === 0 && (
          <div className="p-6 text-gray-400">
            Belum ada discount campaign
          </div>
        )}

        {discounts.map(d => (
          <div
            key={d.id}
            className="grid grid-cols-6 items-center px-6 py-4 border-t border-purple-900/30 hover:bg-purple-900/10 transition"
          >
            <div className="font-medium">{d.nama_discount}</div>
            <div>{d.nominal}</div>
            <div>{d.kategori_produk || '-'}</div>
            <div>{d.sub_kategori || '-'}</div>

            <div>
              <button onClick={() => toggleEnabled(d)}>
                <StatusBadge active={d.enabled} />
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <Link
                href={`/admin/voucher/discount/edit/${d.id}`}
                className="action-btn bg-orange-500 hover:bg-orange-400"
              >
                ✏
              </Link>

              <button
                onClick={() => {
                  setSelectedId(d.id)
                  setOpenDelete(true)
                }}
                className="action-btn bg-red-600 hover:bg-red-500"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function StatusBadge({ active }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border
        ${active
          ? 'bg-green-600/20 text-green-400 border-green-600/40'
          : 'bg-red-600/20 text-red-400 border-red-600/40'
        }`}
    >
      {active ? 'Aktif' : 'Nonaktif'}
    </span>
  )
}
