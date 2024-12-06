const users = require("../models/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy({
    usernameField: "email",
    passReqToCallback:true
}, function (req, username, password, done) {
    users.findOne({ email: username })
        .then(user => {
            if (!user || user.password != password) {
                req.flash("error", "Invalid email or password")
                return done(null, false);
            }
            req.flash("success", "Logged in successfuly");
            return done(null, user);
        })
        .catch(err => {
            req.flash("error", "Invalid email or password")
            return done(err);
        });
}
));


passport.serializeUser(function(user, done){
    return done(null, user.id);
});

passport.deserializeUser(function ( id, done ){
    users.findById(id)
    .then(user => {
        return done(null, user);
    })
    .catch(err => {
        return done(err);
    });
});

passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
        // if so then go to controllers i.e home
    }else{
            // otherwise sign in
        res.redirect("/user/signin");
    }
    
}
passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
        // req.user is currect logged in user and it is now stored in locals for views acces
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;