
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import { USER_ROLE } from '../user/user.constant';
import Auth from '../../middleware/auth';



const router = express.Router()

router.post('/', 
    Auth(USER_ROLE.user),
    validateRequest(BookingValidation.bookingValidationSchema), 
    BookingControllers.createBooking);

router.get('/', Auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get('/my-bookings', Auth(USER_ROLE.user), BookingControllers.getMyBookings);




export const BookingRoutes = router;