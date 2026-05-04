const express = require('express');
const Post = require('../models/Post');
const protect = require('../middleware/auth');

const router = express.Router();

// GET /api/posts — List all posts (public)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const tag = req.query.tag || '';

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (tag) {
      query.tags = tag.toLowerCase();
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/posts/:id — Get single post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/posts — Create post (auth required)
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, excerpt, coverImage, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      excerpt,
      coverImage,
      tags: tags || [],
      author: req.user._id
    });

    await post.populate('author', 'username avatar');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/posts/:id — Update post (author only)
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    const { title, content, excerpt, coverImage, tags } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.coverImage = coverImage !== undefined ? coverImage : post.coverImage;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'username avatar');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/posts/:id — Delete post (author only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
