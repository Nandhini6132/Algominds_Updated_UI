import connectToDb from "@/database";
import Solution from "@/modals/SolutionModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectToDb();

    const solutions = await Solution.find({});
    console.log(solutions, "solutions");
    if (solutions) {
      return NextResponse.json({
        success: true,
        data: solutions,
      });
    } else{
        return NextResponse.json({
          success: false,
          message: "No Solutions found",
        })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}
