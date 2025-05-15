
import React, { useState } from 'react';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { brightness, saturation, contrast } from '@cloudinary/url-gen/actions/adjust';

const MediaEditor = ({ file, onSave }) => {
  const [bright, setBright] = useState(0);
  const [sat, setSat] = useState(0);
  const [cont, setCont] = useState(0);

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
        <button onClick={() => onSave(myImage.toURL())}>Salvar</button>
      </div>
    </div>
  );
};

export default MediaEditor;
