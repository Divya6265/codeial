const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");

module.exports.createComment = (req, res) => {
    console.log(req.body);
    Post.findById(req.body.post)
        .then(post => {
            if (post){
                Comment.create({
                    content: req.body.commentContent,
                    post: req.body.post,
                    user: req.user._id
                })
                    .then(comment => {
                        post.comments.push(comment);
                        post.save();
                        console.log("Comment Added...");
                        req.flash("success","comment added..!");
                        return res.redirect("back");
                    })
                    .catch(err => {
                        console.log("Error to create comment", err);
                    })
            }
                
        })
        .catch(err => {
            console.log("Error to fetech post by id....", err);
        });
    
}

module.exports.destroy = (req, res) => {
    console.log(req.params.id);
    Comment.findByIdAndDelete(req.params.id)
        .then(() => {
            Posts.find({})
                .then(posts => {
                    let ind = posts.comments.findIndex(comment => comment.id == req.params.id);
                    if (ind != -1) {
                        posts.comments.splice(ind, 1)
                    }
                }
                )
                .catch(err => {
                    console.log("Error to fetch data from post db");
                })
        })
        .catch(err => {
            console.log("Error to fetch data from post db");
        })

    //  Comment.findById(req.params.id)
    //  .then(commnet => {
    //     postID = commnet.post
    //     comment.remove();
    //     Post.findByIdAndUpdate(postID, {$pull, comment : req.params.id} )
    //     .then(() => { return res.redirect("back")})
    //     .catch(err => console.log("Erro to update comments"));
    //  })  
    req.flash("success","comment deleted..!");
    return res.redirect("back");
}
