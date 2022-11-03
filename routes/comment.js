const express = require('express');
const app = express();
const router = express.Router()

router.post('/post:id/comment',async (req, res) => {
    const id = req.params.id
    const comment = new Comment ({
        text:req.body.text,
        post:id
    })
    const postcomment = comment.save()
    const postRelated = await Post.findByid(id)//.populate

    res.json({
        status: 200,
        message: 'login successful',
        successfull:true,
        comment:postcomment,
        data:postRelated
      })
})
module.exports = router