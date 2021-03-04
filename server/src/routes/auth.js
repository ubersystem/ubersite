import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import authController from '../controllers/auth/authController';

var router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/teste', authMiddleware, authController.teste);

export default router;