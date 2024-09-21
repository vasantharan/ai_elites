import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    email:String,
    number:String,
    address:String
})

const UserModel=mongoose.model("User",userSchema)
export default UserModel