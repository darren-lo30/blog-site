import express from 'express';
import userController from '@app/controllers/userController';

const router = express.Router();

/* -------------------------------- Home page ------------------------------- */
router.get('/', (req, res, next) => {
  res.redirect('/posts');
});

/* ------------------------------- User routes ------------------------------ */
router.get('/users', userController.index);
router.get('/users/:id', userController.show);

router.post('/users/:id', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

export default router;
