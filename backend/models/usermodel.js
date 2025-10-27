const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type:String,unique:true,},
  password:String,
});

const UsersModel = mongoose.model("usermodel", userSchema);
module.exports=UsersModel;