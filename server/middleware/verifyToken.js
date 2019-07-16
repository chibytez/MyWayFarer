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
      next();
    }
     else {
      res.status(403)
        .json({
          message: 'Forbidden access',
        });
    }
  };
  