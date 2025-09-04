const nodemailer=require('nodemailer');
function setOTP(){
const otp=(Math.floor(Math.random()*900000)+100000);
return otp;
}



const getOTP=async (req,res,next)=>{
const receiverEmail=req.body.vemail;
const OTP=await setOTP();
const postman=nodemailer.createTransport({
   host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth:{
user:'anuj.chaudhary.2430@gmail.com',
pass:'dgcrubwzevqgjrfj'
  }
})
 
const letter={
  from:'anuj.chaudhary.2430@gmail.com',
  to:`${receiverEmail}`,
  subject:'Verification OTP for your Amazon Demo App:',
  html: `<h2>Dear User,</h2>
  <p>Your One Time Password (OTP) is: <b>${OTP}</b></p>
  <p>Please use this OTP to complete your signup process.<br>
  <i>Do not share this code with anyone.</i></p><p><b>No need to reply to this email.</b></p>
  <p>Regards,<br>AmazonDemoApp Team</p>`
}
await postman.sendMail(letter);
console.log("OTP Sent Successfully:", OTP);
req.session.otp = OTP;
res.json({msg:"ok"})
}
module.exports=getOTP;