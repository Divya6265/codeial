const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transfer = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    post : 587,
    secure : false,
    auth : {
        user : "divya.inapakurthi",
        pass : "Stupid@donottry"
    }
});

let renderTemplate = (data, relativePath) => {
    let mailTempalate;
    ejs.renderFile(
        path.join(__dirname, "../views/mailer", relativePath),
        data,
        (err, template) => {
            if(err){
                console.log("Error in rendering template..", err);
                return;
            }
            mailTempalate = template;
        }
    )
    return mailTempalate;
}

module.exports = {
    transporter : transfer,
    renderTemplate : renderTemplate
}


