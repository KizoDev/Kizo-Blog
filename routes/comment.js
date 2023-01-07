const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const router = express.Router()
const Verify = require('../routes/verifytoken')

const postComment = require('../controller/comment');

router.post('/post/:id/comment', Verify,  postComment)
module.exports = router