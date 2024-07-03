import connectToDb from "@/database";
import PostQuestion from "@/modals/QuestionModal";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();
    const { searchParams }: any = new URL(req.url);
    
    const extractQuestionId = searchParams.get("id");
  
    await PostQuestion.findByIdAndDelete(extractQuestionId);
    return NextResponse.json({
      sucess: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      sucess: false,
      message: "Error deleting",
    });
  }
}
