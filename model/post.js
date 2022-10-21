const mongoose = require('mongoose')
//const Schema = mongoose.Schema; // get props

const PostSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userId'
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
PostSchema.virtual('url').get(function(){
  return '/post/' + this._id
} )
module.exports = mongoose.model('post', PostSchema)