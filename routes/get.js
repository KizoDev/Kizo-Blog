const express = require('express');
const app = express();
const router = express.Router()
const verify = require('./verifytoken');
const Post = require('../model/post')
const Comment = require('../model/comment')
const mongoose = require('mongoose')

router.get('/get', verify, async (req, res) => {
 
  const post = await Post.aggregate([
     {
            $lookup:{
                from:"users",
                localField:"postedBy",
                foreignField:"_id",
                as:"users",
            },
        },
        {
          $unwind:{
            path: "$users",
          preserveNullAndEmptyArrays: true,
          }
        },
        {
            $lookup:{
                from:"comments",
                localField:"_id",
                foreignField:"post_id",
                as:"comments"
            },
        },
        {
          $unwind:{
            path: "$comments",
          preserveNullAndEmptyArrays: true,
          }
        },
       // { $addFields: {comment_count: { $size: "$comments" } } }
   ])
   .exec()
    if (!post) {
        return res.json({
        status:401,
        massage:' no post to display' ,
        successfull:false,
        data:null
        })
    }
    return res.json({
    status:200,
    massage: 'successfull posts',
    successfull:true,
    post:post
     })
})


module.exports = router