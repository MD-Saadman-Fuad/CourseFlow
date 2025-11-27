"use client";

import { useEffect, useState } from "react";

export default function CourseActions({ courseId, initialSeats, totalSeats, email }) {
    const [enrolled, setEnrolled] = useState(false);
    const [seats, setSeats] = useState(initialSeats ?? 0);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("enrolledCourses");
            const arr = raw ? JSON.parse(raw) : [];
            setEnrolled(arr.includes(String(courseId)));
        } catch (e) {
            setEnrolled(false);
        }
    }, [courseId]);

    function updateLocal(enrolledNow) {
        try {
            const raw = localStorage.getItem("enrolledCourses");
            const arr = raw ? JSON.parse(raw) : [];
            const asStrings = arr.map(String);
            const idStr = String(courseId);
            if (enrolledNow) {
                if (!asStrings.includes(idStr)) asStrings.push(idStr);
            } else {
                const idx = asStrings.indexOf(idStr);
                if (idx !== -1) asStrings.splice(idx, 1);
            }
            localStorage.setItem("enrolledCourses", JSON.stringify(asStrings));
        } catch (e) {
            // ignore
        }
    }

    async function handleAdd() {
        if (seats <= 0) {
            alert("No seats available");
            return;
        }

        // determine user email (prop first, then localStorage)
        let userEmail = email
        try {
            if (!userEmail) {
                const raw = localStorage.getItem('currentUser')
                if (raw) userEmail = JSON.parse(raw).email
            }
        } catch (e) { userEmail = userEmail }

        if (!userEmail) {
            alert('You must be signed in to enroll')
            return
        }

        // optimistic UI
        const prevSeats = seats
        const prevEnrolled = enrolled
        setEnrolled(true)
        setSeats((s) => s - 1)
        updateLocal(true)

        try {
            const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
            // Backend endpoint expected: PUT /users/:email/courses
            // Body: { action: 'add', courseId: '<id>' }
            const url = `${BACKEND}/users/${encodeURIComponent(userEmail)}/courses`
            console.log('Enroll request ->', url)
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add', courseId: String(courseId) })
            })
            if (!res.ok) {
                const text = await res.text().catch(() => null)
                console.error('Enroll failed:', res.status, text)
                throw new Error(text || `Server returned ${res.status}`)
            }
        } catch (err) {
            // rollback
            setEnrolled(prevEnrolled)
            setSeats(prevSeats)
            updateLocal(prevEnrolled)
            alert(err.message || 'Failed to enroll')
        }
    }

    async function handleDrop() {
        let userEmail = email
        try {
            if (!userEmail) {
                const raw = localStorage.getItem('currentUser')
                if (raw) userEmail = JSON.parse(raw).email
            }
        } catch (e) { userEmail = userEmail }

        if (!userEmail) {
            alert('You must be signed in to drop')
            return
        }

        const prevSeats = seats
        const prevEnrolled = enrolled
        setEnrolled(false)
        setSeats((s) => Math.min((s ?? 0) + 1, totalSeats ?? (s ?? 0) + 1))
        updateLocal(false)

        try {
            const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
            // Backend endpoint expected: PUT /users/:email/courses
            // Body: { action: 'remove', courseId: '<id>' }
            const url = `${BACKEND}/users/${encodeURIComponent(userEmail)}/courses`
            console.log('Drop request ->', url)
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'remove', courseId: String(courseId) })
            })
            if (!res.ok) {
                const text = await res.text().catch(() => null)
                console.error('Drop failed:', res.status, text)
                throw new Error(text || `Server returned ${res.status}`)
            }
        } catch (err) {
            // rollback
            setEnrolled(prevEnrolled)
            setSeats(prevSeats)
            updateLocal(prevEnrolled)
            alert(err.message || 'Failed to drop')
        }
    }

    return (
        <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="text-sm text-gray-800">Seats available: <span className="font-medium">{seats}/{totalSeats}</span></div>

            {!enrolled ? (
                <button onClick={handleAdd} className="btn btn-primary btn-sm">Add (Enroll)</button>
            ) : (
                <button onClick={handleDrop} className="btn btn-ghost btn-sm">Drop</button>
            )}
        </div>
    );
}
