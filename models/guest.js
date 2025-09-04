const mongoose=require('mongoose');
const User=require('../models/user');
const Guest=require('../models/guest');


const guestSchema=mongoose.Schema({
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
contact:{
  type:String,
  default:''
},
picUrl:{
  type:String,
  default:''
},
DOB:{
  type:String,
  default:''
},
address: {
  street: { type: String, default: "Not Provided" },
  city:   { type: String, default: "Not Provided" },
  state:  { type: String, default: "Not Provided" },
  pincode:{ type: String, default: "000000" },
  country:{ type: String, default: "India" } 
},
cart:[{
  type:String,
 default:[]
}],
orders:[{
  type:String,
 default:[]
}],
category:[{
  type:String,
 default:[]
}],
subCategory:[{
  type:String,
 default:[]
}],
itemId:[{
  type:String,
 default:[]
}],
unId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  required:true
},
loginAlert:[{
  ip:{
    type:String,
    required:true
  },
  userAgent:{
    type:String,
    required:true
  },
  loginat:{
    type:Date,
    default:Date.now
  }
}]

})
guestSchema.post('findOneAndUpdate',async function (doc,next){
  await User.findOneAndUpdate({email:doc.email},{
    name:doc.name
  })
  next();
})
module.exports=mongoose.model('Guest',guestSchema);