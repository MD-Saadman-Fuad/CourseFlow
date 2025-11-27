"use client";

import { useEffect, useState } from "react";

export default function CourseActions({ courseId, initialSeats, totalSeats }) {
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

    function handleAdd() {
        if (seats <= 0) {
            alert("No seats available");
            return;
        }
        setEnrolled(true);
        setSeats((s) => s - 1);
        updateLocal(true);
        alert("You have been added to the course (local demo)");
    }

    function handleDrop() {
        setEnrolled(false);
        setSeats((s) => Math.min((s ?? 0) + 1, totalSeats ?? s + 1));
        updateLocal(false);
        alert("You have been removed from the course (local demo)");
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
