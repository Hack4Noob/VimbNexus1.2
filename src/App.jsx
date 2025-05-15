
import React, { useState } from 'react'

function App() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'João Silva',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: 'Primeiro post da rede!',
      image: 'https://source.unsplash.com/random/1',
      likes: 12,
      comments: 3,
      timestamp: '2h'
    },
    {
      id: 2,
      author: {
        name: 'Maria Santos',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      content: 'Que legal essa nova rede social!',
      image: 'https://source.unsplash.com/random/2',
      likes: 24,
      comments: 5,
      timestamp: '4h'
    }
  ])

  const handleNewPost = () => {
    if (!newPost.trim()) return
    
    const post = {
      id: posts.length + 1,
      author: {
        name: 'Você',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'agora'
    }
    
    setPosts([post, ...posts])
    setNewPost('')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>SocialApp</h1>
        <div className="header-icons">
          <span>🏠</span>
          <span>💬</span>
          <span>🔔</span>
          <span>👤</span>
        </div>
      </header>

      <main className="main-content">
        <div className="stories">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="story">
              <img src={`https://i.pravatar.cc/150?img=${i+5}`} alt="story" />
              <span>User {i}</span>
            </div>
          ))}
        </div>

        <div className="post-form">
          <img src="https://i.pravatar.cc/150?img=3" alt="Your avatar" />
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="No que você está pensando?"
          />
          <button onClick={handleNewPost}>Publicar</button>
        </div>

        <div className="feed">
          {posts.map(post => (
            <article key={post.id} className="post">
              <div className="post-header">
                <img src={post.author.avatar} alt={post.author.name} />
                <div>
                  <strong>{post.author.name}</strong>
                  <span>{post.timestamp}</span>
                </div>
              </div>
              
              <p>{post.content}</p>
              
              {post.image && (
                <img src={post.image} alt="Post content" className="post-image" />
              )}
              
              <div className="post-actions">
                <button>❤️ {post.likes}</button>
                <button>💬 {post.comments}</button>
                <button>↗️ Compartilhar</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
