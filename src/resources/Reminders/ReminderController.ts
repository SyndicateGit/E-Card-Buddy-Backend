import { Request, Response, NextFunction } from 'express';
import ReminderModel from './ReminderModel';
import ReminderInterface from './ReminderInterface';
import { v4 as uuidv4 } from 'uuid';

const asyncHandler = require("express-async-handler");

const store = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const { title, note, date_time, reminder_sent } = req.body;
    const id = uuidv4();

    const reminder = await ReminderModel.create({ id, title, note, date_time, reminder_sent, user_id: user._id });

    res.status(200).json({ success: true, data: {reminder: reminder }});
});

export default {
  store
};
