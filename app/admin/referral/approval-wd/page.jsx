'use client'
import { useState } from 'react'
import ReferralTabs from '../components/ReferralTabs'
import TableWrapper from '../components/TableWrapper'
import FilterBar from '../components/FilterBar'

export default function ApprovalWDPage() {
  const [requests, setRequests] = useState([
    { id: 1, user: 'Ravi Kusuma', amount: 5000, date: '12-12-2025', status: 'Pending' },
    { id: 2, user: 'Ravi Kusuma', amount: 5000, date: '12-12-2025', status: 'Pending' },
  ])

  const [history, setHistory] = useState([])

  const handleAction = (id, action) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, status: action } : r
    )

    const processed = updated.find(r => r.id === id)

    setRequests(updated.filter(r => r.id !== id))

    setHistory(prev => [
      ...prev,
      {
        id: processed.id,
        user: processed.user,
        amount: processed.amount,
        status: action,
        note: action === 'Approved' ? 'Approved successfully' : 'Rejected by admin'
      }
    ])
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-2">Admin Referral</h1>
      <ReferralTabs />

      {/* REQUEST LIST */}
      <TableWrapper>
        <FilterBar />
        <table className="w-full text-sm">
          <thead className="border-b border-gray-700 text-gray-300">
            <tr>
              <th>ID</th><th>User</th><th>Jumlah</th><th>Tanggal</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-b border-gray-800">
                <td className="py-3">{r.id}</td>
                <td>{r.user}</td>
                <td>Rp {r.amount.toLocaleString()}</td>
                <td>{r.date}</td>
                <td className="text-yellow-400">{r.status}</td>
                <td className="flex gap-2 py-3">
                  <button
                    onClick={() => handleAction(r.id, 'Approved')}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    ACC
                  </button>
                  <button
                    onClick={() => handleAction(r.id, 'Rejected')}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

      {/* HISTORY */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Riwayat Approval/Reject</h2>
      <TableWrapper>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-700 text-gray-300">
            <tr>
              <th>ID</th><th>User</th><th>Jumlah</th><th>Status</th><th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {history.map(h => (
              <tr key={h.id} className="border-b border-gray-800">
                <td className="py-3">{h.id}</td>
                <td>{h.user}</td>
                <td>Rp {h.amount.toLocaleString()}</td>
                <td className={h.status === 'Approved' ? 'text-green-400' : 'text-red-400'}>
                  {h.status}
                </td>
                <td>{h.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </div>
  )
}
