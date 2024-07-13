import { Request, Response, NextFunction } from 'express';
import ReminderModel from './ReminderModel';
import ReminderInterface from './ReminderInterface';
const asyncHandler = require("express-async-handler");

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const { title, note, date_time, reminder_sent } = req.body;


    res.status(200).json({ success: true, data: {user: user }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
export default {
  store
};
