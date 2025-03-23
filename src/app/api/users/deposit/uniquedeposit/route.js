import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    const deposits = await prisma.deposit.findMany({
      where: { userId: parseInt(id) },
    });
    if (deposits) return NextResponse.json({ data: deposits }, { status: 200 });
    return NextResponse.json({ message: "Error" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    if (!body.id || !body.action)
      return NextResponse.json({ message: "Invalid ID" }, { status: 404 });

    if (body.action === "approve") {
      const approveDeposit = await prisma.deposit.update({
        where: { id: parseInt(body.id) },
        data: {
          status: "Approved",
        },
      });
      if (approveDeposit) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "error" }, { status: 404 });
      }
    } else {
      const declineDeposit = await prisma.deposit.update({
        where: { id: parseInt(body.id) },
        data: {
          status: "Declined",
        },
      });
      if (declineDeposit) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "error" }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "Unathorized" }, { status: 404 });

    const deleteDeposit = await prisma.deposit.delete({
      where: { id: parseInt(id) },
    });
    if (deleteDeposit) {
      return NextResponse.json({ message: "success" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "error" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
