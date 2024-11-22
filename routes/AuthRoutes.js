import express from 'express';
import {
    registerUser,
    loginUser,
    handleTokenVerification,
    getUserData,
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-token', handleTokenVerification);
router.get('/getUserData/:id', getUserData);

export default router;
