const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    },
    tittle:{
        type:String,
        required:true
    },
    description:{
      type:String,
      required:true
  },
    date:{
        type:Date,
        default:Date.now
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
})
module.exports = mongoose.model('post', postSchema)