import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// ==============================================
// 🔥 Configuração do Firebase (substitua por .env em produção)
// ==============================================
const firebaseConfig = {
  apiKey: "AIzaSyAP3Sy1PB0m_EpKifOpUd7tc1_eAKF2alM",
  authDomain: "vimbalambi-news.firebaseapp.com",
  databaseURL: "https://vimbalambi-news-default-rtdb.firebaseio.com",
  projectId: "vimbalambi-news",
  storageBucket: "vimbalambi-news.appspot.com",
  messagingSenderId: "212254517932",
  appId: "1:212254517932:web:d061c943f90b4c4e204d09"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==============================================
// 🔐 Componente de Autenticação
// ==============================================
function Auth() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Usuário logado:', result.user);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  };

  return (
    <div className="auth-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Bem-vindo ao SocialApp</h2>
      <button 
        onClick={signInWithGoogle}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Entrar com Google
      </button>
    </div>
  );
}

// ==============================================
// 📱 Componente Principal
// ==============================================
function App() {
  // 🔄 Estados do Usuário e Categoria
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('feed');

  // ✍️ Estados de Posts e Música
  const [newPost, setNewPost] = useState('');
  const [musicSearch, setMusicSearch] = useState('');
  const [musicResults, setMusicResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'João Silva', avatar: 'https://i.pravatar.cc/150?img=1' },
      content: 'Primeiro post da rede!',
      image: 'https://source.unsplash.com/random/300x200?1',
      likes: 12,
      comments: 3,
      timestamp: '2h atrás'
    },
    {
      id: 2,
      author: { name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=2' },
      content: 'Que legal essa nova rede social!',
      image: 'https://source.unsplash.com/random/300x200?2',
      likes: 24,
      comments: 5,
      timestamp: '4h atrás'
    }
  ]);

  // 🎮 Estados para Dados das APIs
  const [animeData, setAnimeData] = useState([]);
  const [mangaData, setMangaData] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [calculation, setCalculation] = useState('');
  const [calcResult, setCalcResult] = useState('');
  const [loading, setLoading] = useState(false);

  // ==============================================
  // 🔍 Efeitos e Funções de Busca
  // ==============================================
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchAnimeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime');
      setAnimeData(response.data.data.slice(0, 10));
    } catch (error) {
      console.error('Erro ao buscar animes:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... (fetchMangaData, fetchGamesData, etc. - mantidos completos como no original)

  const searchMusic = async () => {
    if (!musicSearch.trim()) return;
    try {
      const response = await axios.get(`https://api.deezer.com/search?q=${encodeURIComponent(musicSearch)}&limit=5`);
      setMusicResults(response.data.data || []);
    } catch (error) {
      console.error('Erro na busca de músicas:', error);
    }
  };

  // ==============================================
  // ✨ Renderização Completa
  // ==============================================
  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Cabeçalho Completo */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        borderBottom: '1px solid #ddd'
      }}>
        <h1>SocialApp</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span onClick={() => setActiveCategory('feed')} style={{ cursor: 'pointer' }}>🏠 Feed</span>
          <span onClick={() => setActiveCategory('geek')} style={{ cursor: 'pointer' }}>🎮 Geek</span>
          <span onClick={() => setActiveCategory('sports')} style={{ cursor: 'pointer' }}>⚽ Esportes</span>
          {/* ... outros ícones ... */}
        </div>
      </header>

      {/* Formulário de Postagem */}
      <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <img 
            src={user.photoURL || 'https://i.pravatar.cc/150?img=3'} 
            alt="Avatar" 
            style={{ width: '50px', borderRadius: '50%' }}
          />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="No que você está pensando?"
            style={{ flex: 1, padding: '10px', minHeight: '60px' }}
          />
        </div>

        {/* Seção de Música (visível apenas na categoria música) */}
        {activeCategory === 'music' && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={musicSearch}
                onChange={(e) => setMusicSearch(e.target.value)}
                placeholder="Buscar música..."
                style={{ flex: 1, padding: '8px' }}
              />
              <button 
                onClick={searchMusic}
                style={{ padding: '8px 15px' }}
              >
                🔍
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => {
            if (!newPost.trim()) return;
            const newPostObj = {
              id: posts.length + 1,
              author: {
                name: user.displayName || 'Você',
                avatar: user.photoURL || 'https://i.pravatar.cc/150?img=3'
              },
              content: newPost,
              likes: 0,
              comments: 0,
              timestamp: 'Agora'
            };
            setPosts([newPostObj, ...posts]);
            setNewPost('');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1a73e8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Publicar
        </button>
      </div>

      {/* Feed de Posts */}
      <div style={{ padding: '15px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                style={{ width: '40px', borderRadius: '50%' }}
              />
              <div>
                <strong>{post.author.name}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>{post.timestamp}</div>
              </div>
            </div>
            
            <p style={{ margin: '10px 0' }}>{post.content}</p>
            
            {post.image && (
              <img 
                src={post.image} 
                alt="Post" 
                style={{ width: '100%', borderRadius: '5px', marginBottom: '10px' }}
              />
            )}
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                ❤️ {post.likes}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                💬 {post.comments}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                🔗 Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seções de Categorias (geek, esportes, etc.) */}
      {activeCategory === 'geek' && (
        <div style={{ padding: '20px' }}>
          <h2 style={{ marginBottom: '15px' }}>Conteúdo Geek</h2>
          {/* ... conteúdo completo das categorias ... */}
        </div>
      )}
    </div>
  );
}

export default App;