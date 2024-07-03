import connectToDb from "@/database";
import { NextRequest, NextResponse } from "next/server";
import Solution from "@/modals/SolutionModal";


export async function POST(request:NextRequest) {
    try {
        await connectToDb()
      
        const extractSolution= await request.json()
     
        if (!extractSolution.solution) {
            
            extractSolution.solution = "Default solution"; 
            console.warn("Missing 'solution' in request. Using default value.");
        }

        const postSolution= await Solution.create(extractSolution)


        if(postSolution){
            return NextResponse.json({
                success: true,
                message: 'Solution Posted Successfully'
            })
        } else{
            return NextResponse.json({
                success: false,
                message: 'Error'
            })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Error'
           
        })
    }
}