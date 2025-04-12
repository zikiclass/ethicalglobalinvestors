import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const userID = req.nextUrl.searchParams.get("id");
    const id = parseInt(userID);
    const trades = await prisma.trade.findMany({
      where: { status: "closed", userId: id },
      orderBy: [{ id: "desc" }],
    });
    if (trades) {
      return NextResponse.json({ message: "success", trades }, { status: 200 });
    } else {
      return NextResponse.json("Unable to get request", { status: 404 });
    }
  } catch (error) {
    return NextResponse.json("Internal server error" + error, { status: 500 });
  }
}
