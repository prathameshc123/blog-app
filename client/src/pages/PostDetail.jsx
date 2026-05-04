import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { id }       = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user }     = useAuth();
  const navigate     = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate('/');
    } catch {
      alert('Failed to delete post.');
    }
  };

  if (loading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!post)   return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Post not found.</div>;

  const isAuthor = user && post.author && user._id === post.author._id;

  return (
    <div className="container fade-up">
      <article className="post-detail">
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="post-cover" />
        )}

        {post.tags?.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
          </div>
        )}

        <h1 className="post-title">{post.title}</h1>

        <div className="post-byline">
          <div className="post-author">
            <div className="author-avatar">
              {post.author?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="author-name">{post.author?.username}</p>
              <p className="author-date">
                {new Date(post.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="post-actions">
              <Link to={`/posts/${id}/edit`} className="btn btn-outline">Edit</Link>
              <button onClick={handleDelete} className="btn-danger">Delete</button>
            </div>
          )}
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default PostDetail;
