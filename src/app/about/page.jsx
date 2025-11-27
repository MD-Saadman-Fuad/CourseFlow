import React from "react";

export default function page() {
    return (
        <main className="bg-base-100 text-base-content">
            {/* Hero */}
            <section className="bg-linear-to-r from-primary to-secondary text-white py-20">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About CourseFlow</h1>
                    <p className="text-lg sm:text-xl opacity-90 mb-6">
                        We help students discover, enroll, and manage university courses with
                        a clean, responsive interface built for clarity and speed.
                    </p>
                    <div className="flex gap-3">
                        <a href="/courses" className="btn btn-primary">Browse Courses</a>
                        <a href="/login" className="btn btn-ghost">Get Started</a>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                        <p className="mb-4 text-muted">
                            Make course discovery and enrollment simple for every student.
                            We focus on clear information, helpful workflows, and reliable
                            tools so students can make informed decisions quickly.
                        </p>

                        <h3 className="font-medium">What we value</h3>
                        <ul className="list-inside list-disc mt-2 text-muted">
                            <li>Accessibility & clarity</li>
                            <li>Fast, predictable UX</li>
                            <li>Privacy-first by design</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-base-200">
                            <h4 className="font-semibold">For Students</h4>
                            <p className="text-sm text-muted">Find courses, read details, and track registrations.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-base-200">
                            <h4 className="font-semibold">For Administrators</h4>
                            <p className="text-sm text-muted">Manage course listings and monitor enrollments.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-base-200 ">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
                        <article className="p-6 bg-white rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold mb-2">Course Catalog</h3>
                            <p className="text-sm text-muted">Searchable catalog with essential course metadata and quick links.</p>
                        </article>
                        <article className="p-6 bg-white rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold mb-2">Student Profiles</h3>
                            <p className="text-sm text-muted">Keep track of enrolled courses, schedules, and grades.</p>
                        </article>
                        <article className="p-6 bg-white rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold mb-2">Admin Tools</h3>
                            <p className="text-sm text-muted">Add and manage courses with a simple interface.</p>
                        </article>
                        <article className="p-6 bg-white rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold mb-2">Secure Auth</h3>
                            <p className="text-sm text-muted">Login with credentials or social providers (Google).</p>
                        </article>
                        <article className="p-6 bg-white rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold mb-2">Responsive Design</h3>
                            <p className="text-sm text-muted">Works across phones, tablets, and desktops.</p>
                        </article>
                        <article className="p-6 bg-white rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold mb-2">Fast APIs</h3>
                            <p className="text-sm text-muted">Lightweight backend routes for quick read/write operations.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Stats / Quick numbers */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-base-200 rounded">
                        <div className="text-3xl font-bold">1200+</div>
                        <div className="text-sm text-muted">Students served</div>
                    </div>
                    <div className="p-6 bg-base-200 rounded">
                        <div className="text-3xl font-bold">350+</div>
                        <div className="text-sm text-muted">Courses listed</div>
                    </div>
                    <div className="p-6 bg-base-200 rounded">
                        <div className="text-3xl font-bold">99.9%</div>
                        <div className="text-sm text-muted">Uptime</div>
                    </div>
                </div>
            </section>

            {/* Team / Testimonials */}
            <section className="py-12 bg-base-200 ">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6">Our Team & Testimonials</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
                        <div className="p-6 bg-white rounded shadow-sm text-center">
                            <div className="h-20 w-20 rounded-full bg-primary mx-auto mb-3" />
                            <div className="font-semibold">Alex Johnson</div>
                            <div className="text-sm text-muted mb-2">Product Lead</div>
                            <p className="text-sm text-muted">&ldquo;CourseFlow made coordinating my schedule effortless.&rdquo;</p>
                        </div>

                        <div className="p-6 bg-white rounded shadow-sm text-center">
                            <div className="h-20 w-20 rounded-full bg-primary mx-auto mb-3" />
                            <div className="font-semibold">Priya Patel</div>
                            <div className="text-sm text-muted mb-2">Engineering</div>
                            <p className="text-sm text-muted">&ldquo;Fast, reliable, and easy to use—our students love it.&rdquo;</p>
                        </div>

                        <div className="p-6 bg-white rounded shadow-sm text-center">
                            <div className="h-20 w-20 rounded-full bg-primary mx-auto mb-3" />
                            <div className="font-semibold">Student Reviewer</div>
                            <div className="text-sm text-muted mb-2">University Student</div>
                            <p className="text-sm text-muted">&ldquo;Helps me pick courses that fit my workload and interests.&rdquo;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4 bg-linear-to-r from-secondary/10 to-primary/10 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-semibold mb-3">Ready to simplify course selection?</h3>
                    <p className="text-muted mb-4">Sign up and start exploring tailored course recommendations.</p>
                    <div className="flex justify-center gap-3">
                        <a href="/login" className="btn btn-primary">Create Account</a>
                        <a href="/items" className="btn btn-ghost">Browse Courses</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
