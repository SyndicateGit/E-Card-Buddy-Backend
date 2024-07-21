import { Request, Response, NextFunction } from 'express';
import ReminderModel from './ReminderModel';
import ReminderInterface from './ReminderInterface';
import { v4 as uuidv4 } from 'uuid';

const asyncHandler = require("express-async-handler");

const store = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const { title, note, date_time, reminder_sent } = req.body;

    const reminder = await ReminderModel.create({ title, note, date_time, reminder_sent, user_id: user._id });

    res.status(200).json({ success: true, data: {reminder: reminder }});
});

const getReminders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const reminders = await ReminderModel.find({ user_id: user._id })
    .catch((err) => {
      throw new Error(err)
    });

    res.status(200).json({ success: true, data: {reminders: reminders }});
});

const deleteReminder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const reminderId = req.params['id'];

    const reminder = await ReminderModel.findOneAndDelete({ _id: reminderId, user_id: user._id })
    .catch((err) => {
      throw new Error(err)
    });

    res.status(200).json({ success: true, data: {reminder: reminder }});
});

export default {
  store,
  getReminders,
  deleteReminder,
};
