

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CarValidation } from './car.validation';
import { CarControllers } from './car.controller';

const router = express.Router()

router.post('/', validateRequest(CarValidation.carZodSchema), CarControllers.createCar);
router.get('/', CarControllers.getAllCars);



export const CarRoutes = router;