import mongoose from "mongoose";

const singupSchema = mongoose.Schema({
    email:String,
    password:String
})

if (mongoose.models['userSingup']){
    delete mongoose.models['userSingup']
}
export const singup = mongoose.model('userSingup',singupSchema)