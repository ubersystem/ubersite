import express from 'express';

import usersController from '../controllers/api/usersController';

var router = express.Router();

router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.getById);
router.post('/users', usersController.insert);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.remove);

export default router;