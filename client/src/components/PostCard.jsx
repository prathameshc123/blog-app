import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card glass">
      <div className="post-card-img">
        {post.coverImage
          ? <img src={post.coverImage} alt={post.title} />
          : <div className="post-card-img-placeholder">📝</div>
        }
        {post.tags?.length > 0 && (
          <div className="post-card-tags">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-card-body">
        <div className="post-meta">
          <span>{post.author?.username}</span>
          <span className="post-meta-dot"></span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-footer">
          <span className="read-more">Read Story</span>
          <div className="arrow-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </div>
      </div>

      <Link to={`/posts/${post._id}`} className="post-card-link" aria-label={post.title} />
    </div>
  );
};

export default PostCard;
