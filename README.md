# Anime-Reddit Starter (Next.js)

Это минимальная заготовка проекта Next.js (App Router) для сайта «аниме + сообщество».

## Установка
1. Распакуй zip.
2. В терминале внутри папки проекта:
   ```bash
   npm install
   npm run dev
   ```
3. Открой http://localhost:3000

## Что в проекте
- `src/app/page.js` — главная страница
- `src/app/anime/[id]/page.js` — просмотр аниме (заглушка)
- `src/app/community/page.js` — список веток
- `src/app/community/[id]/page.js` — страница ветки с постами
- `src/app/profile/[user]/page.js` — профиль пользователя
- `src/components/*` — базовые компоненты Header/Footer/Post/AnimeCard/Comment
- `src/styles/globals.css` — глобальные стили (plain CSS)

## Примечания
- Это стартовый шаблон: чтобы подключить базу данных, аутентификацию и плеер — добавь необходимые пакеты и API.
- Проект использует обычные CSS-файлы (не Tailwind).
