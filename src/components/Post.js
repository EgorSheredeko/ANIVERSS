export default function Post({ title, author, votes = 0 }) {
  return (
    <article className="post">
      <div className="votes">
        <button>▲</button>
        <div>{votes}</div>
        <button>▼</button>
      </div>
      <div className="post-body">
        <h4>{title}</h4>
        <div className="meta">by {author}</div>
      </div>
    </article>
  )
}
