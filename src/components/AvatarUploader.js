'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AvatarUploader({ currentAvatar, username, setProfile }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // Загружаем в Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${username}.${fileExt}`;
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Получаем публичный URL
      const { publicURL } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Обновляем профиль в базе
      const { data: updatedProfile, error: updateError } = await supabase
        .from('users')
        .update({ avatar: publicURL })
        .eq('username', username)
        .select()
        .single();

      if (updateError) throw updateError;
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-avatar">
      <img src={currentAvatar || '/default-avatar.png'} alt="Avatar" />
      <label>
        {uploading ? 'Uploading...' : 'Change Avatar'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}
