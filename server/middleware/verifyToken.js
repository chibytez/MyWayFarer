export default (req, res, next) => {
  
  
    const header = req.headers.token || req.headers['x-access-token'] || req.body.token;
   
    
    if (typeof header !== 'undefined') {
       req.tokenize = header;
       
      next();
    } else {
      res.status(403)
        .json({
          message: 'Forbidden access',
        });
    }
  };
  