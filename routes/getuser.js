const express = require('express');
const app = express();
const router = express.Router()
const Post = require('../model/post')

router.get('/getuser/:id', async (req, res) => {
    const id = req.params.id
    const userpost = await Post.findById(id);
    if (!userpost) {
        return res.json({
        status:401,
        massage:' no post to display' ,
        successfull:false,
        data:null
        })
      };
            res.json({
            status:200,
            massage: 'successfull userpost',
            successfull:false,
            data:userpost
            });

} )

module.exports = router