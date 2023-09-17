import { connectdb } from "@/app/library/Singupdatabase";
import { singup } from "@/app/library/singupModal/singupModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request){
 

    let data = await request.json()

    await mongoose.connect(connectdb)
    console.log('connect')


    
    
    let check =  await singup.findOne({email:data.email})


    
    if(check!=null){

        if(check.password == data.password) {

            return NextResponse.json({
                data:check,
                message:"user login"
            })
        }
        else {
            return NextResponse.json({
                data:[],
                message:"incorrect password"
            })
        }

    }else{
        return NextResponse.json({
            data:[],
            message:'user not found'
        })
    }

    }