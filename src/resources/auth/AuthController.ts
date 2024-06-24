import { Request, Response } from 'express';
import UserModel from '../users/UserModel';
import jwt from 'jsonwebtoken';
import handleErrors from './AuthErrorHandler';

const maxAge = 3 * 24 * 60 * 60 * 1000 * 1000;
const saltRound = 10;

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge, signed: true});
    res.status(201).json({ user: user._id, created: true, accessToken: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const login = async (req: Request, res: Response) => {

}

export default {
  register,
  login,
}
