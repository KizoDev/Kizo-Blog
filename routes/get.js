const express = require('express');
const app = express();
const router = express.Router()
const verify = require('./verifytoken');
const Post = require('../model/post')

router.get('/get', verify, async (req, res) => {
  //const userId = req.params.userId
  const post = await Post.aggregate([
      {
            $lookup:{
                from:"user",
                localField:"user_id",
                foreignField:"_id",
                as:"users",
            },
        },
        {
            $lookup:{
                from:"comment",
                localField:"comment_id",
                foreignField:"_id",
                as:"comment_count"
            },
        },
        { $addFields: {comment_count: { $size: "$comment_count" } } }
   ])
   .exec();

    if (!post) {
        return res.json({
        status:401,
        massage:' no post to display' ,
        successfull:false,
        data:null
        })
  }
     res.json({
    status:200,
    massage: 'successfull posts',
    successfull:true,
    post:post
     })
})


module.exports = router