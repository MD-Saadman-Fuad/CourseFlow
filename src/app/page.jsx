import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">CourseFlow — Simplify Course Selection</h1>
              <p className="mt-4 text-gray-700 max-w-xl">Discover, enroll, and manage university courses with clarity and confidence. A modern interface designed for students and administrators alike.</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/courses" className="inline-block bg-primary text-white px-5 py-3 rounded-md font-medium shadow hover:opacity-95">Browse Courses</Link>
                <Link href="/login" className="inline-block border border-gray-200 px-5 py-3 rounded-md text-gray-800 hover:bg-gray-50">Sign in / Register</Link>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <div className="text-xl font-semibold text-gray-900">1200+</div>
                  <div>Students</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">350+</div>
                  <div>Courses</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">99.9%</div>
                  <div>Uptime</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md bg-linear-to-br from-gray-100 to-white rounded-xl p-6 shadow-md">
                <Image src="/logo.svg" alt="logo" width={240} height={80} />
                <div className="mt-4 text-gray-700">Quickly search and preview course details, schedules, and seat availability. Use the catalog to filter and find courses that match your degree plan.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Core features</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">Designed for clarity, speed, and accessibility — features focused on real student needs.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Course Catalog</h3>
              <p className="text-sm text-gray-600">Searchable, filterable catalog with essential course metadata.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Student Profiles</h3>
              <p className="text-sm text-gray-600">Track enrollments, schedules, and academic progress.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Admin Tools</h3>
              <p className="text-sm text-gray-600">Add, edit, and manage course offerings with ease.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Secure Auth</h3>
              <p className="text-sm text-gray-600">Social and credential sign-in powered by NextAuth (demo).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Ready to streamline your course planning?</h3>
            <p className="text-gray-600 mt-2">Sign up to get personalized recommendations, track seats, and manage enrollments.</p>
          </div>
          <div>
            <Link href="/login" className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium">Get Started</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div>© {new Date().getFullYear()} CourseFlow — Built for universities.</div>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
