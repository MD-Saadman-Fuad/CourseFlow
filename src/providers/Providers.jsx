"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
            <AuthSync />
        </SessionProvider>
    )
}

function AuthSync() {
    // must be a child of SessionProvider
    const { useEffect } = React
    const { useState } = React
    const { useSession } = require('next-auth/react')
    const { data: session } = useSession()

    useEffect(() => {
        try {
            // Always attempt to migrate any existing local `currentUser` entry first
            try {
                const rawExisting = localStorage.getItem('currentUser')
                if (rawExisting) {
                    const parsedExisting = JSON.parse(rawExisting)
                    // if there's a photoUrl/picture but image is missing, set image
                    if ((parsedExisting.photoUrl || parsedExisting.picture) && !parsedExisting.image) {
                        parsedExisting.image = parsedExisting.photoUrl || parsedExisting.picture || null
                        localStorage.setItem('currentUser', JSON.stringify(parsedExisting))
                    }

                    // If we still don't have an image but we have an id or email, try fetching the full user
                    if (!parsedExisting.image && (parsedExisting.email || parsedExisting.id)) {
                        (async () => {
                            try {
                                const BACKEND = (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_BACKEND_URL) ? process.env.NEXT_PUBLIC_BACKEND_URL : 'http://localhost:3001'
                                let url = `${BACKEND}/users`
                                if (parsedExisting.id && !parsedExisting.email) {
                                    url = `${BACKEND}/users/${parsedExisting.id}`
                                } else if (parsedExisting.email) {
                                    url = `${BACKEND}/users?email=${encodeURIComponent(parsedExisting.email)}`
                                }
                                const res = await fetch(url)
                                if (!res.ok) return
                                const data = await res.json()
                                let remote = null
                                if (Array.isArray(data)) remote = data[0]
                                else remote = data
                                if (remote) {
                                    const newImage = remote.photoUrl || remote.image || remote.picture || null
                                    if (newImage) {
                                        parsedExisting.image = newImage
                                        parsedExisting.photoUrl = parsedExisting.photoUrl || remote.photoUrl || null
                                        localStorage.setItem('currentUser', JSON.stringify(parsedExisting))
                                        window.dispatchEvent(new Event('local-user-changed'))
                                    }
                                }
                            } catch (e) {
                                // ignore fetch errors (CORS/backend unreachable etc.)
                            }
                        })()
                    }
                }
            } catch (m) {
                // ignore migration errors
            }
            if (session && session.user) {
                // normalize user so front-end always has an `image` field
                const u = session.user || {}
                const normalized = {
                    ...u,
                    image: u.photoUrl || u.image || u.picture || null,
                }
                localStorage.setItem('currentUser', JSON.stringify(normalized))
            } else {
                // no active NextAuth session: leave localStorage for local auth flows
                // when there's no session we don't remove local storage right away — leave it for local auth flows
            }
            // notify other components in same window
            window.dispatchEvent(new Event('local-user-changed'))
        } catch (e) {
            // ignore
        }
    }, [session])

    return null
}
