import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

export default (req, res, next) => {
    console.log("token:", req.headers.token);  
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401)
        .json({
          errors: 'Authentication failed',
        });
    }
    req.userInfo = decoded;
  });
  next();
};
