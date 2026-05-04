import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import api from '../services/api';

const CreatePost = () => {
  const [title, setTitle]           = useState('');
  const [content, setContent]       = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags]             = useState('');
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      await api.post('/posts', { title, content, coverImage, tags: tagArray });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create post. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-up">
      <div className="editor-page">
        <div className="editor-header">
          <h1>Draft Your <span>Masterpiece</span></h1>
          <p>Create a story that resonates with your readers.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="editor-card glass">
            <div className="input-group">
              <label className="input-label">Story Title</label>
              <input
                type="text"
                className="input input-title"
                placeholder="A compelling title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="editor-grid">
              <div className="input-group">
                <label className="input-label">Cover Image URL</label>
                <input
                  type="text"
                  className="input"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="tech, design, life..."
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Content</label>
              <div className="quill-wrap">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder="Start writing your story..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
