'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    setMessage(''); // очищаем предыдущие ошибки
    if (!form.username || !form.email || !form.password) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Registration failed');
        return;
      }

      // Сохраняем пользователя и переходим на профиль
      localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email, avatar: data.avatar || '/avatar.jpg' }));
      router.push(`/profile/${data.username}`);
    } catch (err) {
      console.error('Registration fetch error:', err);
      setMessage('Server error');
    }
  };

  const handleLogin = async () => {
    setMessage('');
    if (!form.email || !form.password) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email, avatar: data.avatar || '/avatar.jpg' }));
      router.push(`/profile/${data.username}`);
    } catch (err) {
      console.error('Login fetch error:', err);
      setMessage('Server error');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>

      {isRegister && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
      />

      <button
        onClick={isRegister ? handleRegister : handleLogin}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      >
        {isRegister ? 'Register' : 'Login'}
      </button>

      <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>

      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
}
