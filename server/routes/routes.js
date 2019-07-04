import UserController from "../controllers/userController";


const route = (app) => {
    //sign up and login routes
    app.post('/api/v1/auth/signUp', UserController.signUp);
    app.post('/api/v1/auth/login', UserController.login);
};

export default route;