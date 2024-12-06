const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }
},{timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;