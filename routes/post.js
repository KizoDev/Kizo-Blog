const express = require('express');
const app = express();
const router = express.Router()
const Post = require('../model/post')
const User = require('../model/user')
const verify = require('../routes/verifytoken')

router.post('/post', verify, async (req, res) => {
    const post = new Post ({
      user_id:req.user?._id,
      tittle:req.body.tittle,
      description:req.body.description,
    })
    const savedpost = await post.save()
    if (!savedpost) {
        return res.json({
        status:401,
        massage:(`No post with id : ${userId}`),
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