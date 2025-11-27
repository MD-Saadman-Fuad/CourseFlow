"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError('Please enter email and password');
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const users = await res.json();
      if (!Array.isArray(users) || users.length === 0) return setError('User not found');
      const user = users[0];

      if (user.password !== password) return setError('Incorrect password');

      localStorage.setItem('currentUser', JSON.stringify({ id: user._id ?? user.id ?? user.email, name: user.name, email: user.email }));
      router.push('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function handleSocial(provider) {
    alert(`${provider} sign-in is not configured in this demo. Use NextAuth and OAuth to enable.`);
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      <div className="space-y-4 mb-4">
        <button onClick={() => handleSocial('Google')} className="btn btn-outline w-full">Continue with Google</button>
        <button onClick={() => handleSocial('GitHub')} className="btn btn-outline w-full">Continue with GitHub</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow-sm">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="input input-bordered w-full" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="input input-bordered w-full" />

        <div className="flex justify-between items-center">
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
          <a href="/register" className="text-sm text-gray-600">Create account</a>
        </div>
      </form>
    </div>
  );
}
