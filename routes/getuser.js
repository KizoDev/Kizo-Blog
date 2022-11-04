const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const router = express.Router()
const Post = require('../model/post');
const verify = require('../routes/verifytoken')



router.get('/getuser/:id', async (req, res) => {
    const post = await Post.find(req.params)
    const posts = await Post.aggregate([
    {
         $match: { _id: post._id }
    },
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
            as:"comment",
        },
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
        post:posts
        })
    
} )

module.exports = router