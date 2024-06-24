import mongoose, { Schema } from 'mongoose';
import UserInterface from './UserInterface';

// Define the User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email already exists!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a Password!'],
    unique: false,
  },
});

// Create the User model
const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
