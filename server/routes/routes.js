import UserController from "../controllers/userController";
import AdminController from "../controllers/adminController";
import TripsController from "../controllers/tripController";
import BookingsController from "../controllers/bookingController";

import verifyToken from '../middleware/userAuth';
import userAuth from '../middleware/verifyToken';
import isAdmin from '../middleware/isAdmin';

const route = (app) => {
    //sign up and login routes
    app.post('/api/v1/auth/signup', UserController.signUp);
    app.post('/api/v1/auth/signin', UserController.login);

    // trip routes
    app.post('/api/v1/trips',verifyToken, userAuth,isAdmin, AdminController.createTrip)
    app.get('/api/v1/trips', verifyToken, userAuth, TripsController.getAllTrips)
    app.patch('/api/v1/trips/:id', verifyToken, userAuth,isAdmin, AdminController.adminCancelTrip)

    // booking routes
     app.post('/api/v1/bookings',verifyToken, userAuth, BookingsController.userBookTrip)
     app.get('/api/v1/bookings',verifyToken, userAuth,BookingsController.userGetAllBooking)
     app.delete('/api/v1/bookings/:id',verifyToken, userAuth, BookingsController.userDeleteBooking)
};

export default route;