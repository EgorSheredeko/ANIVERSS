// путь: /src/app/profile/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // подключение к Supabase
import "../styles/globals.css"; // чтобы стили были

export default function ProfileLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [mode, setMode] = useState("login"); // login / register
  const [step, setStep] = useState("form"); // form / code
  const [error, setError] = useState("");

  // Генерация 6-значного кода
  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      if (!username || !password) {
        setError("Введите логин и пароль");
        return;
      }

      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (!user || user.password !== password) {
        setError("Неверный логин или пароль");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      router.push(`/profile/${username}`);
    } else {
      // регистрация
      if (!username || !password || !email) {
        setError("Заполните все поля");
        return;
      }

      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (existing) {
        setError("Пользователь с таким логином уже существует");
        return;
      }

      // Генерация и сохранение кода
      const newCode = generateCode();
      setSentCode(newCode);

      // Отправка кода на email через Supabase
      const { error: mailError } = await supabase
        .from("email_codes")
        .insert([{ email, code: newCode }]);

      if (mailError) {
        setError("Ошибка отправки кода");
        return;
      }

      setStep("code");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code !== sentCode) {
      setError("Неверный код");
      return;
    }

    // Сохраняем пользователя
    const avatar = "/default-avatar.png";
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ username, password, email, avatar }])
      .select()
      .single();

    if (insertError) {
      setError("Ошибка создания аккаунта");
      return;
    }

    localStorage.setItem("user", JSON.stringify(newUser));
    router.push(`/profile/${username}`);
  };

  return (
    <div className="auth-page fade-in" style={{ padding: "80px 16px", maxWidth: "500px", margin: "0 auto" }}>
      {step === "form" && (
        <>
          <h1>{mode === "login" ? "Войти" : "Регистрация"}</h1>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
            <button type="submit">{mode === "login" ? "Войти" : "Отправить код на email"}</button>
          </form>
          <p className="switch-mode">
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
              {mode === "login" ? "Создать" : "Войти"}
            </span>
          </p>
        </>
      )}
      {step === "code" && (
        <>
          <h1>Введите код из письма</h1>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleVerify} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="Код из письма"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit">Подтвердить и создать аккаунт</button>
          </form>
        </>
      )}
    </div>
  );
}
