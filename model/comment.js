const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userId'
    },
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
})
module.exports = mongoose.model('Comment', commentSchema)