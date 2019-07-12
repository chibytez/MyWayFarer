export default (req, res, next) => {
  const {admin} = req.userInfo;

    if (admin) {
      return next();
    }
    res.status(403)
      .json({
        message: 'Forbidden access',
      });
  };