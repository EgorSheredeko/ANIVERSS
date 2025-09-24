// src/app/profile/[user]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UserProfile() {
  const { user } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser || currentUser.username !== user) {
      router.push("/profile"); // если нет пользователя, редирект на логин
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      setProfile(users[user]);
    }
  }, [user, router]);

  if (!profile) return <p>Загрузка профиля...</p>;

  return (
    <div className="profile-page fade-in">
      <h1>Профиль: {user}</h1>
      <img
        src={profile.avatar}
        alt="Avatar"
        style={{ width: "120px", borderRadius: "50%", marginBottom: "16px" }}
      />
      <p>Email: {profile.email}</p>
      <p>Количество подписчиков: {profile.followers || 0}</p>
      <p>Подписки: {profile.following || 0}</p>
      <p>Описание: {profile.bio || "Пусто"}</p>
      <p>Достижения: {profile.achievements || "Нет"}</p>
      <p>Просмотренные аниме: {profile.watched || "Нет"}</p>
    </div>
  );
}
