import Link from 'next/link'

async function getCourses() {
  try {
    const res = await fetch('http://localhost:3001/courses', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

function truncate(text, n = 120) {
  if (!text) return '';
  return text.length > n ? text.slice(0, n).trim() + '…' : text;
}

export default async function page() {
  const courses = await getCourses();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">All Courses</h1>
        <p className="text-sm text-gray-100 mt-2 max-w-2xl">Browse and explore university courses. Use search and filters to narrow results — each card shows essential info at a glance.</p>
      </header>



      <section>
        {courses.length === 0 ? (
          <div className="p-8 text-center text-gray-700 bg-base-200 rounded">No courses found or could not fetch data.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <article key={c._id} className="rounded-lg bg-white p-6 shadow-sm hover:shadow-lg transition">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <span className="px-2 py-1 rounded bg-gray-100 text-xs font-medium">{c.courseCode}</span>
                      <span className="text-xs">{c.level}</span>
                    </div>

                    <h3 className="text-xl text-black font-semibold mt-3 leading-snug">{c.courseName}</h3>
                    <p className="mt-3 text-sm text-gray-800 leading-relaxed max-w-xl">{truncate(c.description, 160)}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${c.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{c.isActive ? 'Active' : 'Inactive'}</div>
                    <div className="text-sm text-gray-800 mt-3">Credits: <span className="font-medium">{c.credits}</span></div>
                    <div className="text-sm text-gray-800 mt-2">Seats: <span className="font-medium">{c.seatsAvailable}/{c.totalSeats}</span></div>
                    <div className="mt-4">
                      <Link id={c._id} href={`/courses/${c._id}`} className="inline-flex items-center px-3 py-1.5 text-gray-800 border rounded text-sm hover:bg-gray-50">Details</Link>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-700 flex flex-wrap gap-3">
                  <div>Dept: {c.department}</div>
                  <div>Category: {c.category}</div>
                  <div>Semester: {Array.isArray(c.semesterOffered) ? c.semesterOffered.join(', ') : c.semesterOffered}</div>
                </div>

                {Array.isArray(c.schedule) && c.schedule.length > 0 && (
                  <div className="mt-4 text-sm text-gray-800">
                    <strong className="text-gray-800">Next session:</strong> {`${c.schedule[0].day} ${c.schedule[0].startTime} - ${c.schedule[0].endTime}`}<span className="text-gray-700"> — {c.schedule.length > 1 ? `${c.schedule.length} sessions` : '1 session'}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
