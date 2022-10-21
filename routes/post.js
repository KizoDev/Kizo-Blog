const express = require('express');
const app = express();
const router = express.Router()
const verify = require('./verifytoken')
const Post = require('../model/post')

router.post('/post',verify, async (req, res) => {
    const userId = req.params.Id;
    const post = new Post({
        userId:userId,
        tittle:req.body.tittle,
        description:req.body.description,
    })
    const savedPost = await post.save();
    if (!savedPost) {
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
        data:savedPost
      })
})

module.exports = router