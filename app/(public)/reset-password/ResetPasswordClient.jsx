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
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    try {
      const res = await fetch(`${API}/api/v1/auth/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: passwordConfirmation,
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(
          json?.errors?.password?.[0] ||
          json?.message ||
          'Reset password gagal'
        )
      }

      setMsg('Password berhasil direset')
      setTimeout(() => router.push('/login'), 800)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token || !email) {
    return (
      <div style={{ maxWidth: 420, margin: '40px auto' }}>
        <h1>Reset Password</h1>
        <p>Link reset tidak valid.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1>Reset Password</h1>
      <p style={{ opacity: 0.8 }}>Untuk: {decodeURIComponent(email)}</p>

      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="Password baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          style={{ width: '100%', padding: 12, marginTop: 12 }}
        />

        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          minLength={8}
          required
          style={{ width: '100%', padding: 12, marginTop: 12 }}
        />

        <button
          disabled={loading || password !== passwordConfirmation}
          style={{ width: '100%', padding: 12, marginTop: 12 }}
        >
          {loading ? 'Memproses...' : 'Reset Password'}
        </button>
      </form>

      {msg && <p style={{ marginTop: 16 }}>{msg}</p>}
    </div>
  )
}
