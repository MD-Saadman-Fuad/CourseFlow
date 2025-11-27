"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) return setError("Please fill all fields");
    if (password !== confirm) return setError("Passwords do not match");
    setLoading(true);

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      const res = await fetch(`${BACKEND}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, photoUrl }),
      })
      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        throw new Error(e?.message || 'Failed to register')
      }
      const data = await res.json().catch(() => ({}))
      // registration success — navigate to login
      router.push('/login')
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  function handleSocial(provider) {
    alert(`${provider} sign-in is not configured on this demo.\nTo enable, set up OAuth and NextAuth.`);
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

      <div className="space-y-4 mb-4">
        <button onClick={() => handleSocial('Google')} className="btn btn-outline w-full">Continue with Google</button>
        <button onClick={() => handleSocial('GitHub')} className="btn btn-outline w-full">Continue with GitHub</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow-sm">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="input input-bordered w-full" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="input input-bordered w-full" />
        <input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="Photo URL (optional)" type="url" className="input input-bordered w-full" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="input input-bordered w-full" />
        <input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" type="password" className="input input-bordered w-full" />

        <div className="flex justify-between items-center">
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
          <a href="/login" className="text-sm text-gray-600">Already have an account?</a>
        </div>
      </form>
    </div>
  );
}
