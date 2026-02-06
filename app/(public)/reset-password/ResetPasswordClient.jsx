'use client'

import { useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResetPasswordClient() {
  const API = process.env.NEXT_PUBLIC_API_URL
  const sp = useSearchParams()
  const router = useRouter()

  const token = useMemo(() => sp.get('token') || '', [sp])
  const email = useMemo(() => sp.get('email') || '', [sp])

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    try {
      const res = await fetch(`${API}/api/v1/auth/password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirm,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || 'Reset gagal')

      setMsg('Password berhasil direset. Mengarahkan ke login...')
      setTimeout(() => router.push('/login'), 1200)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token || !email) {
    return <p className="text-center mt-20 text-red-400">Link reset tidak valid</p>
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-purple-400/60 bg-black p-8">
        <h1 className="text-center text-2xl font-semibold text-purple-300">
          Reset Password
        </h1>

        <p className="text-center text-sm text-gray-400 mt-1">
          Untuk akun: {decodeURIComponent(email)}
        </p>

        <form onSubmit={submit} className="space-y-4 mt-6">
          <input
            type="password"
            placeholder="Password baru"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-purple-400/50 bg-black px-4 py-2 text-white"
            required
            minLength={8}
          />

          <input
            type="password"
            placeholder="Konfirmasi password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full rounded-lg border border-purple-400/50 bg-black px-4 py-2 text-white"
            required
          />

          <button
            disabled={loading || password !== confirm}
            className="w-full rounded-xl bg-[#2B044D] py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Reset Password'}
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-sm text-green-400">{msg}</p>}
      </div>
    </main>
  )
}
