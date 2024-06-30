import { Request, Response, NextFunction } from 'express';
import UserModel from './UserModel';
import jwt from 'jsonwebtoken';

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    res.status(200).json({ success: true, data: {user: {...user, password: "nice try"} }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
export default {
  getCurrentUser
};
