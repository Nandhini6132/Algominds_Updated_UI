import connectToDb from "@/database";
import PostQuestion from "@/modals/QuestionModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    await connectToDb();
    const {searchParams} = new URL(req.url)
    const category=searchParams.get('category')
    let extractAllQuestions;

    if (category) {
      extractAllQuestions = await PostQuestion.find({ category:category });
    } else {
      extractAllQuestions = await PostQuestion.find({});
    }

    if (extractAllQuestions) {
      return NextResponse.json({
        success: true,
        data: extractAllQuestions,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No questions found",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error,llll",
    });
  }
}
