const {check,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const Guest=require('../models/guest');
const User=require('../models/user');
const cartsItem=(req,res,next)=>{
 const signin=req.session.signin;
 if(!signin){
  return res.redirect('/signin');
  }
  else{
   return res.redirect('/');
   }
  }
exports.cartsItem=cartsItem;
  

const myOrders=(req,res,next)=>{
  const signin=req.session.signin;
  if(!signin){
   return res.redirect('/signin');
   }
   else{
    return res.redirect('/');
    }
   }
 exports.myOrders=myOrders;
  
 
 const myProfile=(req,res,next)=>{
  const signin=req.session.signin;
  if(!signin){
   return res.redirect('/signin');
   }
   else{
    return res.render('../views/profile',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType
      
    });
    }
   }
 exports.myProfile=myProfile;

 const personalInfo=async (req,res,next)=>{
  const signin=req.session.signin;
  if(!signin){
   return res.redirect('/signin');
   }
   else{
   const data=await Guest.findOne({email:req.session.mail});
   const meta={
    name:data.name,
    email:data.email,
    contact:data.contact,
    profilePicUrl:data.picUrl,
    DOB:data.DOB,
    address:data.address
   }



    return res.render('../views/personalInfo',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType,meta
      
    });
    }
   }
 exports.personalInfo=personalInfo;



 const personalPostInfo=async (req,res,next)=>{
const mail=req.params.mail;
const data=await Guest.findOne({email:mail});
if(data)
{
  const meta={
    name:data.name,
    email:data.email,
    contact:data.contact,
    profilePicUrl:data.picUrl,
    DOB:data.DOB
   }
   return res.render('../views/editInfo',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType,meta
      
   });

}
else{
  return res.redirect('/');
}


 }
 exports.personalPostInfo=personalPostInfo;


 const editInfo=async (req,res,next)=>{
const mail=req.body.email;
await Guest.findOneAndUpdate({email:mail},{
  name:req.body.name,
  contact:req.body.contact?req.body.contact:'',
  picUrl:req.body.url?req.body.url:'',
  DOB:req.body.dob?req.body.dob:''
},{new:true});
console.log(mail);
res.redirect('/personal');

 }
 exports.editInfo=editInfo;


 const getAddress=async (req,res,next)=>{
  const signin=req.session.signin;
  if(!signin){
   return res.redirect('/signin');
   }
   else{
   const data=await Guest.findOne({email:req.session.mail});
   const meta={
    street:data.address.street,
    city:data.address.city,
    state:data.address.state,
    pincode:data.address.pincode,
    country:data.address.country,
    email:data.email
    
   }



    return res.render('../views/addressInfo',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType,meta
      
    });
    }
   }
 exports.getAddress=getAddress;


  const addressPostInfo=async (req,res,next)=>{
const mail=req.params.mail;
const data=await Guest.findOne({email:mail});
if(data)
{
  const meta={
    street:data.address.street,
    city:data.address.city,
    state:data.address.state,
    pincode:data.address.pincode,
    country:data.address.country,
    email:data.email
    
   }
   return res.render('../views/editAddress',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType,meta
      
   });

}
else{
  return res.redirect('/');
}


 }
 exports.addressPostInfo=addressPostInfo;


 const editAddress=async (req,res,next)=>{
  const mail=req.params.mail;
  await Guest.findOneAndUpdate({email:mail},{
    'address.street':req.body.street?req.body.street:'',
    'address.city':req.body.city?req.body.city:'',
    'address.state':req.body.state?req.body.state:'',
    'address.pincode':req.body.pincode?req.body.pincode:'',
    'address.country':req.body.country?req.body.country:''
  },{new:true})
  console.log(mail);
  res.redirect('/address');
  
   }
   exports.editAddress=editAddress;


   const getSecurity=(req,res,next)=>{
    const signin=req.session.signin;
    if(!signin){
     return res.redirect('/signin');
     }
     return res.render('../views/security',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType
      
     });

   }
   exports.getSecurity=getSecurity;


   const updatePassword=async (req,res,next)=>{
    return res.render('../views/password',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType,arr:[]
      
    });


   }
   exports.updatePassword=updatePassword;


   const updatePostPassword=[ 
    check('password').trim().isLength({min:8}).withMessage('Password Length Error').
    matches(/[a-z]/).withMessage('Password must contain Small Order Alphabets').
    matches(/[A-Z]/).withMessage('Password must contain Large Order Alphabets').
    matches(/[0-9]/).withMessage('Password must contain Digits').
    matches(/[#@]/).withMessage('Password must contain Special Characters'),
  
    check('confirmpassword').trim().custom((value,{req})=>{
  if(value===req.body.password){
    return true;
  }
  else{
    throw new Error("Passwords do not match");
  }
    }),

    async (req,res,next)=>{
      const Error=validationResult(req);
      const arr=Error.array().map((h)=>{
        return h.msg;
      });
      if(!arr.length){

    const currentPassword=req.body.currentpassword;
    const mail=req.session.mail;
    const data=await User.findOne({email:mail});
    const meta=await bcrypt.compare(currentPassword,data.password);
   if(meta){
bcrypt.hash(req.body.password,12).then(async (hashedPassword)=>{
data.password=hashedPassword;
console.log('New Password Saved');
await data.save();
return res.redirect('/security');
}).catch((err)=>{
  console.log(err);
  return res.redirect('/password');
})
   }
   else{
    console.log('Current Password Not Matched');
    return res.redirect('/password');
   }
    
  }
  else{
    return res.render('../views/password.ejs',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType,arr:arr})
  }


   }
  ]
   exports.updatePostPassword=updatePostPassword;


   const getDelete=(req,res,next)=>{
   res.render('../views/delete.ejs',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType})
   }
   exports.getDelete=getDelete;


   const postDelete=async (req,res,next)=>{
    const data=await User.findOne({email:req.session.mail});
    const password=req.body.currentpassword;
    const meta=await bcrypt.compare(password,data.password);
    if(meta){
      await Guest.findOneAndDelete({email:req.session.mail});
      await User.findOneAndDelete({email:req.session.mail});
      
      console.log('User Record has been Deleted');
      await req.session.destroy();
      return res.redirect('/signout');
    }
    else{
      console.log('Password Do Not Match');
      return res.redirect('/delete');
    }
    }


    
    exports.postDelete=postDelete;

    const getEmail=(req,res,next)=>{
      res.render('../views/updateEmail.ejs',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType})
    }
    exports.getEmail=getEmail;


    const postEmail=async (req,res,next)=>{
const data=await Guest.findOne({email:req.session.mail});
const Id=data.unId;
const mail=req.body.email;
await User.findOneAndUpdate({email:req.session.mail},{
  $set:{
    email:mail
  }
},{
  new:true
})
await Guest.findOneAndUpdate({email:req.session.mail},{
  $set:{
    email:mail
  }
},{
  new:true
})
req.session.mail=mail;
res.redirect('/profile');

    }
    exports.postEmail=postEmail;


    const loginAlert=(req,res,next)=>{
res.render('../views/loginAlerts.ejs',{signin:req.session.signin,username:req.session.username,usertype:req.session.userType})
    }
    exports.loginAlert=loginAlert;