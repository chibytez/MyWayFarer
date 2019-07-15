export default (req, res, next) => {
    const {token} = req.headers;
    if (typeof token !== 'undefined') {
      req.token = token;
      next();
    } else {
      res.status(403)
        .json({
          message: 'Forbidden access',
        });
    }
  };
  