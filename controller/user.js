const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user')
require('dotenv').config();

const {signupValidation,
  signinValidation} = require('../validation')

const signupUser = async (req, res) => {
  // validation of data before user
  const {error} = signupValidation(req.body);
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
  const hashpassword = await bcrypt.hash(req.body.password, 10)
  // register new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  })
  await user.save();
  const userResponse = {
    _id:user._id,
    name:user.name,
    email:user.email
  }
  //delete userResponse.password

  res.json({
    status: 200,
    message: 'registerd successful',
    successfull:true,
    user:userResponse
  })
}
const signinUser = async (req, res) => {
  // validation of data before user login
  const {error} = signinValidation(req.body);
  if(error) return res.json({
    status: 400,
    message: (error.details[0].message),
    successfull:false,
    data:null
  })
  // checking if the email doent  exist
  const user = await User.findOne({email:req.body.email})
  //.select('-password')
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
  
     res.header('auth-token').json({
      status: 200,
      message: 'login successful',
      successfull:true,
      user:user,
      token:token
    })
  
}

module.exports = {
signupUser,
signinUser
}
