// create express server
const express = require("express");
// encrypt and decrypt cookies
const session = require("express-session");
// to include header and footer
const expressLayouts = require("express-ejs-layouts");
// to connect to database
const db = require("./config/mongoose");
// autenticate the user
const passport = require("passport");
// using local strategy
const passportLocal = require("./config/passport-locl-strategy");
// used to access cookie and convert them into plain text
const cookieParser = require("cookie-parser")
// const MongoStore = require('connect-mongo')(session);
const sass = require("node-sass-middleware");
// session save
const MongoStore = require("connect-mongo");
// flash messages
const flash = require("connect-flash");
// flash middleware
const flashMware = require("./config/flashMessages");

const app = express();

const port = 8000;



app.use(sass({
    src : "./assets/sass",
    dest : "./assets/css",
    debug : true,
    outputStyle : "expanded",
    prefix : "/css"
}));

app.use(expressLayouts);
app.use(express.static("assets"));
app.use(cookieParser());
app.use(express.urlencoded());


app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            
            mongoUrl:"mongodb://localhost/codeial",
            autoRemove: 'disabled'
        
        }
        
    )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMware.flashmessg);


// codeial/uploads
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use("/",require("./routes"));


app.listen(port, (err) => {
    if(err){
        console.log("Error to run server at port number ", port);
        return;
    }
    console.log("Server is up and running at port number ", port);
});