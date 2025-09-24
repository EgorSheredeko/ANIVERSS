import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import '../../styles/globals.css'
export default function Community() {
  const forums = [{id:'general', title:'Общее'}, {id:'recommend', title:'Рекомендации'}, {id:'manga', title:'Манга'}]
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container">
          <h1>Сообщество</h1>
          <ul className="forum-list">
            {forums.map(f => (
              <li key={f.id}><Link href={`/community/${f.id}`}><a>{f.title}</a></Link></li>
            ))}
          </ul>
        </main>
        <Footer />
      </body>
    </html>
  )
}
