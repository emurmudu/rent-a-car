
import express from 'express'
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/signup', UserControllers.addUser)



export const UserRoutes = router;