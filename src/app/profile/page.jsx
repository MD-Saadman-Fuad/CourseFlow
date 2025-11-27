"use client"

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [localUser] = useState(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null
      return raw ? JSON.parse(raw) : null
    } catch (e) { return null }
  })

  const user = session?.user || localUser
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const id = setTimeout(() => setMounted(true), 0); return () => clearTimeout(id) }, [])

  useEffect(() => {
    if (!mounted) return
    if (status === 'loading') return
    if (!user) router.push('/login')
  }, [mounted, status, user, router])

  if (!user) return <div className="p-8">Redirecting to login…</div>

  // prefer explicit photoUrl, then common image/picture fields
  const avatarUrl = user?.photoUrl || user?.image || user?.picture || null

  const credentials = Object.entries(user)

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center gap-6 mb-6">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={user.name || 'avatar'} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl">{(user.name || '?')[0]}</div>
        )}

        <div>
          <h1 className="text-2xl font-semibold">{user.name || 'Unnamed'}</h1>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="mt-2">
            <button onClick={async () => {
              try { await signOut({ redirect: false }) } catch (e) { }
              try { localStorage.removeItem('currentUser'); window.dispatchEvent(new Event('local-user-changed')) } catch (e) { }
              try { router.push('/') } catch (e) { window.location.href = '/' }
            }} className="btn btn-ghost btn-sm">Sign out</button>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-2">Credentials</h2>
        <div className="bg-white p-4 rounded shadow-sm">
          <ul className="space-y-2">
            {credentials.map(([key, value]) => (
              <li key={key} className="flex justify-between text-sm">
                <strong className="text-gray-700 capitalize">{key}</strong>
                <span className="text-gray-600 wrap-break-word max-w-lg">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Taken Courses</h2>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-gray-600">Your selected/taken courses are shown here when available.</div>
        </div>
      </section>
    </div>
  )
}
