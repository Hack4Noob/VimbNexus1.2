
import React, { useState } from 'react';
import MediaEditor from './MediaEditor';

const MediaUpload = ({ onUpload, type = "all" }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setMediaFile(data);
      setIsEditing(true);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  const handleSave = (url) => {
    onUpload(url);
    setIsEditing(false);
    setMediaFile(null);
  };

  return (
    <div className="media-upload">
      {!isEditing ? (
        <input 
          type="file" 
          onChange={handleUpload}
          accept={type === "image" ? "image/*" : type === "video" ? "video/*" : "image/*,video/*"}
        />
      ) : (
        <MediaEditor file={mediaFile} onSave={handleSave} />
      )}
    </div>
  );
};

export default MediaUpload;
