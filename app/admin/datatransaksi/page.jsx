'use client'

export default function DataTransaksiPage() {
  const data = [
    {
      id: 101532,
      invoice: 'INV-20241220-001',
      file: '-',
      reference: 'ABCDEFGHJ',
      metode: 'Qris GrowTech',
      email: 'growtech@example.com'
    }
  ]

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">Data Transaksi</h1>

      <div className="flex gap-3 mb-4">
        <button className="btn-primary">Salin Invoice</button>
        <button className="btn-secondary">Download Data</button>
      </div>

      <div className="border border-purple-500 rounded-xl p-4">
        <div className="flex gap-2 mb-4">
          <button className="btn-outline">Filter</button>
          <input className="input w-[300px]" placeholder="Search..." />
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th><input type="checkbox" /></th>
              <th>ID</th>
              <th>Invoice</th>
              <th>File</th>
              <th>Payment Reference</th>
              <th>Metode</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td><input type="checkbox" /></td>
                <td>{item.id}</td>
                <td>{item.invoice}</td>
                <td>{item.file}</td>
                <td>{item.reference}</td>
                <td>{item.metode}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn-outline">{'<'}</button>
          <button className="btn-outline">1</button>
          <button className="btn-outline">2</button>
          <button className="btn-outline">{'>'}</button>
        </div>
      </div>
    </section>
  )
}
