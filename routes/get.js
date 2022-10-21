const express = require('express');
const app = express();
const router = express.Router()
const verify = require('./verifytoken');
const Post = require('../model/post')

router.get('/get', verify, async (req, res) => {
  //const userId = req.params.userId
  const post = await Post.find().select('-password')
  if (!post) {
        res.json({
        status:401,
        massage:' no post to display' ,
        successfull:false,
        data:null
        })
      };
            res.json({
            status:200,
            massage: 'successfull users',
            successfull:false,
            data:post
            });
})


module.exports = router