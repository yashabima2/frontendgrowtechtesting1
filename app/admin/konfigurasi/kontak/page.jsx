'use client'

import { useEffect, useState } from 'react'
import SectionCard from '../../../components/admin/SectionCard'
// import ActionButtons from '../../../../components/admin/ActionButtons'
import Modal from '../../../components/ui/Modal'

const CONTACT_TYPES = [
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Email', value: 'email' },
  { label: 'Discord', value: 'discord' },
  { label: 'Instagram', value: 'instagram' },
]

export default function KontakPage() {
  const [contacts, setContacts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const [type, setType] = useState('whatsapp')
  const [value, setValue] = useState('')

  /* ================= LOAD ================= */
  useEffect(() => {
    const saved = localStorage.getItem('kontak_data')
    if (saved) setContacts(JSON.parse(saved))
  }, [])

  /* ================= SAVE ================= */
  const saveContacts = (data) => {
    setContacts(data)
    localStorage.setItem('kontak_data', JSON.stringify(data))
  }

  /* ================= ADD / EDIT ================= */
  const handleSubmit = async () => {
    const token = Cookies.get("token")

    await fetch(`${API}/admin/settings/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        group: "contact",
        data: {
          [type]: value,
        },
      }),
    })

    resetModal()
  }


  const resetModal = () => {
    setModalOpen(false)
    setEditing(null)
    setType('whatsapp')
    setValue('')
  }

  const handleEdit = (item) => {
    setEditing(item)
    setType(item.type)
    setValue(item.value)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (!confirm('Hapus kontak ini?')) return
    saveContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <>
      <SectionCard title="Kelola Kontak">
        <div className="space-y-4">

          <button
            onClick={() => setModalOpen(true)}
            className="bg-purple-700 px-4 py-2 rounded-lg w-fit"
          >
            + Tambah Kontak
          </button>

          {contacts.map(item => (
            <div
              key={item.id}
              className="border border-purple-700 rounded-xl p-4 flex justify-between items-center"
            >
              <span className="capitalize">
                {item.type} - {item.value}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-orange-500 p-2 rounded-lg"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 p-2 rounded-lg"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ================= MODAL ================= */}
      <Modal
        open={modalOpen}
        onClose={resetModal}
        title={editing ? 'Edit Kontak' : 'Tambah Kontak'}
      >
        <div className="space-y-4">
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {CONTACT_TYPES.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <input
            className="input"
            placeholder="Masukkan kontak"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-black px-6 py-2 rounded-lg w-full"
          >
            {editing ? 'Simpan Perubahan' : 'Tambah'}
          </button>
        </div>
      </Modal>
    </>
  )
}
