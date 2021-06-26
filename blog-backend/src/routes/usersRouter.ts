import express from 'express';

import usersController from '@app/controllers/usersController';

const router = express.Router();

/* ------------------------------- User routes ------------------------------ */
// User create function is aliased sign up in the authRouter

router.get('/', usersController.index);
router.get('/:id', usersController.show);

router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

export default router;
