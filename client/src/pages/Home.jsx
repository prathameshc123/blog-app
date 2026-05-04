import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data.posts))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fade-up">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow"></div>
        <h1 className="hero-title">
          Write. Share.<br />
          <span>Inspire the World.</span>
        </h1>
        <p className="hero-sub">
          The next-generation platform for modern storytellers.
          Built with speed, elegance, and you in mind.
        </p>
      </section>

      {/* Posts */}
      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="section-header">
          <h2>Latest Stories</h2>
          <div className="section-divider"></div>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner"></div></div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => <PostCard key={post._id} post={post} />)}
            {posts.length === 0 && (
              <div className="empty-state glass">
                <div className="empty-icon">✍️</div>
                <p>No stories yet. Be the first to share something amazing!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
