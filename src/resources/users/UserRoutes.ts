import { Router } from 'express';
import userController from './UserController';

const router = Router();

// define routes
router.route('/').get(userController.getCurrentUser);

export default router;
