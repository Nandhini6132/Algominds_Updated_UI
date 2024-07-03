import connectToDb from "@/database";
import PostQuestion from "@/modals/QuestionModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectToDb();
    const { searchParams } = new URL(req.url);
    const question = searchParams.get("id");
    const data=await PostQuestion.findById(question)
    console.log(data, 'id')
    if (question) {
      return NextResponse.json({
        success: true,
        data: data,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Question not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}
