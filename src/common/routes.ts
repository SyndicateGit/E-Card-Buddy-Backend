import { NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';

const router: Router = Router();

// import routes
import userRouter from '../resources/users/UserRoutes';
import authRouter from '../resources/auth/AuthRoutes';
import UserModel from '../resources/users/UserModel';
const asyncHandler = require("express-async-handler");
// Higher level routes definition


router.use('/auth', authRouter);

// Middleware to get user from token
router.use(asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return next();
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
  const user = await UserModel.findById(decoded.userId);
  if (!user) {
    throw new Error('User not found');
  }

  req.user = user;
  
  next();
}));
// custom-types.d.ts
import { Request } from 'express';
import UserInterface from '../resources/users/UserInterface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserInterface; // You can replace `any` with a more specific type for your user object
  }
}

router.use('/user', userRouter);



export default router;
