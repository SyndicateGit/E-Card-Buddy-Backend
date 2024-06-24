import { Router } from 'express';

const router: Router = Router();

// import routes
import userRouter from '../resources/users/UserRoutes';
import authRouter from '../resources/auth/AuthRoutes';

// Higher level routes definition
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
