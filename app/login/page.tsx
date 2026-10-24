"use client";

import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setMessage(signUpError.message);
      } else if (data.user) {
        setMessage('Account created. Check your email for confirmation.');
      }
    } else {
      setMessage('Signed in successfully. Redirecting...');
      window.location.href = '/dashboard';
    }

    setLoading(false);
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-mark">RS</div>
          <h1>Welcome back</h1>
          <p>Sign in to your restaurant dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <button type="submit" className="primary-btn full" disabled={loading}>
            {loading ? 'Please wait...' : 'Sign in'}
          </button>

          {message ? <p className="auth-message">{message}</p> : null}
        </form>

        <div className="auth-footer">
          <Link href="/pricing">View plans</Link>
          <Link href="/">Back home</Link>
        </div>
      </div>
    </main>
  );
}
