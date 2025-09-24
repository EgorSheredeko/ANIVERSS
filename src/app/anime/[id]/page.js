import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Comment from '../../../components/Comment'
import '../../../styles/globals.css'
export default function AnimePage({ params }) {
  const { id } = params
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container">
          <h1>Просмотр: {id}</h1>
          <div className="player-card">
            <div className="video-placeholder">Здесь будет видеоплеер (плейсер)</div>
            <div className="meta">
              <h2>Название — {id}</h2>
              <p>Описание аниме. Жанры: приключения, сёнэн.</p>
            </div>
          </div>

          <section>
            <h3>Комментарии</h3>
            <Comment author="user1" text="Классный эпизод!" />
            <Comment author="user2" text="Жду следующую серию." />
          </section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
