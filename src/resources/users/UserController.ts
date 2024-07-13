import { Request, Response, NextFunction } from 'express';
import UserModel from './UserModel';
import jwt from 'jsonwebtoken';
const asyncHandler = require("express-async-handler");

const getCurrentUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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

    user.password = "nice try";
    res.status(200).json({ success: true, data: {user: user }});
});

export default {
  getCurrentUser
};
