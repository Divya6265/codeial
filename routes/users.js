const express = require("express");
const router = express.Router();
const passport = require("passport");


// controllers
const usersController = require("../controllers/user_controller")



// user routes

router.get("/signup", usersController.signUp);

router.post("/create-user", usersController.createUser);

router.get("/signin" , usersController.signIn);
// router.post("/findUser", usersController.findUser);

router.post("/create-session", 
    passport.authenticate("local",
        {
            failureRedirect : "/user/signin",
        }
    )
, usersController.createSession)

router.get("/profile/:id", passport.checkAuthentication , usersController.profile)

router.post("/update/:id", passport.checkAuthentication , usersController.update)

router.get("/signout", usersController.signOut)


module.exports = router;