const Post = require("../models/postSchema");
const Users = require("../models/userSchema");

module.exports.home = (req, res) => {
    Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
        path : "comments",
        populate : {
            path : "user"
        }
    })
    .then(posts => {
        Users.find({})
        .then(users => {
            return res.render("home", {
                title : "Home",
                Posts : posts,
                all_users : users
            });
        })
       
    })
    .catch(err => {
        console.log("Error to fetch posts from db", err);
    }); 
}

