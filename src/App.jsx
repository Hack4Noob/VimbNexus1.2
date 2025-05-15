
import React, { useState } from 'react'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, author: 'João', content: 'Primeiro post da rede!', likes: 0 },
    { id: 2, author: 'Maria', content: 'Que legal essa nova rede social!', likes: 0 }
  ])

  return (
    <div className="app">
      <header className="header">
        <h1>MinhaRedeSocial</h1>
      </header>
      
      <div className="post-form">
        <textarea placeholder="O que você está pensando?" />
        <button>Postar</button>
      </div>

      <div className="feed">
        {posts.map(post => (
          <div key={post.id} className="post">
            <strong>{post.author}</strong>
            <p>{post.content}</p>
            <button>❤️ {post.likes}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
