import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import nodemailer from "nodemailer";
export async function GET(req) {
  try {
    const userID = req.nextUrl.searchParams.get("userId");
    const id = parseInt(userID);
    const trades = await prisma.trade.findMany({
      where: { status: "open", userId: id },
    });
    return NextResponse.json({ trades }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal server error" + error, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId, amount, leverage, action, time, email } = await req.json();

    const user = await prisma.transaction.aggregate({
      where: { userId: Number(userId) },
      _sum: {
        deposit: true,
        profit: true,
      },
    });

    if (
      parseFloat(amount) >
      parseFloat(user._sum.deposit) + parseFloat(user._sum.profit)
    ) {
      return NextResponse.json(
        {
          message:
            "Insufficient funds! please topup your balance to take this trade.",
        },
        { status: 400 }
      );
    } else {
      const trade = await prisma.trade.create({
        data: {
          userId,
          leverage: parseFloat(leverage),
          action,
          status: "open",
          profit: parseFloat(amount) * 0.2,
          loss: 0,
          createdAt: new Date(),
          duration: parseInt(time),
        },
      });

      setTimeout(async () => {
        try {
          // Re-fetch the trade to get the latest profit value
          const latestTrade = await prisma.trade.findUnique({
            where: { id: trade.id },
          });

          if (!latestTrade || latestTrade.status === "closed") return;

          // Close the trade
          await prisma.trade.update({
            where: { id: trade.id },
            data: { status: "closed" },
          });

          // Apply the latest profit or loss
          await prisma.transaction.updateMany({
            where: { userId: Number(userId) },
            data: {
              profit:
                latestTrade.profit > 0
                  ? { increment: parseFloat(latestTrade.profit) }
                  : { decrement: Math.abs(parseFloat(latestTrade.loss)) },
            },
          });
        } catch (err) {
          console.error("Error closing trade:", err);
        }
      }, time * 60000); // time is in minutes

      sendTradeEmail(trade, email);
      return NextResponse.json(
        { message: "Trade started successfully", trade },
        { status: 200 }
      );
    }
    // Fetch available trade signals
    // const tradeSignal = await prisma.tradesignal.findFirst({
    //   where: { amount: parseFloat(amount), leverage: parseFloat(leverage) },
    // });

    // if (!tradeSignal) {
    //   return NextResponse.json(
    //     { message: "No matching trade signal found" },
    //     { status: 400 }
    //   );
    // }

    // // Start the trade

    // Automatically resolve the trade after the signal's duration
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

async function sendTradeEmail(trade, email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Set true if using SSL (port 465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content for the user
  const mailOptionsUser = {
    from: "support@ethicalglobalinvestors.com ",
    to: email,
    subject: "Your Trade Has Started - MT5 Index Pro",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to MT5 Index Pro</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      text-align: center;
      font-size: 16px;
      color: #333333;
      line-height: 1.5;
      padding-bottom: 20px;
    }
    .cta-button {
      background-color: #1a73e8;
      color: #ffffff;
      padding: 15px 25px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888888;
      margin-top: 30px;
    }
    .footer a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <img src="https://www.ethicalglobalinvestors.com /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6d381394.png&w=828&q=75" alt="MT5 Index Pro Logo">
    </div>

   <div class="content">
      <h2>Your Trade Has Been Placed!</h2>
      <p>Hi there, your trade has started successfully on MT5 Index Pro.</p>
      <p><strong>Trade Details:</strong></p>
      <ul style="text-align:left; list-style: none; padding: 0;">
        <li><strong>Action:</strong> ${trade.action}</li>
        <li><strong>Leverage:</strong> ${trade.leverage}x</li>
        <li><strong>Status:</strong> ${trade.status}</li>
       
        <li><strong>Start Time:</strong> ${new Date(
          trade.createdAt
        ).toLocaleString()}</li>
      </ul>
      <p>You can view and monitor your trade from your dashboard anytime.</p>
      <a href="https://ethicalglobalinvestors.com /users/dashboard" class="cta-button">Go to Dashboard</a>
    </div>
    
    <div class="footer">
      <p>Best regards,</p>
      <p>The MT5 Index Pro Team</p>
      <p><a href="https://ethicalglobalinvestors.com " target="_blank">Visit our website</a></p>
    </div>
  </div>

</body>
</html>`,
  };

  try {
    // Send email to the user
    await transporter.sendMail(mailOptionsUser);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}
