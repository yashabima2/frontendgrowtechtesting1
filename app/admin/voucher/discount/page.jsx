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
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      const json = await res.json()
      const list = json.data?.data || json.data || []

      setDiscounts(list)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDiscounts()
  }, [])

  const toggleEnabled = async (d) => {
    await fetch(`${API}/api/v1/admin/discount-campaigns/${d.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({ enabled: !d.enabled }),
    })

    loadDiscounts()
  }

  const handleDelete = async () => {
    await fetch(`${API}/api/v1/admin/discount-campaigns/${selectedId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })

    setOpenDelete(false)
    loadDiscounts()
  }

  return (
    <div className="p-10 text-white">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Manajemen Discount
        </h1>

        <Link href="/admin/voucher/discount/add" className="btn-primary">
          + Tambah Discount
        </Link>
      </motion.div>

      <VoucherTabs />

      <div className="rounded-2xl border border-purple-900/40 overflow-x-auto mt-6 bg-gradient-to-b from-black to-purple-950/20">
        <table className="w-full text-sm">
          <thead className="bg-purple-900/30 text-gray-300">
            <tr className="text-xs uppercase tracking-wider">
              <th className="p-4 text-left">Nama</th>
              <th className="text-right">Nominal</th>
              <th className="text-center">Type</th>
              <th className="text-right">Value</th>
              <th className="text-right">Min Order</th>
              <th className="text-right">Max Discount</th>
              <th className="text-center">Starts</th>
              <th className="text-center">Ends</th>
              <th className="text-center">Priority</th>
              <th className="text-center">Stack</th>
              <th className="text-right">Usage Total</th>
              <th className="text-right">Per User</th>
              <th className="text-center">Status</th>
              <th className="text-center">Enabled</th>
              <th className="text-left">Targets</th>
              <th className="text-right pr-6">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="16" className="p-8 text-center text-gray-400">
                  Loading discounts...
                </td>
              </tr>
            )}

            {!loading && discounts.length === 0 && (
              <tr>
                <td colSpan="16" className="p-8 text-center text-gray-500">
                  Belum ada discount
                </td>
              </tr>
            )}

            {!loading && discounts.map((d, i) => (
              <tr
                key={d.id}
                className={`
                  border-t border-purple-900/30
                  ${i % 2 === 0 ? 'bg-black/40' : 'bg-purple-950/10'}
                  hover:bg-purple-900/20 transition
                `}
              >
                <td className="p-4 font-medium whitespace-nowrap">
                  {d.nama_discount}
                </td>

                <td className="text-right font-mono">
                  {d.nominal}
                </td>

                <td className="text-center">
                  <TypeBadge type={d.discount_type} />
                </td>

                <td className="text-right font-mono">
                  {d.discount_value}
                </td>

                <td className="text-right">
                  {d.min_order_amount ?? '-'}
                </td>

                <td className="text-right">
                  {d.max_discount_amount ?? '-'}
                </td>

                <td className="text-center text-xs text-gray-400">
                  {formatDate(d.starts_at)}
                </td>

                <td className="text-center text-xs text-gray-400">
                  {formatDate(d.ends_at)}
                </td>

                <td className="text-center">
                  {d.priority}
                </td>

                <td className="text-center">
                  <StackBadge policy={d.stack_policy} />
                </td>

                <td className="text-right">
                  {d.usage_limit_total ?? '-'}
                </td>

                <td className="text-right">
                  {d.usage_limit_per_user ?? '-'}
                </td>

                <td className="text-center">
                  <StatusBadge status={d.status} />
                </td>

                <td className="text-center">
                  <button onClick={() => toggleEnabled(d)}>
                    <Badge active={d.enabled} />
                  </button>
                </td>

                <td className="text-left">
                  <div className="flex flex-wrap gap-1">
                    {d.targets?.length ? (
                      d.targets.map(t => (
                        <span
                          key={`${t.type}-${t.id}`}
                          className="px-2 py-1 rounded-md text-xs bg-purple-900/30 border border-purple-700/40"
                        >
                          {t.type} #{t.id}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">-</span>
                    )}
                  </div>
                </td>

                <td className="flex justify-end gap-2 p-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function Badge({ active }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border transition
        ${active
          ? 'bg-green-600/20 text-green-400 border-green-600/40'
          : 'bg-red-600/20 text-red-400 border-red-600/40'
        }`}
    >
      {active ? 'Aktif' : 'Nonaktif'}
    </span>
  )
}

function StatusBadge({ status }) {
  const active = status?.toLowerCase() === 'aktif'

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border
        ${active
          ? 'bg-green-600/20 text-green-400 border-green-600/40'
          : 'bg-red-600/20 text-red-400 border-red-600/40'
        }`}
    >
      {status}
    </span>
  )
}

function TypeBadge({ type }) {
  const map = {
    fixed: 'bg-blue-600/20 text-blue-400 border-blue-600/40',
    percent: 'bg-purple-600/20 text-purple-400 border-purple-600/40',
  }

  return (
    <span className={`px-2 py-1 rounded-md text-xs border ${map[type] || 'border-white/10'}`}>
      {type}
    </span>
  )
}

function StackBadge({ policy }) {
  const exclusive = policy === 'exclusive'

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs border
        ${exclusive
          ? 'bg-red-600/20 text-red-400 border-red-600/40'
          : 'bg-emerald-600/20 text-emerald-400 border-emerald-600/40'
        }`}
    >
      {policy}
    </span>
  )
}

function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleString('id-ID')
}
