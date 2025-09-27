'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';


export default function PostForm({ username, setPosts }) {
  const [text, setText] = useState('');

  const handlePost = async () => {
    if (!text) return;

    const { data, error } = await supabase
      .from('posts')
      .insert([{ username, content: text }])
      .select();

    if (error) console.log('Post error:', error);
    else {
      setPosts(prev => [data[0], ...prev]);
      setText('');
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write something..." />
      <br />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}
