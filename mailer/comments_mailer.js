const commentMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
    // let htmlString = commentMailer.renderTemplate({
    //     comment : comment
    // }, "./comments/new_comments.ejs")

    commentMailer.transporter.sendMail({
        from : "divya.inapakurthi379@gmail.com",
        to : comment.user.email,
        subject : "New Commnet is now Publisher",
        html : "<h1>Yup, you'r comment is now published</h1>"
    },(err, info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("Message sent", info);
        return
    })
}

