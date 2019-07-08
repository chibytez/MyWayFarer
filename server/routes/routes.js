import UserController from "../controllers/userController";
import AdminController from "../controllers/adminController";
import TripsController from "../controllers/tripController"

const route = (app) => {
    //sign up and login routes
    app.post('/api/v1/auth/signUp', UserController.signUp);
    app.post('/api/v1/auth/signin', UserController.login);

    // trip routes
    app.post('/api/v1/trips', AdminController.createTrip)
    app.get('/api/v1/trips', TripsController.getAllTrips)
};

export default route;