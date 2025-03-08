import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req) {
  try {
    const { userId, amount, leverage } = await req.json();

    // Fetch available trade signals
    const tradeSignal = await prisma.tradesignal.findFirst({
      where: { amount: parseFloat(amount), leverage: parseFloat(leverage) },
    });

    if (!tradeSignal) {
      return NextResponse.json(
        { message: "No matching trade signal found" },
        { status: 400 }
      );
    }

    // Start the trade
    const trade = await prisma.trade.create({
      data: {
        userId,
        leverage: parseFloat(leverage),
        action: tradeSignal.action,
        status: "open",
        profit: tradeSignal.profit,
        loss: tradeSignal.loss,
        createdAt: new Date(),
        tradeSignalId: tradeSignal.id, // Add this
      },
    });

    // Automatically resolve the trade after the signal's duration
    setTimeout(async () => {
      const profitOrLoss =
        tradeSignal.outcome === "win" ? tradeSignal.profit : -tradeSignal.loss;

      await prisma.trade.update({
        where: { id: trade.id },
        data: {
          status: "closed",
          profit: profitOrLoss > 0 ? profitOrLoss : 0,
          loss: profitOrLoss < 0 ? -profitOrLoss : 0,
        },
      });
      await prisma.transaction.updateMany({
        where: { userId },
        data: {
          profit: {
            increment: profitOrLoss, // Add profit or subtract loss
          },
        },
      });
    }, tradeSignal.duration * 60000); // Convert minutes to milliseconds

    return NextResponse.json(
      { message: "Trade started", tradeSignal },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
