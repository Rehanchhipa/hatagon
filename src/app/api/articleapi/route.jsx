import { connectdb } from "@/app/library/Singupdatabase";
import { articleSchema } from "@/app/library/articles/articlesschema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function GET(response){

    // let feData = await response.json()

    await mongoose.connect(connectdb).then((e)=>{
        console.log('connect')
    })

    let res = await articleSchema.find()



    return NextResponse.json({
        data:res,
        message:'articles api'
    })
}