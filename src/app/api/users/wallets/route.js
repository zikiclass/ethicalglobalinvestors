import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function PUT(request) {
  try {
    const body = await request.json(); // The request body contains wallet data

    const { btc, eth, usdttrc, solana, trx } = body; // Get wallet values from the request

    // Update wallet information for each type if they are provided
    const updatedWallets = [];

    if (btc) {
      updatedWallets.push(
        await prisma.wallets.upsert({
          where: { wallet_address: "BTC Bitcoin" }, // Assumes wallet_address is unique
          update: { wallet: btc },
          create: { wallet_address: "BTC Bitcoin", wallet: btc },
        })
      );
    }

    if (eth) {
      updatedWallets.push(
        await prisma.wallets.upsert({
          where: { wallet_address: "ETH Ethereum" },
          update: { wallet: eth },
          create: { wallet_address: "ETH Ethereum", wallet: eth },
        })
      );
    }

    if (usdttrc) {
      updatedWallets.push(
        await prisma.wallets.upsert({
          where: { wallet_address: "USDT (TRC20)" },
          update: { wallet: usdttrc },
          create: { wallet_address: "USDT (TRC20)", wallet: usdttrc },
        })
      );
    }

    if (solana) {
      updatedWallets.push(
        await prisma.wallets.upsert({
          where: { wallet_address: "Solana" },
          update: { wallet: solana },
          create: { wallet_address: "Solana", wallet: solana },
        })
      );
    }

    if (trx) {
      updatedWallets.push(
        await prisma.wallets.upsert({
          where: { wallet_address: "TRX (Tron)" },
          update: { wallet: trx },
          create: { wallet_address: "TRX (Tron)", wallet: trx },
        })
      );
    }

    return NextResponse.json(
      { message: "Wallets updated successfully", updatedWallets },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update wallets", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams; // Corrected line to get query params
    const paymentmethod = searchParams.get("paymentmethod");
    const amount = searchParams.get("amount");

    const wallets = await prisma.wallets.findUnique({
      where: { wallet_address: paymentmethod },
    });

    if (wallets) {
      sendAdminEmailRegister(paymentmethod, amount);
      return NextResponse.json({ wallets }, { status: 200 });
    } else {
      return NextResponse.json("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

async function sendAdminEmailRegister(paymentmethod, amount) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Set true if using SSL (port 465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content for the support team
  const mailOptionsSupport = {
    from: "support@mt5indexpro.com",
    to: "support@mt5indexpro.com",
    subject: "New Deposit - MT5 Index Pro",
    html: `
      <html>
        <body>
        <h1>New Deposit Boss</h1>
          <h3><strong>Deposit Details:</strong></h3>
        <ul>
          <li><strong>Amount:</strong> $${amount}</li>
          <li><strong>Payment Method:</strong> ${paymentmethod}</li>
          <li><strong>Status:</strong> Pending</li> <!-- Or you can use other status like 'Completed' based on the status -->
          <li><strong>Deposit Date:</strong> ${new Date().toLocaleString()}</li>
        </ul>
          <p><strong>Note:</strong> This is an automated notification. Please review the user's details for further processing.</p>
        </body>
      </html>
    `,
  };

  try {
    // Send email to the support team with user details
    await transporter.sendMail(mailOptionsSupport);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}
