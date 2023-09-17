import { connectdb } from "@/app/library/Singupdatabase";
import { articleSchema } from "@/app/library/articles/articlesschema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request,content){

    let feData  = await request.json()
    let feId = content.params.id

    console.log(feId)
    await mongoose.connect(connectdb).then((e)=>{

        console.log('connect')
    })


    let data =await  articleSchema.findOneAndUpdate({_id:feId},feData)

    return (
        NextResponse.json({
            data:data,

        })


    )

}


export async function DELETE(request,content){
    let feId = content.params.id

    await mongoose.connect(connectdb).then((e)=>{

        console.log('connect')
    })


    let data = await articleSchema.deleteOne({_id:feId})
    return NextResponse.json({
        data:data
    })
}