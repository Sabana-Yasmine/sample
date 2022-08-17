const router = require('express').Router();
const User  = require ('./user_schema');
const database = require('../database/db');
const user = require ('./user_schema');
const bcrypt = require('bcrypt');
var ObjectId = ('mongodb').ObjectId;
const sendEmail = require('../transporter/transport');


//email verification

router.post('/register', async(req,res)=>{
    try{
        let{name, email, password} = req.body
        if(name&&email&&password){
        let emailData = await user.findOne({email:req.body.email}).exec()
        if(!emailData){
                
            const user = new User(req.body)
             const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
                user.save()

                let html=`<h1> Email Confirmation </h1>
                <p> please click the link to activate your account </p>
                <a href=http://localhost:2020/user/verify?email ${email}> click here  </a>`

                await sendEmail(email,"verify Email",html)

                res.status(200).json({statue:false, message :"user registed successfully"})

            } 
            else{ 
                 res.status(200).json({status:false, message : "user already exist please login"})
            }
            }
            else{
                res.status(200).json({status:false, message : "please enter all values"})
            }
        }
        catch (error){
           
          console.log(error)
        }
})

router.get('/verify', async(req,res)=>{
    let email = await User.findOne({email : req.query.email}).exec()
    if(email){
      let status = await User.findOneAndUpdate({email : req.query.email}, {active:true}, {neu:true}).exec();  
      if(status){
        res.status(200).send({message :"Email verified successfully"})
      
        }else{
        res.status(200).send({message : "please update your emailid"})
        }
    }
    
})
module.exports = router;
       
 
        
    
        
            
            


        
    

