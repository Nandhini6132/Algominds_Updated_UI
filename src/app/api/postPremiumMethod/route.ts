import connectToDb from "@/database";
import { NextRequest, NextResponse } from "next/server";
import Premium from "@/modals/PremiumUserModal";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const premium = await Premium.find({ email: email });
    if (premium) {
      return NextResponse.json({
        success: true,
        data: premium,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Premium User found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDb();
    const premium = await request.json();

    const updatePremium = await Premium.create(premium);

    if (updatePremium) {
      return NextResponse.json({
        success: true,
        data: "Premium User updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Error updating premium user",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const { name, isPremium, isSubscribedMonthly, isSubscribedYearly } =
      await req.json();

    const updatedPremium = await Premium.findOneAndUpdate(
      {email},
      {
        name,
       
        isPremium,
        isSubscribedMonthly,
        isSubscribedYearly,
      },
      { new: true }
    );

    if (updatedPremium) {
      return NextResponse.json({
        success: true,
        data: updatedPremium,
      });
    }
    else{
      return NextResponse.json({
        success: false,
        message: "No Premium User found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
}
