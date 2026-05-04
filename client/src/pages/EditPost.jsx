import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import api from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle]           = useState('');
  const [content, setContent]       = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags]             = useState('');
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setCoverImage(res.data.coverImage || '');
      setTags(res.data.tags.join(', '));
    }).catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      await api.put(`/posts/${id}`, { title, content, coverImage, tags: tagArray });
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-up">
      <div className="editor-page">
        <div className="editor-header">
          <h1>Edit Your <span>Story</span></h1>
          <p>Polish your post before the world sees it.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="editor-card glass">
            <div className="input-group">
              <label className="input-label">Story Title</label>
              <input
                type="text"
                className="input input-title"
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
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="input"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Content</label>
              <div className="quill-wrap">
                <ReactQuill theme="snow" value={content} onChange={setContent} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
