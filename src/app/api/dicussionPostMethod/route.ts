import connectToDb from "@/database";
import Discussion from "@/modals/DiscussionModal";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest){
    try {
        await connectToDb()
        const discussion = await req.json(); 
        console.log(discussion,'discussion')

        
        const postDiscussion = await Discussion.create(discussion);
        console.log(postDiscussion,'postDiscussion')
        if(postDiscussion){
            return NextResponse.json({
                success:true,
                data:postDiscussion,
            })
        }
        else{
            return NextResponse.json({
                success:false,
                error:'error',
            })
        }
        
    } catch (error) {
        console.log('db not connected')
        return NextResponse.json({
            success:false,
            error:'error',
        })
    }
}