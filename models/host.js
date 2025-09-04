const mongoose=require('mongoose');

const hostSchema=mongoose.Schema({
email:{
  type:String,
  required:true,
  unique:true
},
name:{
  type:String,
  required:true
},
username:{
  type:String,
  required:true
},
items:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Items',
  deafault:''
}

})
module.exports=mongoose.model('Host',hostSchema);