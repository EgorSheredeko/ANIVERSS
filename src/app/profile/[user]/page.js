'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function ProfilePage() {
  const { user } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [watchedAnime, setWatchedAnime] = useState([]);
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Загрузка данных профиля
  useEffect(() => {
    async function fetchProfile() {
      const { data: profileData, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', user)
        .single();
      if (error) console.error(error);
      else setProfile(profileData);
    }

    async function fetchPosts() {
      const { data: postsData, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user', user)
        .order('created_at', { ascending: false });
      if (!error) setPosts(postsData);
    }

    async function fetchAchievements() {
      const { data: achData } = await supabase
        .from('achievements')
        .select('*')
        .eq('user', user);
      if (achData) setAchievements(achData);
    }

    async function fetchAnimeLists() {
      const { data: watched } = await supabase
        .from('watched_anime')
        .select('*')
        .eq('user', user);
      const { data: favorite } = await supabase
        .from('favorite_anime')
        .select('*')
        .eq('user', user);
      if (watched) setWatchedAnime(watched);
      if (favorite) setFavoriteAnime(favorite);
    }

    fetchProfile();
    fetchPosts();
    fetchAchievements();
    fetchAnimeLists();
  }, [user]);

  // Обновление аватарки
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    const fileName = `${user}-${Date.now()}`;
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (!error) {
      const url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl;
      await supabase.from('users').update({ avatar: url }).eq('username', user);
      setProfile({ ...profile, avatar: url });
    }
  };

  // Удаление поста
  const handleDeletePost = async (id) => {
    await supabase.from('posts').delete().eq('id', id);
    setPosts(posts.filter(p => p.id !== id));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      {/* Верхний блок: аватар + инфо */}
      <div className="profile-header">
        <div className="profile-avatar-large" onClick={() => document.getElementById('avatarInput').click()}>
          <img src={profile.avatar || '/default-avatar.png'} alt="Avatar" />
          <input
            type="file"
            id="avatarInput"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <div className="avatar-overlay">Сменить аватарку</div>
        </div>
        <div className="profile-info">
          <h2>{profile.username}</h2>
          <p>{profile.bio || 'Пока нет информации о пользователе'}</p>
          <div className="profile-buttons">
            <button>Изменить профиль</button>
            <button>Настройки конфиденциальности</button>
          </div>
        </div>
      </div>

      {/* Достижения */}
      <section className="achievements-section">
        <h2>Достижения</h2>
        <div className="achievements">
          {achievements.length > 0 ? achievements.map(a => (
            <div key={a.id} className="achievement-card">
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          )) : <p>Пока нет достижений</p>}
        </div>
      </section>

      {/* Списки аниме */}
      <section className="anime-lists">
        <div className="anime-list">
          <h3>Просмотренные</h3>
          {watchedAnime.length > 0 ? watchedAnime.map(a => (
            <div key={a.id} className="anime-item">
              <img src={a.cover || '/default-anime.png'} alt={a.title} />
              <span>{a.title}</span>
            </div>
          )) : <p>Нет просмотренных аниме</p>}
        </div>
        <div className="anime-list">
          <h3>Избранные</h3>
          {favoriteAnime.length > 0 ? favoriteAnime.map(a => (
            <div key={a.id} className="anime-item">
              <img src={a.cover || '/default-anime.png'} alt={a.title} />
              <span>{a.title}</span>
            </div>
          )) : <p>Нет избранного аниме</p>}
        </div>
      </section>

      {/* Посты пользователя */}
      <section className="user-posts">
        <h2>Посты</h2>
        {posts.length > 0 ? posts.map(p => (
          <div key={p.id} className="user-post-card">
            <p>{p.content}</p>
            <button onClick={() => handleDeletePost(p.id)}>Удалить</button>
          </div>
        )) : <p>Пользователь пока не публиковал посты</p>}
      </section>
    </div>
  );
}
