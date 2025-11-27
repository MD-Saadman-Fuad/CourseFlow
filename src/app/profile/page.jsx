"use client"

import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(false)
  const user = session?.user

  useEffect(() => {
    async function load() {
      setLoading(true)
      // Try to fetch courses from an API endpoint if available
      try {
        const res = await fetch('/api/profile/courses')
        if (res.ok) {
          const json = await res.json()
          setCourses(json.courses || [])
          setLoading(false)
          return
        }
      } catch (e) {
        // ignore and fallback
      }

      // Fallbacks: try session.user.courses, then localStorage, then empty
      if (user && user.courses) {
        setCourses(user.courses)
      } else {
        try {
          const saved = localStorage.getItem('courses')
          setCourses(saved ? JSON.parse(saved) : [])
        } catch (e) {
          setCourses([])
        }
      }
      setLoading(false)
    }

    load()
  }, [session])

  if (status === 'loading') return <div className="p-8">Loading session...</div>

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <div className="bg-white p-6 rounded shadow-sm">
          <p className="mb-4">You are not signed in.</p>
          <div className="flex gap-3">
            <button onClick={() => signIn()} className="btn btn-primary">Sign in</button>
          </div>
        </div>
      </div>
    )
  }

  // Show all available credentials from session.user
  const credentials = Object.entries(user)

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center gap-6 mb-6">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name || 'avatar'} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl">{(user.name || '?')[0]}</div>
        )}

        <div>
          <h1 className="text-2xl font-semibold">{user.name || 'Unnamed'}</h1>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="mt-2">
            <button onClick={() => signOut()} className="btn btn-ghost btn-sm">Sign out</button>
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
          {loading ? (
            <div>Loading courses…</div>
          ) : !courses || courses.length === 0 ? (
            <div className="text-sm text-gray-600">You haven't taken any courses yet.</div>
          ) : (
            <div className="overflow-auto">
              <table className="table-auto w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Instructor</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, i) => (
                    <tr key={c.id || i} className="border-t">
                      <td className="px-3 py-2 align-top">{i + 1}</td>
                      <td className="px-3 py-2 align-top">{c.title || c.name || 'Untitled'}</td>
                      <td className="px-3 py-2 align-top">{c.instructor || c.teacher || '-'}</td>
                      <td className="px-3 py-2 align-top">{c.status || 'enrolled'}</td>
                      <td className="px-3 py-2 align-top">{typeof c.progress === 'number' ? `${c.progress}%` : (c.progress || '-')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
