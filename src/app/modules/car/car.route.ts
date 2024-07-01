

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CarValidation } from './car.validation';
import { CarControllers } from './car.controller';
import { USER_ROLE } from '../user/user.constant';
import Auth from '../../middleware/auth';


const router = express.Router()

router.post('/', Auth(USER_ROLE.admin), validateRequest(CarValidation.carZodSchema), CarControllers.createCar);
router.get('/', CarControllers.getAllCars);
router.get('/:id', CarControllers.getSingleCar);
router.put("/return", Auth(USER_ROLE.admin), CarControllers.returnCar);
router.put('/:id', Auth(USER_ROLE.admin), 
validateRequest(CarValidation.updateCarZodSchema), 
CarControllers.updateCar);
router.delete('/:id', Auth(USER_ROLE.admin), CarControllers.deleteCar);





export const CarRoutes = router;