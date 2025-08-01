import { Router } from 'express';
import userRouter from './users';
import doctorRouter from "./doctor";

const router = Router();

router.use('/users', userRouter);
router.use("doctors", doctorRouter);

export default router;
