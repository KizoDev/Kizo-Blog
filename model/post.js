const mongoose = require('mongoose')
//const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
  postedBy:{
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

  
})
module.exports = mongoose.model('Post', postSchema)