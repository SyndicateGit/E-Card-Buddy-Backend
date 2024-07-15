import mongoose, { Schema } from 'mongoose';
import ReminderInterface from './ReminderInterface';

const ReminderSchenma = new Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  date_time: {
    type: String,
    required: true,
  },
  reminder_sent: {
    type: Boolean,
    required: true,
    default: false,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const ReminderModel = mongoose.model<ReminderInterface>('Reminder', ReminderSchenma);

export default ReminderModel;