export default (req, res, next) => {

    const header = req.headers.token || req.headers.authorization || req.body.token;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
       req.tokenize = bearer[1];
      next();
    }
     else {
      res.status(403)
        .json({
          message: 'Forbidden access',
        });
    }
  };
  