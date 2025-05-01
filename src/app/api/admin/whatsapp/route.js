import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { userSchema } from "../../../validationSchemas";
import { getServerSession } from "next-auth";
export async function PUT(request) {
  try {
    const body = await request.json(); // The request body contains wallet data

    const { whatsapp } = body; // Get wallet values from the request

    const whats = await prisma.whatsapp.update({
      where: { id: 1 }, // Assumes wallet_address is unique
      data: { whatsappnumber: whatsapp },
    });

    return NextResponse.json(
      { message: "Whatsapp updated successfully", whats },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update whatsapp", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const whatsapp = await prisma.whatsapp.findUnique({
      where: {
        id: 1,
      },
    });

    return NextResponse.json(
      {
        whatsapp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred during query:", error.message); // Log the actual error
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
