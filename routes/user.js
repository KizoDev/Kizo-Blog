const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require("bcrypt");


router.post('/register',async (req, res) => {
  // validation of data before user
  const {error} = registerValidation(req.body);
  if(error) return res.json({
    status: 400,
    message: (error.details[0].message),
    successfull:false,
    data:null
  })
  // checking if the user already exist
  const emailExist = await User.findOne({email:req.body.email})
   if(emailExist) return res.json({
    status: 400,
    message: ('email already exist'),
    successfull:false,
    data:null
  })
  //hashpassword
  //const salt =  await bcrypt.gensalt(10)
  const hashpassword = await bcrypt.hash(req.body.password,(10) )
  // register new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  })
  const savedPost = await user.save();
  res.json({
    status: 200,
    message: 'registerd successful',
    successfull:true,
    data:savedPost
  })
})


//////////LOGIN///////


router.post('/login',async (req, res) => {
  // validation of data before user login
  const {error} = loginValidation(req.body);
  if(error) return res.json({
    status: 400,
    message: (error.details[0].message),
    successfull:false,
    data:null
  })
  // checking if the email doent  exist
  const user = await User.findOne({email:req.body.email})
  if(!user) return res.json({
  status: 400,
  message: ('email or password is wrong'),
  successfull:false,
  data:null
  })
  ///checking if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.json({
    status: 400,
    message: ('invalid password '),
    successfull:false,
    data:null
  })
  //create and asign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)


  // const { id: userID } = req.params
  //const user = await User.findOne({ _id: userID })

  //   if (!user) {
  //       return res.json({
  //       status:401,
  //       massage:(`No task with id : ${userID}`),
  //       successfull:false,
  //       data:null
  //       })
  // }
  
     res.header('auth-token').json({
      status: 200,
      message: 'login successful',
      successfull:true,
      data:user,
      token:token
    })
  
})


module.exports = router