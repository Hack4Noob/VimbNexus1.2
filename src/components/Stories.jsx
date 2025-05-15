
import React, { useState } from 'react';
import { auth } from '../firebase';
import MediaUpload from './MediaUpload';
import MediaEditor from './MediaEditor';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);

  const handleStoryUpload = async (mediaUrl) => {
    setIsUploading(true);
    try {
      const newStory = {
        id: Date.now(),
        userId: auth.currentUser.uid,
        mediaUrl,
        timestamp: new Date().toISOString(),
        views: [],
        duration: 24 // hours
      };
      setStories([...stories, newStory]);
    } catch (error) {
      console.error('Error uploading story:', error);
    }
    setIsUploading(false);
  };

  return (
    <div className="stories-container">
      <div className="story-upload">
        <MediaUpload onUpload={handleStoryUpload} />
      </div>
      
      <div className="stories-list">
        {stories.map(story => (
          <div key={story.id} className="story-preview">
            <img src={story.mediaUrl} alt="Story preview" />
            <span className="story-timestamp">
              {new Date(story.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {isEditing && currentMedia && (
        <MediaEditor 
          file={currentMedia}
          onSave={(editedUrl) => {
            // Handle edited media
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}
