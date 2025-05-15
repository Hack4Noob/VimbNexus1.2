import React, { useState } from 'react';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { brightness, saturation, contrast } from '@cloudinary/url-gen/actions/adjust';

const MediaEditor = ({ file, onSave }) => {
  const [bright, setBright] = useState(0);
  const [sat, setSat] = useState(0);
  const [cont, setCont] = useState(0);
  const [musicSearch, setMusicSearch] = useState('');
  const [musicResults, setMusicResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
    }
  });

  const myImage = cld.image(file.public_id)
    .resize(fill().width(800).height(600))
    .adjust(brightness(bright))
    .adjust(saturation(sat))
    .adjust(contrast(cont));

  const searchMusic = async () => {
    try {
      const response = await fetch(`https://api.deezer.com/search/track?q=${musicSearch}`);
      const data = await response.json();
      setMusicResults(data.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  };

  return (
    <div className="media-editor">
      {file.resource_type === 'image' ? (
        <AdvancedImage cldImg={myImage} />
      ) : (
        <AdvancedVideo cldVid={myImage} />
      )}

      <div className="editor-controls">
        <div>
          <label>Brilho</label>
          <input 
            type="range" 
            min="-100" 
            max="100" 
            value={bright} 
            onChange={(e) => setBright(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Saturação</label>
          <input 
            type="range" 
            min="-100" 
            max="100" 
            value={sat} 
            onChange={(e) => setSat(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Contraste</label>
          <input 
            type="range" 
            min="-100" 
            max="100" 
            value={cont} 
            onChange={(e) => setCont(parseInt(e.target.value))}
          />
        </div>
        <button onClick={() => onSave(myImage.toURL(), selectedMusic)}>Salvar</button>

      <div className="music-integration">
        <input
          type="text"
          value={musicSearch}
          onChange={(e) => setMusicSearch(e.target.value)}
          placeholder="Buscar música..."
        />
        <button onClick={searchMusic}>🔍</button>

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
      </div>
    </div>
  );
};

export default MediaEditor;