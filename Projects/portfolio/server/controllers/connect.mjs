import mongoose from "mongoose";

export const connect = () =>{
    mongoose.connect('mongodb://localhost:27017/music')
    .then(()=>console.log("Database connected succesfully"))
    .catch((err)=> console.log(`Error is ${err}`))
}