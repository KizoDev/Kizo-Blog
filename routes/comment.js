const express = require('express');
const app = express();
const router = express.Router()
const Post = require('../model/post')
const Comment = require('../model/comment')
const verify = require('./verifytoken')

router.post('/post/:id/comment',verify, async (req, res) => {
    const userId = req.params.userId
    const id = req.params.id

    const comment = new Comment ({
        userId:userId,
        text:req.body.text,
        post:id,
    });
    //const allcomments = await Comment.findById(id)
    //.select("-password")

    const post = await Post.findById(id)// {$push: {comment}})
    .select("-password")
    .populate("comment")
    const postcomment = await comment.save();
    const postRelated = await post.save();
    //const comments = await allcomments.save();

    //postRelated.comments.push(comment)
    try {
        res.json({
            status: 200,
            message: 'comment successful',
            successfull:true,
            comment:postcomment,
            post:postRelated
          });
    } catch (error) {
        return res.json({
            status: 400,
            message: 'comment unsuccessful',
            successfull:false,
            comment:null,
            data:null
          }); 
    }


     
})
module.exports = router