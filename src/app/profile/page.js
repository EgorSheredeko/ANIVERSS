// src/app/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // для регистрации с email
  const [mode, setMode] = useState("login"); // login / register
  const [error, setError] = useState("");

  useEffect(() => {
    // Если пользователь уже есть в localStorage, редиректим
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      router.push(`/profile/${user.username}`);
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || (mode === "register" && !email)) {
      setError("Заполните все поля");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (mode === "login") {
      if (!users[username] || users[username].password !== password) {
        setError("Неверный логин или пароль");
        return;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({ username, avatar: users[username].avatar, email: users[username].email })
      );
      router.push(`/profile/${username}`);
    } else {
      if (users[username]) {
        setError("Пользователь уже существует");
        return;
      }
      const avatar = "/default-avatar.png";
      users[username] = { password, email, avatar };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify({ username, avatar, email }));
      router.push(`/profile/${username}`);
    }
  };

  return (
    <div className="auth-page fade-in">
      <h1>{mode === "login" ? "Войти в профиль" : "Создать аккаунт"}</h1>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {mode === "register" && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{mode === "login" ? "Войти" : "Создать аккаунт"}</button>
      </form>
      <p className="switch-mode">
        {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
        <span
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login" ? "Создать" : "Войти"}
        </span>
      </p>
    </div>
  );
}
