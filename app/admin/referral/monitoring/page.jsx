'use client'
import { useState } from 'react'
import ReferralTabs from '../components/ReferralTabs'
import TableWrapper from '../components/TableWrapper'
import FilterBar from '../components/FilterBar'
import Link from 'next/link'

export default function MonitoringReferralPage() {
  const commissionType = 'percent' // atau 'fixed'
  const commissionValue = 5 // 5% atau Rp

  const users = [
    { name: 'Ravi Kusuma', code: 'REF-RAVI123', total: 8, valid: 7, pending: 1, invalid: 0, totalBelanja: 800000 }
  ]

  const calculateCommission = (totalBelanja) => {
    if (commissionType === 'percent') {
      return totalBelanja * (commissionValue / 100)
    }
    return commissionValue * totalBelanja // kalau fixed per transaksi nanti disesuaikan
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-2">Admin Referral</h1>
      <ReferralTabs />

      <TableWrapper>
        <FilterBar />
        <table className="w-full text-sm">
          <thead className="text-gray-300 border-b border-gray-700">
            <tr>
              <th>User / Kode Referral</th>
              <th>Total Referral</th>
              <th>Valid</th>
              <th>Pending</th>
              <th>Invalid</th>
              <th>Total Komisi</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="py-3">
                  {u.name}<br />
                  <span className="text-gray-400 text-xs">{u.code}</span>
                </td>
                <td>{u.total}</td>
                <td>{u.valid}</td>
                <td>{u.pending}</td>
                <td>{u.invalid}</td>
                <td className="text-green-400 font-semibold">
                  Rp {calculateCommission(u.totalBelanja).toLocaleString()}
                </td>
                <td>
                  <Link href="/admin/referral/detail/1" className="bg-purple-700 px-3 py-1 rounded-lg">👁</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </div>
  )
}
