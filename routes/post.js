const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../model/post')
const User = require('../model/user')
const verify = require('../routes/verifytoken')

const {userPosts} = require('../controller/post')

router.post('/post', verify, userPosts )

module.exports = router