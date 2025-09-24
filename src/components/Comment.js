export default function Comment({ author, text }) {
  return (
    <div className="comment">
      <div className="avatar">{author[0].toUpperCase()}</div>
      <div className="comment-body">
        <div className="meta">{author}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  )
}
