import { Router } from 'express';
import userRouter from './users';
import doctorRouter from "./doctor";
import patientRouter from "./patient";

const router = Router();

router.use('/users', userRouter);
router.use("/doctors", doctorRouter);
router.use("/patients", patientRouter);

export default router;
