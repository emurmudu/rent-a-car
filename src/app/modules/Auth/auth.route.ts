import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import express from 'express'
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";



const router = express.Router();

router.post('/signup', validateRequest(UserValidation.userValidationSchema), AuthControllers.registerUser);
router.post("/signin",validateRequest(AuthValidation.singInValidationSchema),AuthControllers.userLogin);



export const AuthRoutes = router;