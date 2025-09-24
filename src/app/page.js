// src/app/page.js
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Анимация появления для секций
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? "visible" : ""}`}
    >
      {children}
    </div>
  );
}

// Карточка аниме
function AnimeCard({ anime }) {
  return (
    <div className="anime-card">
      <Image
        src={anime.img}
        alt={anime.title}
        width={256}
        height={360}
        style={{ objectFit: "cover" }}
      />
      <div className="info">
        <h3>{anime.title}</h3>
        <p>{anime.genre}</p>
        <p>⭐ {anime.rating}</p>
      </div>
    </div>
  );
}

// Главная страница
export default function HomePage() {
  const popularAnime = [
    { title: "Naruto", img: "/anime1.jpg", genre: "Action", rating: "8.5" },
    { title: "One Piece", img: "/anime2.jpg", genre: "Adventure", rating: "9.0" },
    { title: "Demon Slayer", img: "/anime3.jpg", genre: "Fantasy", rating: "8.9" },
    { title: "Jujutsu Kaisen", img: "/anime4.jpg", genre: "Action", rating: "8.8" },
  ];

  const topPosts = [
    { user: "SakuraFan", title: "New episode of Naruto!", community: "Naruto", likes: 120 },
    { user: "LuffyLover", title: "One Piece latest theory", community: "One Piece", likes: 95 },
    { user: "DemonHunter", title: "Demon Slayer fanart", community: "Demon Slayer", likes: 80 },
  ];

  const genres = ["Action", "Adventure", "Fantasy", "Romance", "Comedy", "Mystery", "Slice of Life"];

  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection>
        <section className="hero">
          <h1>AniVers</h1>
          <p>Watch, Share & Discuss Your Favorite Anime</p>
          <a href="#popular">Explore</a>
        </section>
      </AnimatedSection>

      {/* Popular Anime */}
      <AnimatedSection>
        <section id="popular">
          <h2>Popular Anime</h2>
          <div className="anime-grid">
            {popularAnime.map((anime, index) => (
              <AnimeCard key={index} anime={anime} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Genres Section */}
      <AnimatedSection>
        <section id="genres">
          <h2>Genres</h2>
          <div className="anime-grid">
            {genres.map((genre, i) => (
              <div
                key={i}
                className="anime-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "120px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  background: "linear-gradient(90deg, #f06261, #a958a5)",
                  color: "#fff",
                }}
              >
                {genre}
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Top Posts Section */}
      <AnimatedSection>
        <section id="top-posts">
          <h2>Top Posts</h2>
          <div className="anime-grid">
            {topPosts.map((post, index) => (
              <div key={index} className="post-card">
                <h3>{post.title}</h3>
                <p>Community: {post.community}</p>
                <p>By: {post.user}</p>
                <p>❤️ {post.likes}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer>
          <h3>AniVers</h3>
          <p>© 2025 AniVers. All rights reserved.</p>
          <div>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
          </div>
        </footer>
      </AnimatedSection>
    </main>
  );
}
