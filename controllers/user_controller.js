const users = require("../models/userSchema");

const passport = require("passport");


module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        res.redirect("/user/profile");
    }
    res.render("signup",{
        title : "sign Up"
    });
    return;
}

module.exports.createUser = (req, res) => {
   console.log(req.body);
   if(req.body.password != req.body.confirmPassword){
    return res.redirect("back");
   }
   users.findOne({email : req.body.email})
   .then(user => {
       if(!user){
       users.create({
           name : req.body.name,
           email : req.body.email,
           password : req.body.password
       })
       .then(user => {
        console.log("User Added...");
       })
       .catch(err => {
        console.log("Error to add user into db...");
       })
       } else{
            console.log("User Already signed up...");
            res.redirect("/user/signin");
            return;
       }
       res.redirect("/user/signin");
   })
   .catch(err => {
        console.log("Error find user in db...");
   });
}



module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }
    res.render("signin",{
        title : "sign In"
    });
    
}

// module.exports.findUser = (req, res) => {
//     users.findOne({email : req.body.email})
//     .then(user => {
//         if(!user){
//             console.log("User not found in db... ");
//             res.redirect("/user/signup");
//             return;
//         }else{
//             console.log("User found... ", user._id);

//             res.cookie("user_id", user.id);
//             res.redirect("/user/profile");
//             return;
//         }
        
//     })
//     .catch(err => {
//         console.log("Error while finding user in db...");
//         res.redirect("/user/signin");
//     });
// }


// passport signIn



module.exports.createSession = (req, res) => {
    res.redirect("/");
}

module.exports.profile = (req, res) => {
    users.findById(req.params.id)
    .then(user => {
        return res.render("profile",{
            title : "Profile",
            profile_user : user
        });
    })
   
}


module.exports.update = (req, res) => {
   if(req.user.id == req.params.id){
    console.log("Updated in if...")

    users.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        email : req.body.email
    })
    .then((user) => {
       console.log("Updated...", user)
       req.flash("success", "Updated details successfuly")

       return res.redirect("back");
    })
   }else{
       req.flash("error", "Update failure");
       return res.redirect("back");
   }

}
module.exports.signOut = (req, res, next) => {
     req.logout( err =>{
        if(err){
            return next(err);
        }
    });
    req.flash("success", "Logged out successfuly")

    return res.redirect("/");
}
