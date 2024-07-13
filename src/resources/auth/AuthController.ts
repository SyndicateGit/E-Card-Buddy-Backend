import { NextFunction, Request, Response } from 'express';
import UserModel from '../Users/UserModel';
import jwt from 'jsonwebtoken';
const asyncHandler = require("express-async-handler");

const maxAge = 3 * 24 * 60 * 60 * 1000 * 1000;

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({ name, email, password });
  const token = createToken(user._id)
  res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge, signed: true});
  res.status(201).json({success: true, data:{user: user._id, created: true, accessToken: token }});
});

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
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
});

const verifyToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if(!bearerHeader){
    throw new Error("No token found");
  }

  const bearer = bearerHeader.split(' ');

  const bearerToken = bearer[1];

  const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

  const user = await UserModel.findById(decoded.userId);

  if(!user){
    throw new Error("User not found");
  }

  return res.status(200).json({ success: true, message: "Token is valid", data: {userId: user._id}});
});

export default {
  register,
  login,
  verifyToken,
}
