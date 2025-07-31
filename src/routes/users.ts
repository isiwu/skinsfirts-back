import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController

/* GET users listing. */
router.get('/', userController.user)

export default router;
