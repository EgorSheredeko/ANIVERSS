'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.username) setUser(storedUser);
  }, []);

  const profileLink = user ? `/profile/${user.username}` : '/auth';

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1134', zIndex: 1000, boxSizing: 'border-box' }}>
      <Link href="/" style={{ fontSize: '24px', fontWeight: '700', color: '#f4aa89' }}>AniVers</Link>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/community">Community</Link>
        <Link href="/premium">Premium</Link>
        <Link href="/contact">Contact</Link>
        <Link href={profileLink} style={{ display: 'inline-block', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #f4aa89' }}>
          <img src={user?.avatar || '/avatar.jpg'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Link>
      </nav>
    </header>
  );
}
