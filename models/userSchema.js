const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const AVATAR_PATH = path.join("/uploads/users/avatars"); 

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
});



let storage = multer.diskStorage({
    destination : (req, file, cd) => {
        cd(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename : (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar')
userSchema.statics.avatarPath = AVATAR_PATH


const Users = mongoose.model("Users", userSchema);

module.exports = Users;