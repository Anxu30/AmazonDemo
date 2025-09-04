const mongoose=require('mongoose');

const itemsSchema=mongoose.Schema({
email:{
  type:String,
  required:true,
  unique:true
},
items:[{
  name:{
  type:String,
  default:'',
  },
  description:{
  type:String,
  default:'',
  },
  photourl:{
  type:String,
  default:'',
  },
  category:{
    type:String,
    default:''
  },
  reviews:[{
    type:String,
    default:[]
  }]
}],

})
module.exports=mongoose.model('Items',itemsSchema);