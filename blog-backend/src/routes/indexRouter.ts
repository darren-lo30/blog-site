import express from 'express';

const router = express.Router();

/* -------------------------------- Home page ------------------------------- */
router.get('/', (req, res, next) => {
  res.redirect('/posts');
});

export default router;
