const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Post = require('../model/post')

const userPosts = async (req, res) => {
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
        massage:(`No post with id : ${postedBy}`),
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
};

module.exports = {userPosts}
