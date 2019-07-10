import UserController from "../controllers/userController";
import AdminController from "../controllers/adminController";
import TripsController from "../controllers/tripController";
import BookingsController from "../controllers/bookingController";

import verifyToken from '../middleware/userAuth';
import userAuth from '../middleware/verifyToken';

const route = (app) => {
    //sign up and login routes
    app.post('/api/v1/auth/signUp', UserController.signUp);
    app.post('/api/v1/auth/signin', UserController.login);

    // trip routes
    app.post('/api/v1/trips', AdminController.createTrip)
    app.get('/api/v1/trips', TripsController.getAllTrips)

    // booking routes
     app.post('/api/v1/bookings',verifyToken, userAuth, BookingsController.userBookTrip)
     app.get('/api/v1/bookings', AdminController.adminGetAllBooking)
};

export default route;