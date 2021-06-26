import express from 'express';

import commentsController from '@app/controllers/commentsController';

const router = express.Router();

/* ------------------------------- User routes ------------------------------ */

router.post('/:parentId', commentsController.create);
router.put('/:id', commentsController.update);
router.delete('/:id', commentsController.delete);

export default router;
