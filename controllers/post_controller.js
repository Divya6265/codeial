const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");

module.exports.createPost = (req, res) => {
    console.log(req.body);
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .then(post => {
            console.log("post created", post);
        })
        .catch(err => {
            console.log("Error to create post", err)
        })
    res.redirect("back");
}

module.exports.destroy = (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // .id is means converting object id into string
            console.log(post.user + " " + req.user.id);

            if (post.user == req.user.id) {
                // delete post from post schema
                Post.findByIdAndDelete(req.params.id).then(() => {
                    console.log("post deleted");
                }).catch(err => {
                    console.log("Error to delete post", err);
                })
                // post.remove()
                //     .then(() => {
                //         console.log("post deleted")
                //         Comment.deleteMany({ post: req.params.id })
                //             .then(comment => {
                //                 console.log("Comment delted");
                //             })
                //             .catch(err => {
                //                 console.log("Error to delete commnets", err);
                //             })
                //     })
                //     .catch(err => { console.log("Error to delete post", err) });
                // now delete comments related to that post from comment schema

            } else {
                return res.redirect("back");
            }
        })
        .catch(err => {
            console.log("Post is not found in db ", err);
        });
    req.flash("success", "Post and associated comments deleted");

    return res.redirect("back");
}

