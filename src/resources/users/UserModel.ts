import mongoose, { Schema } from 'mongoose';
import UserInterface from './UserInterface';
import bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the User model
const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
