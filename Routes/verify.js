const verify=require('../Controllers/verifyController');
const express=require('express');
const verifyRouter=express.Router();
verifyRouter.post('/verifyotp',verify);
module.exports=verifyRouter;