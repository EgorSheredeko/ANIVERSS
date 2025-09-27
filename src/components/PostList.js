'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function PostList({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user', username)
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
      if (error) console.error(error);
    };

    fetchPosts();
  }, [username]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) setPosts(posts.filter(post => post.id !== id));
  };

  // Проверяем, что posts — массив
  if (!Array.isArray(posts)) return <p>Loading posts...</p>;

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
