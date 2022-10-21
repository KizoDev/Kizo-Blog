const jwt = require('jsonwebtoken')

module.exports = function auth (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.json({
        status: 401,
        message:('Access denied'),
        successfull:false,
        data:null
      });
      try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        res.user = verified
        next();
      } 
      catch (err) {
        res.json({
            status: 400,
            message:('Invalid token'),
            successfull:false,
            data:null
          });
      }
}