const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const router = express.Router()
const Comment = require('../model/comment');
const verify = require('../routes/verifytoken')

router.post('/post/:id/comment',verify,async (req, res) => {
    const {id} = req.params
    req.user.password = undefined
    const comment = new Comment ({
        postedBy:req.user,
        text:req.body.text,
        post_id:id
    })
    const comments = await comment.save()
    const popcomments = await comments
    .populate("postId" )
    //.exec()

    if (!comments) {
        res.json({
            status: 401,
            message: 'comment unsuccessful',
            successfull:false,
            comment:null,
          })
    }
    res.json({
        status: 200,
        message: 'comment post successful',
        successfull:true,
        comment:popcomments,
      })
})
module.exports = router