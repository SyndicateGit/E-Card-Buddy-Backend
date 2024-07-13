import { Router } from 'express';
import ReminderController from './ReminderController';

const router = Router();

// define routes
router.post('/store', ReminderController.store);

export default router;
