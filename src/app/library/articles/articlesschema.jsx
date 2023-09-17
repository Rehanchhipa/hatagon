import mongoose from "mongoose"


const articlesSchema = mongoose.Schema({
    title:String,
    discription:String,
    image:String,
    uid:String
})

if(mongoose.models['articles']){
    delete mongoose.models['articles']
}


export const articleSchema = mongoose.model('articles',articlesSchema)