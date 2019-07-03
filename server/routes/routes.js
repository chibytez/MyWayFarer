import UserController from "../controllers/userController";


const route = (app) => {
    //sign up and login routes
    app.post('/api/v1/auth/signUp', UserController.signUp);
};

export default route;