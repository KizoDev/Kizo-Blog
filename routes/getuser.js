const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const router = express.Router()
const verify = require('../routes/verifytoken')

const getAllUser = require('../controller/getAllUser')

router.get('/getuser/:id', verify, getAllUser)




module.exports = router