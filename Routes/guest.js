const express=require('express')
const {cartsItem,myOrders,myProfile,personalInfo,personalPostInfo,editInfo,getAddress,addressPostInfo,editAddress,getSecurity,updatePassword,updatePostPassword,getDelete,postDelete,getEmail,postEmail,loginAlert}=require('../Controllers/guestController')
const guestRouter=express.Router();

guestRouter.get('/carts',cartsItem);
guestRouter.get('/orders',myOrders);
guestRouter.get('/profile',myProfile);
guestRouter.get('/personal',personalInfo);
guestRouter.get('/personal/:mail',personalPostInfo);
guestRouter.post('/editInfo',editInfo);
guestRouter.get('/address',getAddress);
guestRouter.get('/address/:mail',addressPostInfo);
guestRouter.post('/editAddress/:mail',editAddress);
guestRouter.get('/security',getSecurity);
guestRouter.get('/password',updatePassword);
guestRouter.post('/password',updatePostPassword);
guestRouter.get('/delete',getDelete);
guestRouter.post('/delete',postDelete);
guestRouter.get('/updateEmail',getEmail);
guestRouter.post('/updatemail',postEmail);
guestRouter.get('/loginAlerts',loginAlert);
module.exports=guestRouter;