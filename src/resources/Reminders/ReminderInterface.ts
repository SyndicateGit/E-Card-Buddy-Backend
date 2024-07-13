import { Document } from 'mongoose';

interface ReminderInterface extends Document {
  id: string;
  title: string;
  note: string;
  date_time: string;
  reminder_sent: boolean;
}

export default ReminderInterface;
