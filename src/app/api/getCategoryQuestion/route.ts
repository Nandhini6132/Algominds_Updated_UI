import connectToDb from "@/database";
import PostQuestion from "@/modals/QuestionModal";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){
    try {
        await connectToDb()
        const {searchParams} = new URL(req.url)
        const category=searchParams.get('category')
        const extractAllQuestions = await PostQuestion.find({category: category})
        console.log(extractAllQuestions, 'extractAllQuestions')
        return NextResponse.json({
            success: true,
            data: extractAllQuestions,
            message: 'Fetched all questions successfully'
        })
        

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Error while fetching'
        })
    }
}