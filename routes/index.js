const express = require("express");
const router = express.Router();

// controllers
const homeController = require("../controllers/home_controller");


// user routes
router.use("/user", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comment", require("./comments"));

// home routes
router.get("/",homeController.home);

// export routes
module.exports = router;
