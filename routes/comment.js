const express = require('express');
const app = express();
const router = express.Router()
const Comment = require('../model/post')



router.post('/post/:id/comment',async (req, res) => {
    const id = req.params
    const comment = new Comment ({
        user_id:req.user?._id,
        text:req.body.text,
        post_id:id
    })
    const comments = comment.save()
    if (!comment) {
        res.json({
            status: 401,
            message: 'comment unsuccessful',
            successfull:false,
            comment:comments,
          })
    }
    res.json({
        status: 200,
        message: 'comment successful',
        successfull:true,
        comment:comments,
      })
})
module.exports = router