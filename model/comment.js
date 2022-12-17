const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
})
module.exports = mongoose.model('Comment', commentSchema)