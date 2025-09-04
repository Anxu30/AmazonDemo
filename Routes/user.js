const express=require('express');
const userRouter=express.Router();
const {homePage,userGetSignUp,userGetSignIn,userPostSignUp,userPostSignIn,userGetSignOut,userTerms,contactUs}=require('../Controllers/userController');

userRouter.get('/',homePage);

userRouter.get('/signup',userGetSignUp);
userRouter.get('/signin',userGetSignIn);

userRouter.post('/signup',userPostSignUp);
userRouter.post('/signin',userPostSignIn);
userRouter.get('/signout',userGetSignOut);
userRouter.get('/terms',userTerms);
userRouter.get('/contactus',contactUs);


module.exports=userRouter;