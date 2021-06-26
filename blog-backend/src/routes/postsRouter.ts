import express from 'express';

import postsController from '@app/controllers/postsController';

const router = express.Router();

/* ------------------------------- User routes ------------------------------ */
router.get('/', postsController.index);
router.post('/', postsController.create);
router.get('/:id', postsController.show);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.delete);

export default router;
