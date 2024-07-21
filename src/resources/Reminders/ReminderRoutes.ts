import { Router } from 'express';
import ReminderController from './ReminderController';

const router = Router();

// define routes
router.post('/store', ReminderController.store);
router.get('/getReminders', ReminderController.getReminders);
router.delete('/delete/:id', ReminderController.deleteReminder);

export default router;
