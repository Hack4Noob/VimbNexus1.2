
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [activeCategory, setActiveCategory] = useState('feed')
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
        name: 'Você',
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
          <span onClick={() => setActiveCategory('feed')}>🏠</span>
          <span onClick={() => setActiveCategory('geek')}>🎮</span>
          <span onClick={() => setActiveCategory('sports')}>⚽</span>
          <span onClick={() => setActiveCategory('health')}>🏥</span>
          <span onClick={() => setActiveCategory('science')}>🔬</span>
          <span onClick={() => setActiveCategory('news')}>📰</span>
          <span onClick={() => setActiveCategory('music')}>🎵</span>
        </div>
      </header>

      <div className="categories-nav">
        <button className={activeCategory === 'feed' ? 'active' : ''} onClick={() => setActiveCategory('feed')}>Feed</button>
        <button className={activeCategory === 'geek' ? 'active' : ''} onClick={() => setActiveCategory('geek')}>Geek</button>
        <button className={activeCategory === 'sports' ? 'active' : ''} onClick={() => setActiveCategory('sports')}>Desporto</button>
        <button className={activeCategory === 'health' ? 'active' : ''} onClick={() => setActiveCategory('health')}>Saúde</button>
        <button className={activeCategory === 'science' ? 'active' : ''} onClick={() => setActiveCategory('science')}>Ciências</button>
        <button className={activeCategory === 'news' ? 'active' : ''} onClick={() => setActiveCategory('news')}>Notícias</button>
        <button className={activeCategory === 'music' ? 'active' : ''} onClick={() => setActiveCategory('music')}>Música</button>
      </div>

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
          <div className="music-search">
            <input
              type="text"
              value={musicSearch}
              onChange={(e) => setMusicSearch(e.target.value)}
              placeholder="Procurar música..."
            />
            <button onClick={searchMusic}>🔍</button>
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
              <button onClick={() => setSelectedMusic(null)}>✕</button>
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
                <button>❤️ {post.likes}</button>
                <button>💬 {post.comments}</button>
                <button>↗️ Compartilhar</button>
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
              <button>Mangás</button>
              <button>Jogos</button>
            </div>
            <div className="content-grid">
              {animeData.map(anime => (
                <div key={anime.mal_id} className="content-card">
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <h3>{anime.title}</h3>
                  <p>{anime.synopsis}</p>
                  <div className="card-stats">
                    <span>⭐ {anime.score}</span>
                    <span>👥 {anime.members}</span>
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
            <h2>Saúde</h2>
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
            <h2>Ciências</h2>
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
            <h2>Notícias</h2>
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
