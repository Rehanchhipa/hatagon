import { connectdb } from "@/app/library/Singupdatabase";
import { articleSchema } from "@/app/library/articles/articlesschema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(response){

    let fedata = await response.json()

    await mongoose.connect(connectdb).then((e)=>{
        console.log('connected')
    })

    let result = await articleSchema(fedata)
     let res = await result.save()

     let resul = await articleSchema.find()

    return NextResponse.json({
        data:resul,
        message:'succefully'
    })
}