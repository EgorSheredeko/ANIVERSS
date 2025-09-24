"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }) {
  const router = useRouter();
  const usernameParam = params.username;

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [watchedAnime, setWatchedAnime] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentUser = users[usernameParam];

    if (!currentUser) {
      router.push("/profile"); // если пользователь не найден
      return;
    }

    setUser(currentUser);
    setNickname(currentUser.nickname || usernameParam);
    setDescription(currentUser.description || "Это ваш профиль...");
    setAvatar(currentUser.avatar || "/avatar.jpg");
    setFollowers(currentUser.followers || 0);
    setFollowing(currentUser.following || 0);
    setAchievements(currentUser.achievements || ["Начало пути"]);
    setWatchedAnime(currentUser.watchedAnime || ["Naruto", "One Piece"]);
  }, [usernameParam, router]);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[usernameParam] = {
      ...users[usernameParam],
      nickname,
      description,
      avatar,
      followers,
      following,
      achievements,
      watchedAnime
    };
    localStorage.setItem("users", JSON.stringify(users));
    setUser(users[usernameParam]);
    setEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 40px 20px", backgroundColor: "#0c0a1a", color: "#e0dff5" }}>
      <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <img src={avatar} alt="Avatar" style={{ width: "150px", height: "150px", borderRadius: "50%", border: "3px solid #f4aa89" }} />
          {editing && <input type="file" accept="image/*" onChange={handleAvatarChange} />}
        </div>
        <div style={{ flex: 1 }}>
          {editing ? (
            <>
              <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Никнейм" style={{ fontSize: "24px", padding: "8px" }} />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" style={{ width: "100%", marginTop: "8px", padding: "8px", fontSize: "16px" }} />
              <button onClick={handleSave} style={{ marginTop: "12px", padding: "8px 16px", backgroundColor: "#a958a5", color: "#fff", borderRadius: "8px" }}>Сохранить</button>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "32px", fontWeight: "700" }}>{nickname}</h2>
              <p>{description}</p>
              <button onClick={() => setEditing(true)} style={{ marginTop: "12px", padding: "8px 16px", backgroundColor: "#f06261", color: "#fff", borderRadius: "8px" }}>Редактировать</button>
            </>
          )}
          <div style={{ marginTop: "16px", display: "flex", gap: "24px" }}>
            <div>Подписчики: {followers}</div>
            <div>Подписки: {following}</div>
          </div>
        </div>
      </div>

      <section style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>Достижения</h3>
        <ul>
          {achievements.map((ach, i) => <li key={i}>{ach}</li>)}
        </ul>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>Просмотренное аниме</h3>
        <ul>
          {watchedAnime.map((anime, i) => <li key={i}>{anime}</li>)}
        </ul>
      </section>
    </div>
  );
}
