"use client";
import Link from 'next/link'
import CourseActions from '@/Components/CourseActions'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

export default function CoursePage() {
    const params = useParams();
    const id = params?.id;
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: session, status } = useSession()
    const router = useRouter()
    const [localUser, setLocalUser] = useState(null)

    useEffect(() => {
        if (!id) {
            console.error('No course ID provided');
            return;
        }

        // load local user
        try {
            const raw = localStorage.getItem('currentUser')
            setLocalUser(raw ? JSON.parse(raw) : null)
        } catch (e) {
            setLocalUser(null)
        }

        // if auth status is known and unauthenticated, redirect
        if (status === 'unauthenticated' && !localStorage.getItem('currentUser')) {
            router.push('/login')
            return
        }

        // reset error asynchronously to avoid synchronous setState inside effect
        Promise.resolve().then(() => setError(null));

        // Only fetch course after we know user is present (either session or localUser)
        const userPresent = !!(session?.user || (localStorage.getItem('currentUser')))
        if (!userPresent) {
            // show redirecting/loading until redirect happens
            setLoading(false)
            return
        }

        (async () => {
            try {
                const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
                const res = await fetch(`${BACKEND}/courses/${encodeURIComponent(String(id))}`)
                if (!res.ok) throw new Error(`Course not found (${res.status})`)
                const data = await res.json()
                setCourse(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading course...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    if (!course) return <div className="p-8 text-center">Course not found.</div>;

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <div className="mb-6">
                <Link href="/courses" className="text-sm text-gray-200 hover:underline">← Back to all courses</Link>
            </div>

            <header className="mb-6 ">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-sm text-gray-100">{course.courseCode} · <span className="font-medium">{course.level}</span></div>
                        <h1 className="text-2xl sm:text-3xl font-bold mt-2">{course.courseName}</h1>
                        <div className="text-sm text-gray-100 mt-2">{course.department} • {course.category}</div>
                    </div>
                    <div className="text-right">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${course.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{course.isActive ? 'Active' : 'Inactive'}</div>
                        <div className="text-sm text-gray-100 mt-3">Credits: <span className="font-medium">{course.credits}</span></div>
                    </div>
                </div>
            </header>

            <section className="bg-white rounded-lg p-6 shadow-sm text-black">
                <h2 className="text-lg font-semibold mb-2">Course description</h2>
                <p className="text-gray-800 leading-relaxed mb-4">{course.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Prerequisites</h3>
                        {Array.isArray(course.prerequisites) && course.prerequisites.length > 0 ? (
                            <ul className="list-inside list-disc mt-2 text-gray-700">
                                {course.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        ) : (
                            <div className="text-sm text-gray-600 mt-2">None</div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Semester offered</h3>
                        <div className="text-sm text-gray-700 mt-2">{Array.isArray(course.semesterOffered) ? course.semesterOffered.join(', ') : course.semesterOffered}</div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700">Seats</h3>
                    <div className="text-sm text-gray-800 mt-2">Available: <span className="font-medium">{course.seatsAvailable}</span> / Total: <span className="font-medium">{course.totalSeats}</span></div>
                </div>

                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Schedule</h3>
                    {Array.isArray(course.schedule) && course.schedule.length > 0 ? (
                        <div className="space-y-2 text-sm text-gray-800">
                            {course.schedule.map((s, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div>{s.day}</div>
                                    <div>{s.startTime} — {s.endTime}</div>
                                    <div className="text-gray-600">{s.room}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-600">No schedule available</div>
                    )}
                </div>

                <CourseActions courseId={String(id)} initialSeats={course.seatsAvailable} email={session?.user?.email} totalSeats={course.totalSeats} />
            </section>
        </main>
    );
}
