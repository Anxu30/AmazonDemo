const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
email:{
  type:String,
  required:true,
  unique:true,
},
name:{
  type:String,
  required:true,
},
username:{
  type:String,
  required:true,
},
password:{
  type:String,
  required:true,
},
usertype:{
  type:String,
  required:true,
},
otp:{
  type:String,
  default:''
},
trustedDevice:{
  ip:{
    type:String,
    required:true
  },
  userAgent:{
    type:String,
    required:true
  },
  signedAt:{
    type:Date,
    default:Date.now
  }
}

})

module.exports=mongoose.model('User',userSchema);