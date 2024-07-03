import connectToDb from "@/database";
import { NextRequest, NextResponse } from "next/server";
import Discussion from "@/modals/DiscussionModal";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const { searchParams } = new URL(req.url);
    console.log(searchParams, "searchParams");
    const questionId = searchParams.get("id");
    const data = await Discussion.find({questionId:questionId});
    console.log(data, "id");

    if (data) {
      return NextResponse.json({
        success: true,
        data: data,
      });
    }
    else{
        return NextResponse.json({
          success: false,
          message: "Discussion not found",
        });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}
