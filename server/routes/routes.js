import UserController from "../controllers/userController";
import AdminController from "../controllers/adminController";


const route = (app) => {
    //sign up and login routes
    app.post('/api/v1/auth/signUp', UserController.signUp);
    app.post('/api/v1/auth/signin', UserController.login);

    // trip routes
    app.post('/api/v1/trips', AdminController.createTrip)
};

export default route;