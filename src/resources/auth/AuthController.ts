import { Request, Response } from 'express';
import UserModel from '../users/UserModel';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, created: true });
  } catch (error) {
    console.log(error);
  }
}

const login = async (req: Request, res: Response) => {

}

export default {
  register,
  login,
}
