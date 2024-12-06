const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportLocal = require("../config/passport-locl-strategy");

const postController = require("../controllers/post_controller");

router.post("/create-post", passport.checkAuthentication , postController.createPost);

// String param -- sending value uisng colon and name 
router.get("/destroy/:id", passport.checkAuthentication , postController.destroy);


module.exports  = router;