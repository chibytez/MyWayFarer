export default (req, res, next) => {
  const {is_admin} = req.userInfo;

    if (is_admin) {
      return next();
    }
    res.status(403)
      .json({
        message: 'Forbidden access',
      });
  };