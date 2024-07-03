import connectToDb from "@/database";
import PostQuestion from "@/modals/QuestionModal";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();
    const { searchParams } = new URL(req.url);
    const extractQuestionId = searchParams.get("id");
    console.log(extractQuestionId, "extractQuestionId");
    const {
      title,
      category,
      input,
      output,
      description,
      explanation,
      input2,
      output2,
      input3,
      output3,
    } = await req.json();

    const updateQuestion = await PostQuestion.findByIdAndUpdate(
      extractQuestionId,
      {
        title,
        category,
        input,
        output,
        description,
        explanation,
        input2,
        output2,
        input3,
        output3,
      },
      { new: true }
    );
    console.log(updateQuestion, "ppppuhg");

    if (updateQuestion) {
      return NextResponse.json({
        success: true,
        data: updateQuestion,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
