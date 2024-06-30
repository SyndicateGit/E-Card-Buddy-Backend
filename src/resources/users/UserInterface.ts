import { Document } from 'mongoose';
// Define the User Model Interface
interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export default UserInterface;
