import connectToDb from "@/database";
import Solution from "@/modals/SolutionModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectToDb();
    const { searchParams } = new URL(req.url);
    console.log(searchParams, 'searchParams');
    const questionId = searchParams.get("id");
    console.log(questionId, 'questionId');

    const data = await Solution.find({
      $or: [
        { questionId: questionId },
        { userId: questionId },
        {userName:questionId}
      ]
    });
    console.log(data, 'data')
    if (data) {
      return NextResponse.json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error, 'error');
    return NextResponse.json({
      success: false,
      message: "No Solutions found",
    });
  }
}
