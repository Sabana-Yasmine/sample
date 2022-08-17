const nodemailer = require("nodemailer");
const sendMail = async(email, subject, html) =>{
    try{
        const transporter = nodemailer.createTransport({
            host : process.env.HOST,
            service : process.env.Service,
            auth : {
                user : process.env.USER,
                pass : process.env.PASS
            }

        });
        await transporter.sendMail({
            from : process.env.USER,
            to : email,
            subject : subject,
            html : html
        }).then((data)=>{
            console.log("email sent", data)

        }).catch(()=>{
            console.log("error",error)
        })
    }catch(error){
        console.log("mail not sent",error)
    }
}
module.exports = sendMail;