import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req) {
  try {
    const body = await req.json();

    const getOTP = await prisma.register.findUnique({
      where: { id: body.id },
    });

    if (body.OTP !== getOTP.otp_code) {
      return NextResponse.json(
        { message: "Invalid OTP code, please contact support@mt5indexpro.com" },
        { status: 400 }
      );
    }

    if (!body) {
      return NextResponse.json({ message: "Invalid details" }, { status: 400 });
    }

    const dep = await prisma.withdrawal.create({
      data: {
        userId: parseInt(body.id),
        amount: parseFloat(body.amount),
        method: body.type || "",
        from_account: body.fromAccount || "",
        account_number: body.accountNumber || "",
        account_name: body.accountName || "",
        bank_name: body.bank || "",
        crypto: body.crypto || "",
        wallet_address: body.wallet || "",
        paypal_email: body.paypalEmail || "",
        cash_tag: body.cashTag || "",
        date: new Date(),

        status: "Pending",
      },
    });

    return NextResponse.json(
      { message: "Success", data: dep },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating deposit:", error); // Log error details for debugging
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "Unathorized" }, { status: 404 });

    const withdrawal = await prisma.withdrawal.findMany({
      where: { userId: parseInt(id) },
      orderBy: [{ id: "desc" }],
    });
    if (withdrawal)
      return NextResponse.json({ data: withdrawal }, { status: 200 });
    return NextResponse.json({ message: "Error" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
