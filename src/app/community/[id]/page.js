import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Post from '../../../components/Post'
import '../../../styles/globals.css'
export default function ForumPage({ params }) {
  const { id } = params
  const posts = [{id:1,title:'Что посмотреть?',author:'hana',votes:10},{id:2,title:'Топ опенингов',author:'taichi',votes:7}]
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container">
          <h1>Ветка: {id}</h1>
          <div className="posts">
            {posts.map(p => <Post key={p.id} post={p} />)}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
