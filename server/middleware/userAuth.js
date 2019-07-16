import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

export default (req, res, next) => {
  jwt.verify(req.tokenize , process.env.SECRET_KEY, (err, decoded) => {
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
