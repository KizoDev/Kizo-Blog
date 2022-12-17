const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const router = express.Router()
const Post = require('../model/post');
const verify = require('../routes/verifytoken')
const mongoose = require('mongoose')



router.get('/getuser/:id', verify, async (req, res) => {
  req.user.password = undefined
  const post_id = req.params.id
   const post = await Post.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(post_id)}    },
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
            as:"comments",
        },
    },
    {
      $unwind:{
        path: "$comments",
      preserveNullAndEmptyArrays: true,
      }
    },
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
    
} )

module.exports = router