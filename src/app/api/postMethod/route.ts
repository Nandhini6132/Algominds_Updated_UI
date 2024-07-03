import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/database/index";
import PostQuestion from "@/modals/QuestionModal";

export async function POST(request: NextRequest) {
    console.log('db connection established')
  try {
    await connectToDb();
    const extractQuestion = await request.json();
    console.log(extractQuestion, "exxhj")

    const postQuestion = await PostQuestion.create(extractQuestion);

    console.log(postQuestion, 'posetedques')
    if (postQuestion) {
      return NextResponse.json({
        success: true,
        data: postQuestion,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}
