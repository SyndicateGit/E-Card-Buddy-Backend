import { Router } from 'express';
import UserController from './UserController';

const router = Router();

// define routes
router.route('/getCurrentUser').get(UserController.getCurrentUser);

export default router;
