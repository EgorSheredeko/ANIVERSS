// src/app/profile/[user]/page.js
"use client";

import { useEffect, useState } from "react";

export default function UserProfile({ params }) {
  const { user } = params; // имя пользователя из URL
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.username === user) {
      setCurrentUser(userData);
    }
  }, [user]);

  if (!currentUser) {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: "#e0dff5" }}>
        Пожалуйста, войдите в аккаунт, чтобы увидеть профиль
      </div>
    );
  }

  // Заглушки для подписчиков, ачивок и просмотренного
  const followers = currentUser.followers || 0;
  const following = currentUser.following || 0;
  const achievements = currentUser.achievements || ["Приветствие в AniVers"];
  const watchedAnime = currentUser.watchedAnime || ["Naruto", "One Piece", "Bleach"];

  return (
    <div style={{ maxWidth: "900px", margin: "100px auto 50px auto", color: "#e0dff5" }}>
      {/* Блок пользователя */}
      <div style={{
        display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px",
        backgroundColor: "#1a1134", padding: "24px", borderRadius: "16px", boxShadow: "0 6px 16px rgba(0,0,0,0.5)"
      }}>
        <img 
          src={currentUser.avatar} 
          alt="Аватар" 
          style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "2px solid #f4aa89" }} 
        />
        <div>
          <h1 style={{ fontSize: "36px", margin: "0 0 8px 0" }}>{currentUser.username}</h1>
          <p style={{ margin: "0 0 4px 0" }}>Email: {currentUser.email}</p>
          <p style={{ margin: 0 }}>Описание: {currentUser.description || "Нет описания"}</p>
        </div>
      </div>

      {/* Статистика */}
      <div style={{
        display: "flex", justifyContent: "space-around", marginBottom: "32px",
        backgroundColor: "#1a1134", padding: "16px", borderRadius: "12px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>{followers}</h2>
          <p style={{ margin: 0 }}>Подписчики</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>{following}</h2>
          <p style={{ margin: 0 }}>Подписки</p>
        </div>
      </div>

      {/* Достижения */}
      <div style={{ marginBottom: "32px" }}>
        <h2>Достижения</h2>
        <ul>
          {achievements.map((ach, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>{ach}</li>
          ))}
        </ul>
      </div>

      {/* Просмотренное аниме */}
      <div>
        <h2>Просмотренное аниме</h2>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "12px", padding: 0, listStyle: "none" }}>
          {watchedAnime.map((anime, index) => (
            <li key={index} style={{
              backgroundColor: "#1a1134", padding: "8px 12px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }}>{anime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
