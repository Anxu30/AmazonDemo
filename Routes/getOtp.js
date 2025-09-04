const getOTP=require('../Controllers/getOTPController');
const express=require('express');
const getOtpRouter=express.Router();
getOtpRouter.post('/getotp',getOTP);
module.exports=getOtpRouter;