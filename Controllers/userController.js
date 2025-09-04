const {check,validationResult}=require('express-validator');
const nodemailer=require('nodemailer');

const User=require('../models/user');
const Guest=require('../models/guest');
const Host=require('../models/host');
const bcrypt=require('bcryptjs');

const homePage=(req,res,next)=>{
res.render('../views/home',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType});
}
exports.homePage=homePage;

const userGetSignUp=(req,res,next)=>{
  const arr=[];
  res.render('../views/signUp',{signin:req.session.signin,array:arr,obj:{email:'',password:'',name:'',username:''},usertype:req.session.userType});
}
exports.userGetSignUp=userGetSignUp;

const userGetSignIn=(req,res,next)=>{
  res.render('../views/signIn',{signin:req.session.signin,usertype:req.session.userType});
}
exports.userGetSignIn=userGetSignIn;

const userPostSignUp=[
  check('name').notEmpty().withMessage('Name must not be Empty').trim().isLength({min:2}).withMessage('Name Length must be Greater than 2').matches(/^[a-zA-Z\s]+$/),
  
  check('username').notEmpty().withMessage('UserName must not be Empty').trim().isLength({min:2}).withMessage('UserName Length must be Greater than 2').matches(/^[a-zA-Z0-9\s#@]+$/),

  check('email').isEmail().normalizeEmail({gmail_remove_dots:false}),
  check('password').trim().
  matches(/[a-z]/).withMessage('Password must contain Small Order Alphabets').
  matches(/[A-Z]/).withMessage('Password must contain Large Order Alphabets').
  matches(/[0-9]/).withMessage('Password must contain Digits').
  matches(/[#@]/).withMessage('Password must contain Special Characters'),

  check('confirm_password').trim().custom((value,{req})=>{
if(value===req.body.password){
  return true;
}
else{
  throw new Error("Passwords do not match");
}
  }),


  
  
  
async (req,res,next)=>{
const {email,password,name,username,type,otp}=req.body;
const error=validationResult(req);
if(!error.isEmpty()){
  const array=error.array().map(h=>{
    return h.msg;
  })
  return res.render('../views/signUp',{array,obj:{email:email,password:password,name:name,username:username},signin:req.session.signin,usertype:req.session.userType});
}
else{
  const userType=type;
    bcrypt.hash(password,12).then(async (hashedPassword)=>{
      const user=new User({
      email:email,
      username:username,
      name:name,
      password:hashedPassword,
      usertype:userType,
      otp:otp,
      'trustedDevice.ip':req.ip,
      'trustedDevice.userAgent':req.headers['user-agent'],

      })
      const data=await user.save();

      if(userType=='guest'){
      const guest=new Guest({
      email:email,
      username:username,
      name:name,
      unId:data._id
      })
      const meta=await guest.save();
    }
    
    if(userType=='host')
    {
      const host=new Host({
        email:email,
        username:username,
        name:name,

      })
      const meta=await host.save();
    }
      }).catch((err)=>{
        console.log(err);
        return res.redirect('/signup');
      })
  }

  return res.redirect('/signin');



}
]
exports.userPostSignUp=userPostSignUp;

const userPostSignIn=async (req,res,next)=>{
const email=req.body.email;
const password=req.body.password;
const ip=req.ip;
const userAgent=req.headers['user-agent'];
const data=await User.findOne({email:email});
if(data){
const meta=await bcrypt.compare(password,data.password);
if(meta){
req.session.signin=true;
req.session.userType=data.usertype;
req.session.mail=data.email;
req.session.userName=data.username;
await Guest.findOneAndUpdate({
email:req.session.mail
},{
  $push:{
    loginAlert: {
      ip: ip,
      userAgent: userAgent,
      signedAt: new Date()
    }
  }
},{new:true});
const loginAlert=await Guest.findOne({email:req.session.mail});
const trustedDevice=await User.findOne({email:req.session.mail});
if(loginAlert.loginAlert.ip==trustedDevice.trustedDevice.ip && loginAlert.loginAlert.userAgent==trustedDevice.trustedDevice.userAgent){
  console.log('User Got Sign In');
  return res.redirect('/');
}
else{
const postman=nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth:{
    user:'********************',
    pass:'*****************'
  }
});
const letter={
  from:'********************',
  to:`${req.session.mail}`,
  subject:'Verification OTP for your Amazon Demo App:',
  html: `<h2>Dear ${req.session.userName} Alert!!!</h2>
  <p>Your Account has been Logged in with a New Device:IP Address<b>${ip} Device: ${userAgent}</b></p>
  <p>Please Change Your Password, if it was not You.<br>
  </p><p><b>No need to reply to this email.</b></p>
  <p>Regards,<br>AmazonDemoApp Team</p>`
}
await postman.sendMail(letter);
console.log('Alert New Device');
console.log('User Got Sign In');
return res.redirect('/');
}

}
else{
  console.log('Invalid User Credentials');
  return res.redirect('/signin');
}
}

console.log('Invalid User Credentials');
return  res.redirect('/signin');


}
exports.userPostSignIn=userPostSignIn;

const userGetSignOut= (req,res,next)=>{
 req.session.destroy((err)=>{
  if(!err){
    console.log('User Got Sign Out');
    return res.redirect('/signin');
  }
  else{
    console.log(err);
    return res.redirect('/signin');
  }
 });

}
exports.userGetSignOut=userGetSignOut;


const userTerms=(req,res,next)=>{
res.render('../views/terms',{signin:req.session.signin,usertype:req.session.userType});
}
exports.userTerms=userTerms;

const contactUs=(req,res,next)=>{
  res.render('../views/contactus',{signin:req.session.signin,usertype:req.session.userType});
  }

  exports.contactUs=contactUs;
