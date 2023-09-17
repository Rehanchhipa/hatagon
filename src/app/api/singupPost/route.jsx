import { connectdb } from "@/app/library/Singupdatabase";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { singup } from "@/app/library/singupModal/singupModal";



export async function POST(request){

    let frntend =await request.json()

    await mongoose.connect(connectdb)
    console.log('connectsingup')

 

    const data = await singup.findOne({email:frntend.email})


    if(data != null){
        return NextResponse.json({
            data:[],
            message:'already register'
        })

    }
    else{

        const result = await singup(frntend)
         const res =  await result.save()
        return NextResponse.json({
            data:res,
            message:'sucefuly'
        })

    }

    // return NextResponse.json({
    //     data:'data singup',
    //     message:'hogya'
    // })
}