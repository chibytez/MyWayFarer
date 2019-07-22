import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

export default (req, res, next) => {
  let token;
if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
      } else if (req.headers.token) {
        token = req.headers.token;
      }
    if (typeof token !== 'undefined') {
       req.tokenize = token;
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
    }
     else {
      res.status(403)
        .json({
          message: 'Forbidden access',
        });
    }
  };
  