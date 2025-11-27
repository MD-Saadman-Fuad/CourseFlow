"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname() || '/'
    const { data: session } = useSession()
    const [localUser, setLocalUser] = useState(() => {
        try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null
            return raw ? JSON.parse(raw) : null
        } catch (e) {
            return null
        }
    })

    const displayedUser = session?.user || localUser
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const id = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(id)
    }, [])

    useEffect(() => {
        const handler = () => {
            try {
                const raw = localStorage.getItem('currentUser')
                setLocalUser(raw ? JSON.parse(raw) : null)
            } catch (e) {
                setLocalUser(null)
            }
        }
        window.addEventListener('storage', handler)
        window.addEventListener('local-user-changed', handler)
        return () => {
            window.removeEventListener('storage', handler)
            window.removeEventListener('local-user-changed', handler)
        }
    }, [])

    const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

    const navBtnClass = (path) => {
        if (isActive(path)) return 'btn btn-primary btn-sm'
        return 'btn btn-outline btn-sm'
    }
    return (
        <header className="w-full bg-transparent font-sans">
            <nav className='max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:py-5'>
                <Link href='/' className='flex items-center gap-3'>
                    <Image src='/logo.png' alt='CourseFlow logo' width={40} height={40} className='rounded' />
                    <span className='font-semibold text-lg'>CourseFlow</span>
                </Link>

                <div className="hidden md:flex items-center gap-2 text-sm">
                    <Link href="/" className={navBtnClass('/')}>Home</Link>
                    <Link href="/courses" className={navBtnClass('/courses')}>All Courses</Link>
                    <Link href="/about" className={navBtnClass('/about')}>About</Link>
                    <Link href="/profile" className={navBtnClass('/profile')}>My Profile</Link>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {/* Render server-safe UI initially to avoid hydration mismatch. Only show user details after client mount. */}
                    {!mounted || !displayedUser ? (
                        <>
                            <Link href="/login" className='btn btn-outline btn-sm'>Login</Link>
                            <Link href="/register" className='btn btn-primary btn-sm'>Register</Link>
                        </>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link href="/profile" className='inline-flex items-center gap-2'>
                                {displayedUser.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={displayedUser.image} alt={displayedUser.name || 'avatar'} className='w-8 h-8 rounded-full object-cover' />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm'>{(displayedUser.name || '?')[0]}</div>
                                )}
                                <span className='text-sm'>{displayedUser.name || displayedUser.email}</span>
                            </Link>
                            <button onClick={async () => {
                                try {
                                    // do a programmatic sign out without automatic redirect so we can control cleanup
                                    await signOut({ redirect: false })
                                } catch (e) {
                                    // ignore signOut errors
                                }
                                try { localStorage.removeItem('currentUser'); window.dispatchEvent(new Event('local-user-changed')) } catch (e) { }
                                try { router.push('/') } catch (e) { window.location.href = '/' }
                            }} className='btn btn-ghost btn-sm'>Sign out</button>
                        </div>
                    )}
                </div>

                <div className='md:hidden flex items-center'>
                    <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className='p-2 rounded-md focus:outline-none'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <div className='md:hidden border-t bg-white/80 backdrop-blur-sm'>
                    <div className='max-w-7xl mx-auto flex flex-col gap-2 py-3 px-4'>
                        <Link href='/' className={isActive('/') ? 'btn btn-primary btn-sm w-full' : 'btn btn-outline btn-sm w-full'} onClick={() => setOpen(false)}>Home</Link>
                        <Link href='/courses' className={isActive('/courses') ? 'btn btn-primary btn-sm w-full' : 'btn btn-outline btn-sm w-full'} onClick={() => setOpen(false)}>All Courses</Link>
                        <Link href='/about' className={isActive('/about') ? 'btn btn-primary btn-sm w-full' : 'btn btn-outline btn-sm w-full'} onClick={() => setOpen(false)}>About</Link>
                        <Link href='/profile' className={isActive('/profile') ? 'btn btn-primary btn-sm w-full' : 'btn btn-outline btn-sm w-full'} onClick={() => setOpen(false)}>My Profile</Link>

                        <div className='flex gap-3 pt-2'>
                            {!displayedUser ? (
                                <>
                                    <Link href='/login' className='btn btn-outline btn-sm flex-1' onClick={() => setOpen(false)}>Login</Link>
                                    <Link href='/register' className='btn btn-primary btn-sm flex-1' onClick={() => setOpen(false)}>Register</Link>
                                </>
                            ) : (
                                <>
                                    <Link href='/profile' className='btn btn-ghost btn-sm flex-1' onClick={() => setOpen(false)}>Profile</Link>
                                    <button onClick={async () => {
                                        try {
                                            await signOut({ redirect: false })
                                        } catch (e) { }
                                        try { localStorage.removeItem('currentUser'); window.dispatchEvent(new Event('local-user-changed')) } catch (e) { }
                                        try { router.push('/') } catch (e) { window.location.href = '/' }
                                    }} className='btn btn-outline btn-sm flex-1'>Sign out</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
