import { Router } from 'express';
import AuthController from './AuthController';

const router: Router = Router();

// define routes
router.post('/');
router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/verifyToken', AuthController.verifyToken);

export default router;
