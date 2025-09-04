const verify=(req,res,next)=>
{
const otp=req.body.otp;
if(otp==req.session.otp)
{
  return res.json({
    msg:"OTP Verified"
  })
}
else{
 return  res.json({
    msg:"Invalid OTP"
  })
}
}
module.exports=verify;
