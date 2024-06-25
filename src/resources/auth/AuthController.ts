import { Request, Response } from 'express';
import UserModel from '../users/UserModel';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60 * 1000 * 1000;

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge, signed: true});
    res.status(201).json({success: true, data:{user: user._id, created: true, accessToken: token }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({email: email});

    if(!user){
      throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      throw new Error("Password is incorrect");
    }

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge, signed: true});
    res.status(200).json({ success: true, data: {user: user._id, accessToken: token }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }

}

export default {
  register,
  login,
}
