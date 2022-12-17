const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../model/post')
const User = require('../model/user')
const verify = require('../routes/verifytoken')

router.post('/post', verify, async (req, res) => {
  //const userId = req.params.id
  req.user.password = undefined
    const post = new Post ({
      tittle:req.body.tittle,
      description:req.body.description,
      postedBy:req.user
    })
    const savedpost = await post.save()
    
    if (!savedpost) {
        return res.json({
        status:401,
        massage:(`No post with id : ${user_Id}`),
        successfull:false,
        data:null
        })
    }
      res.json({
        status: 200,
        message: 'post successful',
        successfull:true,
        post:savedpost
      })
})

module.exports = router