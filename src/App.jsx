import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function Auth() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <div className="auth-container">
      <h2>Bem-vindo ao SocialApp</h2>
      <button onClick={signInWithGoogle}>Entrar com Google</button>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('feed')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Auth />;
  }
  const [newPost, setNewPost] = useState('')
  const [musicSearch, setMusicSearch] = useState('')
  const [musicResults, setMusicResults] = useState([])
  const [selectedMusic, setSelectedMusic] = useState(null)
  const [animeData, setAnimeData] = useState([])
  const [mangaData, setMangaData] = useState([])
  const [gamesData, setGamesData] = useState([])
  const [sportsData, setSportsData] = useState([])
  const [healthData, setHealthData] = useState([])
  const [scienceData, setScienceData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [calculation, setCalculation] = useState('')
  const [calcResult, setCalcResult] = useState('')
  const [activeSubcategory, setActiveSubcategory] = useState('anime')
  const [loading, setLoading] = useState(false)

  const fetchAnimeData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime')
      setAnimeData(response.data.data.slice(0, 10))
    } catch (error) {
      console.error('Error fetching anime:', error)
    }
  }

  const fetchMangaData = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/manga')
      setMangaData(response.data.data.slice(0, 10))
    } catch (error) {
      console.error('Error fetching manga:', error)
    }
  }

  const fetchGamesData = async () => {
    try {
      const response = await axios.get('https://api.rawg.io/api/games')
      setGamesData(response.data.results)
    } catch (error) {
      console.error('Error fetching games:', error)
    }
  }

  const fetchSportsData = async () => {
    try {
      const response = await axios.get('https://www.scorebat.com/video-api/v3/')
      setSportsData(response.data.response.slice(0, 10))
    } catch (error) {
      console.error('Error fetching sports:', error)
    }
  }

  const fetchHealthData = async () => {
    try {
      const response = await axios.get('https://health.gov/myhealthfinder/api/v3/topicsearch.json')
      setHealthData(response.data.Result.Resources.Resource)
    } catch (error) {
      console.error('Error fetching health:', error)
    }
  }

  const fetchNewsData = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=ao&category=general&pageSize=10')
      setNewsData(response.data.articles)
    } catch (error) {
      console.error('Error fetching news:', error)
    }
  }

  const calculateResult = async () => {
    try {
      const response = await axios.get(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(calculation)}`)
      setCalcResult(response.data)
    } catch (error) {
      console.error('Error calculating:', error)
    }
  }

  useEffect(() => {
    if (activeCategory === 'geek') {
      fetchAnimeData()
      fetchMangaData()
      fetchGamesData()
    } else if (activeCategory === 'sports') {
      fetchSportsData()
    } else if (activeCategory === 'health') {
      fetchHealthData()
    } else if (activeCategory === 'news') {
      fetchNewsData()
    }
  }, [activeCategory])
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'JoÃ£o Silva',
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

  const searchMusic = async () => {
    if (!musicSearch.trim()) return
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(musicSearch)}&limit=5`)
    const data = await response.json()
    setMusicResults(data.data || [])
  }

  const handleNewPost = () => {
    if (!newPost.trim() && !selectedMusic) return

    const post = {
      id: posts.length + 1,
      author: {
        name: 'VocÃª',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: newPost,
      music: selectedMusic,
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
          <span onClick={() => setActiveCategory('feed')}>ðŸ </span>
          <span onClick={() => setActiveCategory('geek')}>ðŸŽ®</span>
          <span onClick={() => setActiveCategory('sports')}>âš½</span>
          <span onClick={() => setActiveCategory('health')}>ðŸ¥</span>
          <span onClick={() => setActiveCategory('science')}>ðŸ”¬</span>
          <span onClick={() => setActiveCategory('news')}>ðŸ“°</span>
          <span onClick={() => setActiveCategory('music')}>ðŸŽµ</span>
        </div>
      </header>

      <div className="categories-nav">
        <button className={activeCategory === 'feed' ? 'active' : ''} onClick={() => setActiveCategory('feed')}>Feed</button>
        <button className={activeCategory === 'geek' ? 'active' : ''} onClick={() => setActiveCategory('geek')}>Geek</button>
        <button className={activeCategory === 'sports' ? 'active' : ''} onClick={() => setActiveCategory('sports')}>Desporto</button>
        <button className={activeCategory === 'health' ? 'active' : ''} onClick={() => setActiveCategory('health')}>SaÃºde</button>
        <button className={activeCategory === 'science' ? 'active' : ''} onClick={() => setActiveCategory('science')}>CiÃªncias</button>
        <button className={activeCategory === 'news' ? 'active' : ''} onClick={() => setActiveCategory('news')}>NotÃ­cias</button>
        <button className={activeCategory === 'music' ? 'active' : ''} onClick={() => setActiveCategory('music')}>MÃºsica</button>
      </div>

      <main className="main-content">
        <Stories />

        <div className="post-form">
          <img src="https://i.pravatar.cc/150?img=3" alt="Your avatar" />
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="No que vocÃª estÃ¡ pensando?"
          />
          <div className="music-search">
            <input
              type="text"
              value={musicSearch}
              onChange={(e) => setMusicSearch(e.target.value)}
              placeholder="Procurar mÃºsica..."
            />
            <button onClick={searchMusic}>ðŸ”</button>
          </div>

          {musicResults.length > 0 && (
            <div className="music-results">
              {musicResults.map(track => (
                <div key={track.id} className="music-result" onClick={() => setSelectedMusic(track)}>
                  <img src={track.album.cover_small} alt={track.title} />
                  <div>
                    <strong>{track.title}</strong>
                    <span>{track.artist.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedMusic && (
            <div className="selected-music">
              <img src={selectedMusic.album.cover_medium} alt={selectedMusic.title} />
              <div>
                <strong>{selectedMusic.title}</strong>
                <span>{selectedMusic.artist.name}</span>
              </div>
              <button onClick={() => setSelectedMusic(null)}>âœ•</button>
            </div>
          )}

          <button onClick={handleNewPost}>Publicar</button>
        </div>

        {activeCategory === 'feed' && (
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
                <button>â¤ï¸ {post.likes}</button>
                <button>ðŸ’¬ {post.comments}</button>
                <button>â†—ï¸ Compartilhar</button>
              </div>
            </article>
          ))}
          </div>
        )}

        {activeCategory === 'geek' && (
          <div className="category-content geek">
            <h2>Mundo Geek</h2>
            <div className="subcategories">
              <button className="active">Animes</button>
              <button>MangÃ¡s</button>
              <button>Jogos</button>
            </div>
            <div className="content-grid">
              {animeData.map(anime => (
                <div key={anime.mal_id} className="content-card">
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <h3>{anime.title}</h3>
                  <p>{anime.synopsis}</p>
                  <div className="card-stats">
                    <span>â­ {anime.score}</span>
                    <span>ðŸ‘¥ {anime.members}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'sports' && (
          <div className="category-content sports">
            <h2>Desporto</h2>
            <div className="sports-grid">
              {sportsData.map(event => (
                <div key={event.title} className="sports-card">
                  <img src={event.thumbnail} alt={event.title} />
                  <h3>{event.title}</h3>
                  <p>{event.competition}</p>
                  <a href={event.matchviewUrl} target="_blank" rel="noopener noreferrer">
                    Ver Highlights
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'health' && (
          <div className="category-content health">
            <h2>SaÃºde</h2>
            <div className="health-grid">
              {healthData.map(item => (
                <div key={item.Id} className="health-card">
                  <h3>{item.Title}</h3>
                  <p>{item.Categories}</p>
                  <a href={item.AccessibleVersion} target="_blank" rel="noopener noreferrer">
                    Ler mais
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'science' && (
          <div className="category-content science">
            <h2>CiÃªncias</h2>
            <div className="calculator">
              <input 
                type="text" 
                value={calculation}
                onChange={(e) => setCalculation(e.target.value)}
                placeholder="Ex: 2 + 2 * 3"
              />
              <button onClick={calculateResult}>Calcular</button>
              {calcResult && <div className="calc-result">Resultado: {calcResult}</div>}
            </div>
          </div>
        )}

        {activeCategory === 'news' && (
          <div className="category-content news">
            <h2>NotÃ­cias</h2>
            <div className="news-grid">
              {newsData.map((news, index) => (
                <div key={index} className="news-card">
                  <img src={news.urlToImage || 'https://via.placeholder.com/300x200'} alt={news.title} />
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    Ler mais
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App