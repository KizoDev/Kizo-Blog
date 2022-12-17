const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {TOKEN_SECRET} = require('../key')
require('dotenv').config();
const User = require('../model/user')


/*
module.exports = (req, res, next) => {
 const {authorization} = req.headers
    // authorization = bearer hfkghdvdhdvdbfffv
    if(!authorization) 
    return res.json({
      status: 421,
      message:('Access denied'),
      successfull:false,
      data:null
    })
  const token = authorization.replace("Bearer","")
  jwt.verify(token,TOKEN_SECRET,(err, payload)=> {
    if(err){ 
      return res.json({
        status: 501,
        message:('Access denied'),
        successfull:false,
        data:null
      })
    }


   const {_id} = payload
    User.findById(_id).then(userdata =>{
        req.user = userdata
        next()
    })
  })
}

*/
 module.exports = function auth (req, res, next) {
  const token = req.header('auth-token');
  if(!token) return res.json({
        status: 401,
        message:('Access denied'),
        successfull:false,
        data:null
  })
      
  //const verified = 
  jwt.verify(token, 
   process.env.TOKEN_SECRET,(err, payload)=>{
    //req.user = verified
      if (err) {
        res.json({
            status: 400,
            message:('Invalid token'),
            successfull:false,
            data:null
          })
      }
    const {_id} = payload
    User.findById(_id).then(userdata =>{
      req.user = userdata
      next();

    })
  })
}
