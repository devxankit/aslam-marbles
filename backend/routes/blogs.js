const express = require('express');
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  updateDisplayOrder
} = require('../controllers/blogController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

router.post('/', auth, adminOnly, createBlog);
router.put('/:id', auth, adminOnly, updateBlog);
router.delete('/:id', auth, adminOnly, deleteBlog);
router.put('/order/update', auth, adminOnly, updateDisplayOrder);

module.exports = router;

